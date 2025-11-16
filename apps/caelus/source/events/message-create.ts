import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { messageLogUpsert } from "../features/message-log.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { isThreadChannel } from "../utility/functions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageCreate;

export default {
	name,
	async fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			return;
		}

		if (guild.id === SUPPORT_SERVER_GUILD_ID && !data.author.bot && data.content !== "") {
			await messageLogUpsert(data, guild);
		}

		const channel = guild.channels.get(data.channel_id) ?? guild.threads.get(data.channel_id);

		if (!channel) {
			return;
		}

		const isThreadChannelType = isThreadChannel(channel);

		if (isThreadChannelType) {
			const parentChannel = guild.channels.get(channel.parentId);

			if (!parentChannel) {
				pino.warn(data, `Received a ${name} packet for an uncached parent channel.`);
				return;
			}
		}
	},
} satisfies Event<typeof name>;
