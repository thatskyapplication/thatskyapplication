import { Events } from "discord.js";
import Notification from "../Structures/Notification.js";
import type { Event } from "./index.js";

const name = Events.GuildRoleUpdate;

export default {
	name,
	async fire(oldRole, newRole) {
		if (oldRole.permissions.equals(newRole.permissions)) {
			return;
		}

		await Notification.checkSendable(newRole.client, newRole.guild.id);
	},
} satisfies Event<typeof name>;
