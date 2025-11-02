import { serve } from "@hono/node-server";
import {
	APIErrorCode,
	type APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
	type APIGuildsDailyGuidesChannelCheckPermissionsOKResponse,
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

hono.get("/api/guilds/:guildId/@me", (context) => {
	const guild = GUILD_CACHE.get(context.req.param("guildId"));
	return guild
		? context.json({ present: true } satisfies APIGuildsMeResponse)
		: context.json(null, 404);
});

hono.put("/api/guilds/:guildId/daily-guides", async (context) => {
	const guildId = context.req.param("guildId");
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		return context.json(null, 404);
	}

	const body = await context.req.json<APIPutGuildsDailyGuidesBody>();
	const channel = guild.channels.get(body.channel_id!);

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id);

		if (!(cachedChannel && isDailyGuidesDistributionChannel(cachedChannel))) {
			return context.json(
				{
					success: false,
					message: ["Invalid channel."],
				} satisfies APIPutGuildsDailyGuidesResponse<false>,
				400,
			);
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable(
			guild,
			cachedChannel,
			await guild.fetchMe(),
			true,
		);

		if (dailyGuidesDistributable.length > 0) {
			return context.json(
				{
					success: false,
					message: dailyGuidesDistributable,
				} satisfies APIPutGuildsDailyGuidesResponse<false>,
				400,
			);
		}
	}

	await setupDailyGuides({ guildId, channelId: body.channel_id });

	return context.json(
		{ success: true, message: null } satisfies APIPutGuildsDailyGuidesResponse<true>,
		200,
	);
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
		const guildId = context.req.param("guildId");
		const channelId = context.req.param("channelId");
		const guild = GUILD_CACHE.get(guildId);

		if (!guild) {
			return context.json(
				{
					message: "Unknown guild.",
				} satisfies APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
				404,
			);
		}

		const channel = guild.channels.get(channelId) ?? guild.threads.get(channelId);

		if (!channel) {
			return context.json(
				{
					message: "Unknown channel.",
				} satisfies APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
				404,
			);
		}

		if (!isDailyGuidesDistributionChannel(channel)) {
			return context.json(
				{
					message: "Invalid channel type.",
				} satisfies APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
				400,
			);
		}

		const me = await guild.fetchMe();
		const distributable = isDailyGuidesDistributable(guild, channel, me, true);

		if (distributable.length > 0) {
			return context.json(
				{
					message: distributable.join("\n"),
				} satisfies APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
				400,
			);
		}

		return context.body(null satisfies APIGuildsDailyGuidesChannelCheckPermissionsOKResponse, 204);
	},
);

serve({ fetch: hono.fetch, port }, () =>
	pino.info(`Internal API server listening on port ${port}.`),
);
