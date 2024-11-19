import { GatewayDispatchEvents } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE, GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import { handleGuildCreate } from "../services/guess.js";
import { logGuildCreate } from "../services/log.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildCreate;

export default {
	name,
	async fire({ data }) {
		const { channels, ...otherData } = data;
		GUILD_CACHE.set(data.id, otherData);

		for (const channel of channels) {
			CHANNEL_CACHE.set(channel.id, { ...channel, guild_id: data.id });
		}

		if (GUILD_IDS_FROM_READY.has(data.id)) {
			GUILD_IDS_FROM_READY.delete(data.id);
			return;
		}

		logGuildCreate(data);
		await handleGuildCreate(data);
	},
} satisfies Event<typeof name>;
