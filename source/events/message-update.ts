import { GatewayDispatchEvents } from "@discordjs/core";
import { updateMessageCache } from "../caches/messages.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageUpdate;

export default {
	name,
	fire({ data }) {
		updateMessageCache(data);
	},
} satisfies Event<typeof name>;
