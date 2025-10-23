import { GatewayDispatchEvents, PermissionFlagsBits } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { addMessageToCache } from "../caches/messages.js";
import { messageLogUpsert } from "../features/message-log.js";
import AI from "../models/AI.js";
import Configuration from "../models/Configuration.js";
import type { GuildChannel } from "../models/discord/guild.js";
import pino from "../pino.js";
import { APPLICATION_ID, SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { isThreadChannel } from "../utility/functions.js";
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

		if (guild.id === SUPPORT_SERVER_GUILD_ID && !data.author.bot && data.content !== "") {
			await messageLogUpsert(data, guild);
		}

		const channel = guild.channels.get(data.channel_id) ?? guild.threads.get(data.channel_id);

		if (!channel) {
			return;
		}

		const isThreadChannelType = isThreadChannel(channel);
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
		const me = await guild.fetchMe();

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

			if (data.mentions.some((user) => user.id === APPLICATION_ID)) {
				await ai.respond(data, me, true);
				return;
			}

			if (frequency && Math.random() < frequency) {
				await ai.respond(data, me, false);
				return;
			}
		}
	},
} satisfies Event<typeof name>;
