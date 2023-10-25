import { Events, PermissionFlagsBits } from "discord.js";
import { messageCreateResponse } from "../OpenAI.js";
import AI, { AI_FREQUENCY_DEFAULT } from "../Structures/AI.js";
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
			!message.channel
				.permissionsFor(me)
				.has(PermissionFlagsBits.ReadMessageHistory | PermissionFlagsBits.SendMessages) ||
			message.mentions.has(message.client.user.id, { ignoreEveryone: true, ignoreRoles: true })
		) {
			return;
		}

		const frequency = (AI.cache.get(message.guildId)?.frequency ?? AI_FREQUENCY_DEFAULT) / 1_000;
		if (frequency === 0) return;
		if (Math.random() < frequency && message.content.length > 0) void messageCreateResponse(message);
	},
};
