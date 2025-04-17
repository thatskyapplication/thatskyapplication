import { GatewayDispatchEvents, type Snowflake } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import type { GuildSettingsPacket } from "../features/guild-settings.js";
import { handleMessageDeleteBulk } from "../features/message-log.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageDeleteBulk;

export default {
	name,
	async fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		const guildSettingsPacket = await pg<
			GuildSettingsPacket & { message_log_channel_id: Snowflake }
		>(Table.GuildSettings)
			.select(
				"message_log_channel_id",
				"message_log_ignore_channel_ids",
				"message_log_allow_channel_ids",
			)
			.where({ guild_id: guild.id })
			.and.whereNotNull("message_log_channel_id")
			.first();

		if (guildSettingsPacket) {
			await handleMessageDeleteBulk(data, guild, guildSettingsPacket);
		}
	},
} satisfies Event<typeof name>;
