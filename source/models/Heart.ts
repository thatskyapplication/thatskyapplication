import type { Snowflake } from "@discordjs/core";

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
}
