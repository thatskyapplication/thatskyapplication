import { ChannelType, GatewayDispatchEvents } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE, GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import { handleGuildCreate } from "../services/guess.js";
import { logGuildCreate } from "../services/log.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildCreate;

export default {
	name,
	async fire({ data }) {
		if (GUILD_IDS_FROM_READY.has(data.id)) {
			const { channels, ...otherData } = data;
			GUILD_CACHE.set(data.id, otherData);

			for (const channel of channels) {
				if (channel.type !== ChannelType.DM && channel.type !== ChannelType.GroupDM) {
					channel.guild_id = data.id;
				}

				CHANNEL_CACHE.set(channel.id, channel);
			}

			GUILD_IDS_FROM_READY.delete(data.id);
			return;
		}

		GUILD_CACHE.set(data.id, data);
		logGuildCreate(data);
		await handleGuildCreate(data);
	},
} satisfies Event<typeof name>;
