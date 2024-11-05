import { GatewayDispatchEvents } from "@discordjs/core";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelDelete;

export default {
	name,
	async fire({ api, data }) {
		if (!("guild_id" in data)) {
			return;
		}

		await checkSendable(api, data.guild_id);
	},
} satisfies Event<typeof name>;
