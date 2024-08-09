import { Events, PermissionFlagsBits } from "discord.js";
import AI from "../Structures/AI.js";
import Configuration from "../Structures/Configuration.js";
import DailyGuides from "../Structures/DailyGuides.js";
import { APPLICATION_ID } from "../Utility/Constants.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export default {
	name,
	async fire(message) {
		if (!message.inGuild()) {
			return;
		}

		void DailyGuides.parse(message);
		const me = await message.guild.members.fetchMe();

		if (
			!Configuration.ai ||
			message.author.bot ||
			!message.channel
				.permissionsFor(me)
				.has(
					PermissionFlagsBits.ReadMessageHistory |
						PermissionFlagsBits.UseExternalEmojis |
						(message.channel.isThread()
							? PermissionFlagsBits.SendMessagesInThreads
							: PermissionFlagsBits.SendMessages),
				) ||
			message.content.length <= 5 ||
			me.isCommunicationDisabled()
		) {
			return;
		}

		const ai = AI.cache.get(message.guildId);

		if (ai) {
			const { frequency } = ai;

			if (
				(frequency && Math.random() < frequency) ||
				message.mentions.has(APPLICATION_ID, { ignoreEveryone: true, ignoreRoles: true })
			) {
				await ai.respond(message, me);
			}
		}
	},
} satisfies Event<typeof name>;
