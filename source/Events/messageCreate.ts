import { Events, PermissionFlagsBits } from "discord.js";
import { messageCreateEmojiResponse, messageCreateReactionResponse, messageCreateResponse } from "../OpenAI.js";
import AI from "../Structures/AI.js";
import Configuration from "../Structures/Configuration.js";
import DailyGuides from "../Structures/DailyGuides.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export default {
	name,
	async fire(message) {
		if (!message.inGuild()) return;
		void DailyGuides.parse(message);
		const me = await message.guild.members.fetchMe();

		if (
			!Configuration.ai ||
			message.author.bot ||
			!message.channel
				.permissionsFor(me)
				.has(
					PermissionFlagsBits.ReadMessageHistory |
						(message.channel.isThread() ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages),
				) ||
			message.content.length <= 5 ||
			message.mentions.has(message.client.user.id, { ignoreEveryone: true, ignoreRoles: true }) ||
			me.isCommunicationDisabled()
		) {
			return;
		}

		const frequency = AI.cache.get(message.guildId)?.frequency;
		if (!frequency) return;

		if (Math.random() < frequency) {
			void (Math.random() < 0.1
				? Math.random() < 0.5 && me.permissions.has(PermissionFlagsBits.AddReactions)
					? messageCreateReactionResponse(message)
					: messageCreateEmojiResponse(message)
				: messageCreateResponse(message));
		}
	},
} satisfies Event<typeof name>;
