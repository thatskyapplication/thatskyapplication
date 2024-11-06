import { GatewayDispatchEvents } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelCreate;

export default {
	name,
	fire({ data }) {
		CHANNEL_CACHE.set(data.id, data);
	},
} satisfies Event<typeof name>;
