import { Collection } from "@discordjs/collection";
import type { APIChannel, GuildChannelType, Snowflake, ThreadChannelType } from "@discordjs/core";

export const CHANNEL_CACHE = new Collection<
	Snowflake,
	APIChannel & {
		type: Exclude<GuildChannelType, ThreadChannelType>;
		guild_id: Snowflake;
	}
>();
