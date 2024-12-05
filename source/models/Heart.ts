import type { Snowflake } from "@discordjs/core";
import type { DateTime } from "luxon";

export interface HeartPacket {
	gifter_id: Snowflake | null;
	giftee_id: Snowflake | null;
	timestamp: Date;
	hearts_extra: number;
}

export interface HeartsExtra {
	start: DateTime;
	/**
	 * The end date is exclusive.
	 */
	end: DateTime;
	/**
	 * The count of extra hearts.
	 */
	count: number;
}
