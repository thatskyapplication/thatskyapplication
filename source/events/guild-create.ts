import { GatewayDispatchEvents } from "@discordjs/core";
import { handleGuildCreate } from "../services/guess.js";
import { logGuildCreate } from "../services/log.js";
import type { Event } from "./index.js";
import { GUILD_CACHE, GUILD_IDS_FROM_READY } from "../caches/guilds.js";

const name = GatewayDispatchEvents.GuildCreate;

export default {
	name,
	async fire({ data }) {
		if (GUILD_IDS_FROM_READY.has(data.id)) {
			GUILD_CACHE.set(data.id, data);
			GUILD_IDS_FROM_READY.delete(data.id);
			return;
		}

		GUILD_CACHE.set(data.id, data);
		logGuildCreate(data);
		await handleGuildCreate(this, data);
	},
} satisfies Event<typeof name>;
