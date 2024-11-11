import { ChannelType, GatewayDispatchEvents, PermissionFlagsBits } from "@discordjs/core";
import { CHANNEL_CACHE } from "../caches/channels.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { addMessageToCache } from "../caches/messages.js";
import AI from "../models/AI.js";
import Configuration from "../models/Configuration.js";
import DailyGuides from "../models/DailyGuides.js";
import { APPLICATION_ID } from "../utility/constants.js";
import { isCommunicationDisabled } from "../utility/functions.js";
import { can } from "../utility/permissions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageCreate;

export default {
	name,
	async fire({ api, data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			return;
		}

		const channel = CHANNEL_CACHE.get(data.channel_id);

		if (!channel) {
			return;
		}

		void DailyGuides.parse(data);
		const me = await api.guilds.getMember(guild.id, APPLICATION_ID);

		if (
			!Configuration.ai ||
			data.author.bot ||
			!can({
				permission:
					PermissionFlagsBits.ReadMessageHistory |
					(channel?.type === ChannelType.PublicThread ||
					channel?.type === ChannelType.PrivateThread ||
					channel?.type === ChannelType.AnnouncementThread
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages),
				guild,
				member: me,
				channel,
			}) ||
			data.content.length <= 5 ||
			isCommunicationDisabled(me)
		) {
			return;
		}

		const ai = AI.cache.get(guild.id);

		if (ai) {
			addMessageToCache(data);
			const { frequency } = ai;

			if (
				(frequency && Math.random() < frequency) ||
				data.mentions.find((user) => user.id === APPLICATION_ID)
			) {
				await ai.respond(data, me);
			}
		}
	},
} satisfies Event<typeof name>;
