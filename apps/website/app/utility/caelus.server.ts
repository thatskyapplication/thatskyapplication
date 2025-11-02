import type { Snowflake } from "@discordjs/core/http-only";
import {
	type APIError,
	type APIGuildsDailyGuidesChannelCheckPermissionsBadResponse,
	type APIGuildsDailyGuidesChannelCheckPermissionsOKResponse,
	type APIGuildsDailyGuidesChannelsResponse,
	type APIGuildsMeResponse,
	type APIPutGuildsDailyGuidesBody,
	type APIPutGuildsDailyGuidesResponse,
	CaelusAPIError,
	guildsDailyGuides,
	guildsDailyGuidesChannelCheckPermissions,
	guildsDailyGuidesChannels,
	guildsMeRoute,
} from "@thatskyapplication/utility";
import { INTERNAL_URL_CAELUS } from "~/config.server.js";
import pino from "~/pino.js";

export async function caelusInGuild(guildId: Snowflake) {
	try {
		const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsMeRoute(guildId)}`, {
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			return null;
		}

		return ((await response.json()) as APIGuildsMeResponse).present;
	} catch (error) {
		pino.error({ error, guildId }, "Error fetching guild data from Caelus.");
		return null;
	}
}

export async function getGuildsDailyGuidesChannels(guildId: Snowflake) {
	const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsDailyGuidesChannels(guildId)}`, {
		signal: AbortSignal.timeout(5000),
	});

	const json = await response.json();

	if (!response.ok) {
		throw new CaelusAPIError(json as APIError);
	}

	return json as APIGuildsDailyGuidesChannelsResponse;
}

export async function setGuildsDailyGuidesChannel(guildId: Snowflake, channelId: Snowflake | null) {
	try {
		const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsDailyGuides(guildId)}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ channel_id: channelId } satisfies APIPutGuildsDailyGuidesBody),
			signal: AbortSignal.timeout(5000),
		});

		return (await response.json()) as APIPutGuildsDailyGuidesResponse;
	} catch (error) {
		pino.error({ error, guildId }, "Error updating daily guides channel in Caelus.");
		return null;
	}
}

export async function checkDailyGuidesChannelPermissions(guildId: Snowflake, channelId: Snowflake) {
	try {
		const response = await fetch(
			`${INTERNAL_URL_CAELUS}${guildsDailyGuidesChannelCheckPermissions(guildId, channelId)}`,
			{ signal: AbortSignal.timeout(5000) },
		);

		if (!response.ok) {
			return (await response.json()) as APIGuildsDailyGuidesChannelCheckPermissionsBadResponse;
		}

		return null as APIGuildsDailyGuidesChannelCheckPermissionsOKResponse;
	} catch (error) {
		pino.error({ error, guildId }, "Error fetching guild channels from Caelus.");
		return null;
	}
}
