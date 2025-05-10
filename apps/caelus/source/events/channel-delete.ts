import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { MESSAGE_CACHE } from "../caches/messages.js";
import { checkSendable } from "../features/notification.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelDelete;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		guild.channels.delete(data.id);
		MESSAGE_CACHE.delete(data.id);
		await checkSendable(data.guild_id);
	},
} satisfies Event<typeof name>;
