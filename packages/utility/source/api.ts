import type { Snowflake } from "discord-api-types/v10";

export function guildsMeRoute(guildId: Snowflake) {
	return `/api/guilds/${guildId}/@me` as const;
}

export interface APIGuildsMeResponse {
	present: boolean;
}
