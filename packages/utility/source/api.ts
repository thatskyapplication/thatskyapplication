export function guildsMeRoute(guildId: string) {
	return `/api/guilds/${guildId}/@me` as const;
}

export interface APIGuildsMeResponse {
	present: boolean;
}
