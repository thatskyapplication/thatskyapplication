import { GatewayDispatchEvents } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { MESSAGE_CACHE } from "../caches/messages.js";
import { handleGuildRemove } from "../services/guess.js";
import { logGuildDelete } from "../services/log.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildDelete;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.id);

		if (guild) {
			for (const channel of CHANNEL_CACHE.values()) {
				if (channel.guild_id === guild.id) {
					CHANNEL_CACHE.delete(channel.id);
					MESSAGE_CACHE.delete(channel.id);
				}
			}
		}

		GUILD_CACHE.delete(data.id);
		logGuildDelete(data);
		await Promise.all([handleGuildRemove(data.id), checkSendable(data.id)]);
	},
} satisfies Event<typeof name>;
