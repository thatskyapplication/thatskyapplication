import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildUpdate;

export default {
	name,
	fire({ data }) {
		GUILD_CACHE.get(data.id)?.patch(data) ??
			pino.warn({ data }, "Received a guild update packet for an uncached guild.");
	},
} satisfies Event<typeof name>;
