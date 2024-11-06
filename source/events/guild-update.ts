import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildUpdate;

export default {
	name,
	fire({ data }) {
		GUILD_CACHE.set(data.id, data);
	},
} satisfies Event<typeof name>;
