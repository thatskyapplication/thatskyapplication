import type { Snowflake } from "@discordjs/core";

export interface GuildSettingsPacket {
	guild_id: Snowflake;
	member_log_channel_id: Snowflake | null;
	message_log_channel_id: Snowflake | null;
	message_log_ignore_channel_ids: Snowflake[];
	message_log_allow_channel_ids: Snowflake[];
	report_channel_id: Snowflake | null;
	report_command_id: Snowflake | null;
	report_tag_id: Snowflake | null;
}

export type GuildSettingsUpdateMessageLog = Pick<GuildSettingsPacket, "guild_id"> &
	Partial<
		Pick<
			GuildSettingsPacket,
			"message_log_channel_id" | "message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
		>
	>;

export type GuildSettingsSetupReportOptions = Pick<GuildSettingsPacket, "guild_id"> &
	Partial<Pick<GuildSettingsPacket, "report_channel_id" | "report_command_id" | "report_tag_id">>;
