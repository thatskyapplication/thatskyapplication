import type { APIChannel, APIPublicThreadChannel, Snowflake } from "@discordjs/core";
import type { DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES } from "../utility/constants.js";
import type { PublicThread } from "./discord/thread.js";

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

export type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;
