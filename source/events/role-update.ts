import { Events } from "discord.js";
import { checkSendable } from "../models/Notification.js";
import type { Event } from "./index.js";

const name = Events.GuildRoleUpdate;

export default {
	name,
	async fire(oldRole, newRole) {
		if (oldRole.permissions.equals(newRole.permissions)) {
			return;
		}

		await checkSendable(newRole.client, newRole.guild.id);
	},
} satisfies Event<typeof name>;
