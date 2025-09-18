import type { APIUser, RESTPostOAuth2AccessTokenResult } from "@discordjs/core/http-only";

export type DiscordUser = Pick<APIUser, "id" | "username" | "discriminator" | "avatar">;

export interface TokenExchange extends RESTPostOAuth2AccessTokenResult {
	expires_at: number;
}

export interface CrowdinUser {
	id: number;
	username: string;
}
