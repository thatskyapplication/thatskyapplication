import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { checkSendable } from "../features/notifications.js";
import pino from "../pino.js";
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

		GUILD_CACHE.delete(data.id);
		pino.info(guild ?? data, "Guild left.");
		await checkSendable(data.id);
	},
} satisfies Event<typeof name>;
