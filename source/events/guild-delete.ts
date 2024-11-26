import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { MESSAGE_CACHE } from "../caches/messages.js";
import pino from "../pino.js";
import { handleGuildRemove } from "../services/guess.js";
import { logGuildDelete } from "../services/log.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildDelete;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}

		if (data.unavailable) {
			// This is when a guild becomes (or is already) unavailable.

			if (guild) {
				pino.info({ guild_id: data.id }, "Guild is unavailable.");
				guild.unavailable = true;
			}

			return;
		}

		if (guild) {
			for (const channel of guild.channels.values()) {
				if (channel.guild_id === data.id) {
					MESSAGE_CACHE.delete(channel.id);
				}
			}

			for (const thread of guild.threads.values()) {
				MESSAGE_CACHE.delete(thread.id);
			}
		}

		GUILD_CACHE.delete(data.id);
		logGuildDelete(data);
		await Promise.all([handleGuildRemove(data.id), checkSendable(data.id)]);
	},
} satisfies Event<typeof name>;
