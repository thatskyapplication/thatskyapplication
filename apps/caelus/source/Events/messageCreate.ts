import { Events, PermissionFlagsBits } from "discord.js";
import { messageCreateResponse } from "../OpenAIApi.js";
import DailyGuides from "../Structures/DailyGuides.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export const event: Event<typeof name> = {
	name,
	async fire(message) {
		if (!message.inGuild()) return;
		void DailyGuides.parse(message);
		const me = await message.guild.members.fetchMe();

		if (
			message.author.bot ||
			!message.channel.permissionsFor(me).has(PermissionFlagsBits.ReadMessageHistory | PermissionFlagsBits.SendMessages)
		)
			return;

		const meMention = message.mentions.has(message.client.user.id, { ignoreEveryone: true, ignoreRoles: true });
		if (Math.random() < 0.005 && message.content.length > 0 && !meMention) void messageCreateResponse(message, true);
	},
};
