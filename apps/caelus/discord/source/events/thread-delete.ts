import { GatewayDispatchEvents } from "@discordjs/core";
import { FRIENDSHIP_ACTIONS_CACHE } from "../caches/friendship-actions.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ThreadDelete;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		guild.threads.delete(data.id);
		FRIENDSHIP_ACTIONS_CACHE.delete(data.id);
	},
} satisfies Event<typeof name>;
