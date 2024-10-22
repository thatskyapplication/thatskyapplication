import { Events } from "discord.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = Events.ChannelUpdate;

export default {
	name,
	async fire(oldChannel, newChannel) {
		if (oldChannel.isDMBased() || newChannel.isDMBased()) {
			return;
		}

		if (oldChannel.permissionOverwrites.cache.equals(newChannel.permissionOverwrites.cache)) {
			return;
		}

		await checkSendable(newChannel.client, newChannel.guild.id);
	},
} satisfies Event<typeof name>;
