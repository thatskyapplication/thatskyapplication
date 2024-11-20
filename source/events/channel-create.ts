import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelCreate;

export default {
	name,
	fire({ data }) {
		GUILD_CACHE.get(data.guild_id)?.channels.set(data.id, data) ??
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
	},
} satisfies Event<typeof name>;
