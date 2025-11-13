import type { Snowflake } from "@discordjs/core/http-only";
import { makeURLSearchParams } from "@discordjs/rest";
import {
	type APIError,
	type APIGuildsDailyGuidesChannelCheckPermissionsResponse,
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

const ABORT_SIGNAL_TIMEOUT = 5_000 as const;

export async function caelusInGuild(guildId: Snowflake) {
	const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsMeRoute(guildId)}`, {
		signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
	});

	return ((await response.json()) as APIGuildsMeResponse).present;
}

export async function setGuildsDailyGuidesChannel(
	guildId: Snowflake,
	channelId: Snowflake | null,
	locale: string,
) {
	const response = await fetch(
		`${INTERNAL_URL_CAELUS}${guildsDailyGuides(guildId)}?${makeURLSearchParams({ locale })}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ channel_id: channelId } satisfies APIPutGuildsDailyGuidesBody),
			signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
		},
	);

	if (!response.ok) {
		const json = await response.json();
		throw new CaelusAPIError(json as APIError);
	}

	return null as APIPutGuildsDailyGuidesResponse;
}

export async function getGuildsDailyGuidesChannels(guildId: Snowflake) {
	const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsDailyGuidesChannels(guildId)}`, {
		signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
	});

	const json = await response.json();

	if (!response.ok) {
		throw new CaelusAPIError(json as APIError);
	}

	return json as APIGuildsDailyGuidesChannelsResponse;
}

export async function checkDailyGuidesChannelPermissions(
	guildId: Snowflake,
	channelId: Snowflake,
	locale: string,
) {
	const response = await fetch(
		`${INTERNAL_URL_CAELUS}${guildsDailyGuidesChannelCheckPermissions(guildId, channelId)}?${makeURLSearchParams({ locale })}`,
		{ signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) },
	);

	const json = await response.json();

	if (!response.ok) {
		throw new CaelusAPIError(json as APIError);
	}

	return json as APIGuildsDailyGuidesChannelCheckPermissionsResponse;
}
