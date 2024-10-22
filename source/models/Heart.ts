import type { Snowflake } from "discord.js";

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
}
