import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { updateLocale } from "../features/notifications.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildUpdate;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		if (data.preferred_locale !== guild.preferredLocale) {
			await updateLocale(data.id, data.preferred_locale);
		}

		guild.patch(data);
	},
} satisfies Event<typeof name>;
