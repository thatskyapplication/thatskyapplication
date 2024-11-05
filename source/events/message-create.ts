import { GatewayDispatchEvents, PermissionFlagsBits } from "@discordjs/core";
import AI from "../models/AI.js";
import Configuration from "../models/Configuration.js";
import DailyGuides from "../models/DailyGuides.js";
import { APPLICATION_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageCreate;

export default {
	name,
	async fire({api, data}) {
		if (!data.guild_id) {
			return;
		}

		void DailyGuides.parse(data);
		const me = await api.guilds.getMember(data.guild_id, APPLICATION_ID);

		if (
			!Configuration.ai ||
			data.author.bot ||
			!data.channel
				.permissionsFor(me)
				.has(
					PermissionFlagsBits.ReadMessageHistory |
						(data.channel.isThread()
							? PermissionFlagsBits.SendMessagesInThreads
							: PermissionFlagsBits.SendMessages),
				) ||
			data.content.length <= 5 ||
			me.isCommunicationDisabled()
		) {
			return;
		}

		const ai = AI.cache.get(data.guildId);

		if (ai) {
			const { frequency } = ai;

			if (
				(frequency && Math.random() < frequency) ||
				data.mentions.has(APPLICATION_ID, { ignoreEveryone: true, ignoreRoles: true })
			) {
				await ai.respond(data, me);
			}
		}
	},
} satisfies Event<typeof name>;
