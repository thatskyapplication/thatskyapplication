import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { z } from "zod/v4";
import {
	type APIDailyGuidesQuests,
	type APIDailyGuidesState,
	type APIDailyGuidesUser,
	type APIGuildsMeResponse,
	type APIPostDailyGuidesDistributeBody,
	type APIPostDailyGuidesModificationBody,
	DAILY_GUIDES_DISTRIBUTE_ROUTE,
	DAILY_GUIDES_MODIFICATIONS_ROUTE,
	DailyGuidesModificationType,
} from "@thatskyapplication/utility";
import { GUILD_CACHE } from "./caches/guilds.js";
import { distribute, isDistributing, logDailyGuidesModification } from "./features/daily-guides.js";
import pino from "./pino.js";
import { isStartupComplete } from "./utility/startup.js";

const hono = new Hono();
const port = Number(process.env.HONO_PORT) || 3000;

const userSchema = z.object({
	id: z.string().min(1),
	username: z.string().min(1),
	discriminator: z.string().min(1),
}) satisfies z.ZodType<APIDailyGuidesUser>;

const questSchema = z.number().int().nullable();

const questsSchema = z.object({
	quest1: questSchema,
	quest2: questSchema,
	quest3: questSchema,
	quest4: questSchema,
}) satisfies z.ZodType<APIDailyGuidesQuests>;

const stateSchema = questsSchema.extend({
	travellingRock: z.string().min(1).nullable(),
	travellingRockNotSpawned: z.boolean().nullable(),
}) satisfies z.ZodType<APIDailyGuidesState>;

const cosmeticsSchema = z.array(z.number().int());

const modificationSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(DailyGuidesModificationType.Set),
		user: userSchema,
		previous: stateSchema,
		next: stateSchema,
	}),
	z.object({
		type: z.literal(DailyGuidesModificationType.QuestsReorder),
		user: userSchema,
		previous: questsSchema,
		next: questsSchema,
	}),
	z.object({
		type: z.literal(DailyGuidesModificationType.NestingWorkshopSet),
		user: userSchema,
		previous: cosmeticsSchema,
		next: cosmeticsSchema,
	}),
	z.object({
		type: z.literal(DailyGuidesModificationType.NestingWorkshopReorder),
		user: userSchema,
		previous: cosmeticsSchema,
		next: cosmeticsSchema,
	}),
]) satisfies z.ZodType<APIPostDailyGuidesModificationBody>;

const distributeSchema = z.object({
	user: userSchema,
}) satisfies z.ZodType<APIPostDailyGuidesDistributeBody>;

hono.get("/api/guilds/:guildId/@me", (context) =>
	context.json({
		present: GUILD_CACHE.has(context.req.param("guildId")),
	} satisfies APIGuildsMeResponse),
);

hono.post(DAILY_GUIDES_MODIFICATIONS_ROUTE, async (context) => {
	const body = modificationSchema.safeParse(await context.req.json<unknown>().catch(() => null));

	if (!body.success) {
		return context.body(null, 400);
	}

	try {
		return context.body(null, (await logDailyGuidesModification(body.data)) ? 204 : 503);
	} catch (error) {
		pino.error(error, "Failed to log a daily guides modification from the website.");
		return context.body(null, 500);
	}
});

hono.post(DAILY_GUIDES_DISTRIBUTE_ROUTE, async (context) => {
	const body = distributeSchema.safeParse(await context.req.json<unknown>().catch(() => null));

	if (!body.success) {
		return context.body(null, 400);
	}

	if (!isStartupComplete()) {
		return context.body(null, 503);
	}

	if (isDistributing()) {
		return context.body(null, 409);
	}

	const { user } = body.data;

	void distribute({ user, lastUpdatedUserId: user.id, lastUpdatedAt: new Date() }).catch(
		(error: unknown) => pino.error(error, "Failed to distribute daily guides from the website."),
	);

	return context.body(null, 202);
});

serve({ fetch: hono.fetch, port }, () =>
	pino.info(`Internal API server listening on port ${port}.`),
);
