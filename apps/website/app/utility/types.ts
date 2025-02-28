import type { Snowflake } from "@discordjs/core/http-only";

export interface ProfilePacket {
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: number | null;
	seasons: number[] | null;
	platform: number[] | null;
	spirit: number | null;
	spot: string | null;
	catalogue_progression: boolean | null;
	guess_rank: boolean | null;
}
