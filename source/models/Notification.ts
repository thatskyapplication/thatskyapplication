import type { GuildBasedChannel, Snowflake } from "discord.js";
import type { NOTIFICATION_CHANNEL_TYPES } from "../utility/constants.js";

export interface NotificationPacket {
	guild_id: Snowflake;
	type: number;
	channel_id: Snowflake;
	role_id: Snowflake;
	offset: number;
	sendable: boolean;
}

export type NotificationAllowedChannel = Extract<
	GuildBasedChannel,
	{ type: (typeof NOTIFICATION_CHANNEL_TYPES)[number] }
>;
