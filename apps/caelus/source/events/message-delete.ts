import { GatewayDispatchEvents } from "@discordjs/core";
import { removeMessageFromCache } from "../caches/messages.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageDelete;

export default {
	name,
	fire({ data }) {
		removeMessageFromCache(data);
	},
} satisfies Event<typeof name>;
