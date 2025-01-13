import type { Snowflake } from "@discordjs/core";

export interface ContentCreatorsPacket {
	user_id: Snowflake;
	description: string | null;
	youtube: string | null;
	twitch: string | null;
	tiktok: string | null;
	x: string | null;
	instagram: string | null;
	facebook: string | null;
	bluesky: string | null;
	name: string | null;
	avatar: string | null;
}

export type ContentCreatorsEditOptions = {
	[K in keyof Omit<ContentCreatorsPacket, "user_id">]?: NonNullable<ContentCreatorsPacket[K]>;
};
