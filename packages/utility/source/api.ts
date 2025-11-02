import type { APIChannel, Snowflake } from "discord-api-types/v10";
import type { DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES } from "./daily-guides.js";

export function guildsMeRoute(guildId: Snowflake) {
	return `/api/guilds/${guildId}/@me` as const;
}

export interface APIGuildsMeResponse {
	present: boolean;
}

export function guildsDailyGuidesChannels(guildId: Snowflake) {
	return `/api/guilds/${guildId}/daily-guides/channels` as const;
}

export type APIGuildsDailyGuidesChannelsResponse = readonly Pick<
	Extract<APIChannel, { type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }>,
	"id" | "type" | "name"
>[];

export function guildsDailyGuidesChannelCheckPermissions(guildId: Snowflake, channelId: Snowflake) {
	return `/api/guilds/${guildId}/daily-guides/channel/${channelId}/check-permissions` as const;
}

export interface APIGuildsDailyGuidesChannelCheckPermissionsBadResponse {
	message: string;
}

export type APIGuildsDailyGuidesChannelCheckPermissionsOKResponse = null;

export type APIGuildsDailyGuidesChannelCheckPermissionsResponse =
	| APIGuildsDailyGuidesChannelCheckPermissionsOKResponse
	| APIGuildsDailyGuidesChannelCheckPermissionsBadResponse;

export function guildsDailyGuides(guildId: Snowflake) {
	return `/api/guilds/${guildId}/daily-guides` as const;
}

export interface APIPutGuildsDailyGuidesBody {
	channel_id: Snowflake | null;
}

export interface APIPutGuildsDailyGuidesResponse<Success extends boolean = boolean> {
	success: Success;
	message: Success extends true ? null : readonly string[];
}
