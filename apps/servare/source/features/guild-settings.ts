import type { Snowflake } from "@discordjs/core";

export interface GuildSettingsPacket {
	guild_id: Snowflake;
	member_log_channel_id: Snowflake | null;
}
