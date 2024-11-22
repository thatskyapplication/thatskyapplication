import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ThreadUpdate;

export default {
	name,
	fire({ data }) {
		if (data.guild_id) {
			GUILD_CACHE.get(data.guild_id)?.threads.get(data.id)?.patch(data) ??
				pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);

			return;
		}

		pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
	},
} satisfies Event<typeof name>;
