import { GatewayDispatchEvents } from "@discordjs/core";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { MESSAGE_CACHE } from "../caches/messages.js";

const name = GatewayDispatchEvents.ChannelDelete;

export default {
	name,
	async fire({ data }) {
		CHANNEL_CACHE.delete(data.id);
		MESSAGE_CACHE.delete(data.id);
		await checkSendable(data.guild_id);
	},
} satisfies Event<typeof name>;
