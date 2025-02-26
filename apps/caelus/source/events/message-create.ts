import { ChannelType, GatewayDispatchEvents, PermissionFlagsBits } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { addMessageToCache } from "../caches/messages.js";
import AI from "../models/AI.js";
import Configuration from "../models/Configuration.js";
import DailyGuides from "../models/DailyGuides.js";
import type { GuildChannel } from "../models/discord/guild.js";
import pino from "../pino.js";
import { APPLICATION_ID } from "../utility/constants.js";
import { can } from "../utility/permissions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageCreate;

export default {
	name,
	async fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			return;
		}

		const channel = guild.channels.get(data.channel_id) ?? guild.threads.get(data.channel_id);

		if (!channel) {
			return;
		}

		void DailyGuides.parse(data);
		const me = await guild.fetchMe();

		const isThreadChannelType =
			channel.type === ChannelType.AnnouncementThread ||
			channel.type === ChannelType.PublicThread ||
			channel.type === ChannelType.PrivateThread;

		let resolvedChannelForPermission: GuildChannel;

		if (isThreadChannelType) {
			const parentChannel = guild.channels.get(channel.parentId);

			if (!parentChannel) {
				pino.warn(data, `Received a ${name} packet for an uncached parent channel.`);
				return;
			}

			resolvedChannelForPermission = parentChannel;
		} else {
			resolvedChannelForPermission = channel;
		}

		addMessageToCache(data);

		if (
			!Configuration.ai ||
			data.author.bot ||
			!can({
				permission:
					PermissionFlagsBits.ReadMessageHistory |
					(isThreadChannelType
						? PermissionFlagsBits.SendMessagesInThreads
						: PermissionFlagsBits.SendMessages),
				guild,
				member: me,
				channel: resolvedChannelForPermission,
			}) ||
			data.content.length <= 5 ||
			me.isCommunicationDisabled()
		) {
			return;
		}

		const ai = AI.cache.get(guild.id);

		if (ai) {
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
