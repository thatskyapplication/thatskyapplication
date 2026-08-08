import type { APIUser } from "@discordjs/core/http-only";

export type DiscordUser = Pick<APIUser, "id" | "username" | "discriminator" | "avatar">;

export interface CrowdinUser {
	id: number;
	username: string;
}
