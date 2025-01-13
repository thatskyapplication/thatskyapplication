import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { createThread } from "../models/discord/thread.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ThreadUpdate;

export default {
	name,
	fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		const thread = guild.threads.get(data.id);

		if (thread) {
			thread.patch(data);
			return;
		}

		pino.info(
			{ data },
			`Received a ${name} packet for an uncached thread. Adding it to the cache.`,
		);

		createThread(data, guild);
	},
} satisfies Event<typeof name>;
