import type { APIChannel, Snowflake } from "@discordjs/core";
import type { DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES } from "../utility/constants.js";
import type { PublicThread } from "./discord/thread.js";

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

export interface DailyGuidesDistributionData {
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

export type DailyGuidesDistributionAllowedChannel =
	| Extract<APIChannel, { type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }>
	// Public thread channels do not dynamically narrow down because of the union within the channel's class.
	| PublicThread;
