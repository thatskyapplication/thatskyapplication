import type { APIChannel, Snowflake } from "discord-api-types/v10";
import type { DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES } from "./daily-guides.js";

export enum APIErrorCode {
	UnknownGuild = 0,
	UnknownChannel = 1,
	MissingPermissions = 2,
}

const APIErrorCodeToMessage = {
	[APIErrorCode.UnknownGuild]: "Unknown guild.",
	[APIErrorCode.UnknownChannel]: "Unknown channel.",
	[APIErrorCode.MissingPermissions]: "Missing permissions.",
} as const satisfies Readonly<Record<APIErrorCode, string>>;

export interface APIError {
	message: string;
	code: APIErrorCode;
	description: unknown | null;
}

export function createAPIError(errorCode: APIErrorCode, description?: unknown): APIError {
	return {
		message: APIErrorCodeToMessage[errorCode],
		code: errorCode,
		description,
	};
}

export class CaelusAPIError extends Error {
	public override readonly name = this.constructor.name;

	public readonly code: APIErrorCode;

	public readonly description: unknown;

	public constructor({ code, description }: APIError) {
		super(APIErrorCodeToMessage[code]);
		this.code = code;
		this.description = description;
	}
}

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

export type APIPutGuildsDailyGuidesResponse = null;
