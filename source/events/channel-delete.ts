import { GatewayDispatchEvents } from "@discordjs/core";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";
import { CHANNEL_CACHE } from "../caches/channels.js";

const name = GatewayDispatchEvents.ChannelDelete;

export default {
	name,
	async fire({ api, data }) {
		CHANNEL_CACHE.delete(data.id);

		if (!("guild_id" in data)) {
			return;
		}

		await checkSendable(api, data.guild_id);
	},
} satisfies Event<typeof name>;
