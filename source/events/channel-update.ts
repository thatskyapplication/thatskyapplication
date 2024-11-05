import { GatewayDispatchEvents } from "@discordjs/core";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.ChannelUpdate;

export default {
	name,
	async fire({ data }) {
		if (!("guild_id" in data)) {
			return;
		}

		if (oldChannel.permissionOverwrites.cache.equals(newChannel.permissionOverwrites.cache)) {
			return;
		}

		await checkSendable(newChannel.client, newChannel.guild.id);
	},
} satisfies Event<typeof name>;
