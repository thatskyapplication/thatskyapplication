import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { createThread } from "../models/discord/thread.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ThreadListSync;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		for (const id of data.channel_ids ?? guild.channels.keys()) {
			for (const thread of guild.threads.values()) {
				if (thread.threadMetadata && !thread.threadMetadata.archived && thread.parentId === id) {
					guild.threads.delete(thread.id);
				}
			}
		}

		for (const thread of data.threads) {
			const existing = guild.threads.get(thread.id);

			if (existing) {
				existing.patch(thread);
			} else {
				createThread(thread, guild);
			}
		}
	},
} satisfies Event<typeof name>;
