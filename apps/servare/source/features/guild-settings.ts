import type { Snowflake } from "@discordjs/core";

export interface GuildSettingsPacket {
	guild_id: Snowflake;
	member_log_channel_id: Snowflake | null;
	message_log_channel_id: Snowflake | null;
	message_log_ignore_channel_ids: Snowflake[];
	message_log_allow_channel_ids: Snowflake[];
}

export type GuildSettingsUpdateMessageLog = Pick<GuildSettingsPacket, "guild_id"> &
	Partial<
		Pick<
			GuildSettingsPacket,
			"message_log_channel_id" | "message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
		>
	>;
