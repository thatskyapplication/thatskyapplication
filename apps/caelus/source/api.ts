import type { Locale } from "@discordjs/core";
import { serve } from "@hono/node-server";
import {
	APIErrorCode,
	type APIGuildsDailyGuidesChannelCheckPermissionsResponse,
	type APIGuildsDailyGuidesChannelsResponse,
	type APIGuildsMeResponse,
	type APIPutGuildsDailyGuidesBody,
	type APIPutGuildsDailyGuidesResponse,
	createAPIError,
} from "@thatskyapplication/utility";
import { Hono } from "hono";
import { GUILD_CACHE } from "./caches/guilds.js";
import {
	isDailyGuidesDistributable,
	isDailyGuidesDistributionChannel,
	setup as setupDailyGuides,
} from "./features/daily-guides.js";
import pino from "./pino.js";

const hono = new Hono();
const port = Number(process.env.HONO_PORT) || 3000;

hono.get("/api/guilds/:guildId/@me", (context) =>
	context.json({
		present: GUILD_CACHE.has(context.req.param("guildId")),
	} satisfies APIGuildsMeResponse),
);

hono.put("/api/guilds/:guildId/daily-guides", async (context) => {
	const guild = GUILD_CACHE.get(context.req.param("guildId"));

	if (!guild) {
		return context.json(createAPIError(APIErrorCode.UnknownGuild), 404);
	}

	const body = await context.req.json<APIPutGuildsDailyGuidesBody>();
	const channel = guild.channels.get(body.channel_id!);

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id);

		if (!(cachedChannel && isDailyGuidesDistributionChannel(cachedChannel))) {
			return context.json(createAPIError(APIErrorCode.UnknownChannel), 404);
		}

		const locale = context.req.query("locale") as Locale | undefined;

		const dailyGuidesDistributable = isDailyGuidesDistributable({
			guild,
			channel: cachedChannel,
			me: await guild.fetchMe(),
			locale,
			website: true,
		});

		if (dailyGuidesDistributable.length > 0) {
			return context.json(
				createAPIError(APIErrorCode.MissingPermissions, dailyGuidesDistributable),
				400,
			);
		}
	}

	await setupDailyGuides({ guildId: guild.id, channelId: body.channel_id });
	return context.body(null satisfies APIPutGuildsDailyGuidesResponse, 204);
});

hono.get("/api/guilds/:guildId/daily-guides/channels", (context) => {
	const guildId = context.req.param("guildId");
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		return context.json(createAPIError(APIErrorCode.UnknownGuild), 404);
	}

	const channels = [];

	for (const channel of guild.channels.values()) {
		if (isDailyGuidesDistributionChannel(channel)) {
			channels.push(channel);
		}
	}

	for (const channel of guild.threads.values()) {
		if (isDailyGuidesDistributionChannel(channel)) {
			channels.push(channel);
		}
	}

	return context.json(channels satisfies APIGuildsDailyGuidesChannelsResponse);
});

hono.get(
	"/api/guilds/:guildId/daily-guides/channel/:channelId/check-permissions",
	async (context) => {
		const guild = GUILD_CACHE.get(context.req.param("guildId"));

		if (!guild) {
			return context.json(createAPIError(APIErrorCode.UnknownGuild), 404);
		}

		const channelId = context.req.param("channelId");
		const channel = guild.channels.get(channelId) ?? guild.threads.get(channelId);

		if (!channel) {
			return context.json(createAPIError(APIErrorCode.UnknownChannel), 404);
		}

		if (!isDailyGuidesDistributionChannel(channel)) {
			return context.json(createAPIError(APIErrorCode.InvalidChannel), 400);
		}

		const locale = context.req.query("locale") as Locale | undefined;

		const distributable = isDailyGuidesDistributable({
			guild,
			channel,
			me: await guild.fetchMe(),
			locale,
			website: true,
		});

		return context.json(
			distributable satisfies APIGuildsDailyGuidesChannelCheckPermissionsResponse,
			200,
		);
	},
);

serve({ fetch: hono.fetch, port }, () =>
	pino.info(`Internal API server listening on port ${port}.`),
);
