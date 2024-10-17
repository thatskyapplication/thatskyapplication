import { Events } from "discord.js";
import Notification from "../Structures/Notification.js";
import type { Event } from "./index.js";

const name = Events.ChannelDelete;

export default {
	name,
	async fire(channel) {
		if (channel.isDMBased()) {
			return;
		}

		await Notification.checkSendable(channel.client, channel.guild.id);
	},
} satisfies Event<typeof name>;
