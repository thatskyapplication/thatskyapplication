import {
	type APIChannel,
	ChannelType,
	type GatewayMessageCreateDispatchData,
	type GatewayMessageDeleteBulkDispatchData,
	type GatewayMessageDeleteDispatchData,
	type GatewayMessageUpdateDispatchData,
	MessageReferenceType,
	PermissionFlagsBits,
	type Snowflake,
} from "@discordjs/core";
import { Table } from "@thatskyapplication/utility";
import { diffLines, diffWords } from "diff";
import { client } from "../discord.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pg from "../pg.js";
import {
	MESSAGE_LOG_CHANNEL_ID,
	MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS,
	MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS,
} from "../utility/configuration.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import {
	avatarURL,
	isThreadChannel,
	messageLink,
	skyProfileWebsiteURL,
	userTag,
} from "../utility/functions.js";
import { can, isChannelPublic } from "../utility/permissions.js";

const MESSAGE_UPDATE_CODE_CHECK_REGULAR_EXPRESSION = /```.*?```/s;
const MESSAGE_UPDATE_REGULAR_EXPRESSION = /```(?:(\S+)\n)?\s*(.+?)\s*```/s;
const MESSAGE_LOG_CHANNEL_TYPES = [ChannelType.GuildText] as const;

interface MessagesPacket {
	guild_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	user_id: Snowflake;
	content: string;
	created_at: Date;
	reply_message_id: Snowflake | null;
}

type MessageLogAllowedChannel = Extract<
	APIChannel,
	{ type: (typeof MESSAGE_LOG_CHANNEL_TYPES)[number] }
>;

function isMessageLogChannel(channel: APIChannel): channel is MessageLogAllowedChannel {
	return MESSAGE_LOG_CHANNEL_TYPES.includes(
		channel.type as (typeof MESSAGE_LOG_CHANNEL_TYPES)[number],
	);
}

function isMessageLogSendable(
	guild: Guild,
	channel: MessageLogAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

function isMessageLogSendable(
	guild: Guild,
	channel: MessageLogAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

function isMessageLogSendable(
	guild: Guild,
	channel: MessageLogAllowedChannel,
	me: GuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.isCommunicationDisabled()) {
		errors.push("I am timed out.");
	}

	if (
		!can({
			permission:
				PermissionFlagsBits.ViewChannel |
				PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.EmbedLinks,
			guild,
			member: me,
			channel,
		})
	) {
		errors.push(
			`\`View Channel\` & \`Send Messages\` & \`Embed Links\` are required for <#${channel.id}>.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

function shouldLogMessage(
	guild: Guild,
	channel: GuildChannel | AnnouncementThread | PublicThread | PrivateThread,
) {
	// Get the effective channel.
	const effectiveChannel = isThreadChannel(channel)
		? guild.channels.get(channel.parentId)
		: channel;

	if (!effectiveChannel) {
		return false;
	}

	// Is the channel itself explicitly allowed?
	if (MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS.includes(channel.id)) {
		return true;
	}

	// Is the channel itself explicitly ignored?
	if (MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS.includes(channel.id)) {
		return false;
	}

	// Is the parent channel for threads explicitly allowed?
	if (
		isThreadChannel(channel) &&
		MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS.includes(effectiveChannel.id)
	) {
		return true;
	}

	// Is the parent channel for threads explicitly ignored?
	if (
		isThreadChannel(channel) &&
		MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS.includes(effectiveChannel.id)
	) {
		return false;
	}

	// Check for categories.
	const categoryId = effectiveChannel.parent_id;

	if (categoryId) {
		if (MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS.includes(categoryId)) {
			return true;
		}

		if (MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS.includes(categoryId)) {
			return false;
		}
	}

	// Lastly, is the channel public?
	return isChannelPublic(guild, effectiveChannel);
}

export async function messageLogUpsert(
	message: GatewayMessageCreateDispatchData,
	guild: Guild,
	bypassLogCheck = false,
) {
	const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);

	if (!(channel && (bypassLogCheck || shouldLogMessage(guild, channel)))) {
		return;
	}

	await pg<MessagesPacket>(Table.Messages)
		.insert({
			guild_id: guild.id,
			channel_id: message.channel_id,
			message_id: message.id,
			user_id: message.author.id,
			content: message.content,
			created_at: new Date(message.timestamp),
			reply_message_id:
				message.message_reference?.type === MessageReferenceType.Default
					? message.message_reference.message_id!
					: null,
		})
		.onConflict("message_id")
		.merge(["content"]);
}

export async function messageLogDeleteOldMessages() {
	// Delete messages older than 30 days.
	await pg<MessagesPacket>(Table.Messages)
		.delete()
		.where("created_at", "<", new Date(Date.now() - 2592000000));
}

export async function messageLogHandleMessageUpdate(
	message: GatewayMessageUpdateDispatchData,
	guild: Guild,
) {
	const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);
	const messageLogChannel = guild.channels.get(MESSAGE_LOG_CHANNEL_ID);

	if (
		!(
			channel &&
			messageLogChannel &&
			isMessageLogChannel(messageLogChannel) &&
			shouldLogMessage(guild, channel) &&
			isMessageLogSendable(guild, messageLogChannel, await guild.fetchMe())
		)
	) {
		return;
	}

	const messagesPacket = await pg<MessagesPacket>(Table.Messages)
		.select("content")
		.where({ message_id: message.id })
		.first();

	const oldContent = messagesPacket?.content;

	if (!oldContent) {
		// We have no old content for this.
		// We can, however, store it for the future, but only if the message was created within the past 30 days.
		if (Date.parse(message.timestamp) < Date.now() - 2592000000) {
			return;
		}

		await messageLogUpsert(message, guild);
		return;
	}

	if (oldContent === message.content) {
		return;
	}

	await messageLogUpsert(message, guild);
	let description = "";

	if (
		MESSAGE_UPDATE_CODE_CHECK_REGULAR_EXPRESSION.test(oldContent) &&
		MESSAGE_UPDATE_CODE_CHECK_REGULAR_EXPRESSION.test(message.content)
	) {
		const strippedOldMessage = MESSAGE_UPDATE_REGULAR_EXPRESSION.exec(oldContent);

		if (!strippedOldMessage?.[2]) {
			return;
		}

		const strippedNewMessage = MESSAGE_UPDATE_REGULAR_EXPRESSION.exec(message.content);

		if (!strippedNewMessage?.[2] || strippedOldMessage[2] === strippedNewMessage[2]) {
			return;
		}

		const diffMessage = diffLines(strippedOldMessage[2], strippedNewMessage[2]);

		for (const part of diffMessage) {
			const text = part.added ? "+ " : part.removed ? "- " : "";
			description += text + part.value;
		}

		description = `\`\`\`diff\n${description}\n\`\`\``;
	} else {
		const diffMessage = diffWords(oldContent, message.content);

		for (const part of diffMessage) {
			const markdown = part.added ? "**" : part.removed ? "~~" : "";
			description += `${markdown}${part.value}${markdown}`;
		}
	}

	await client.api.channels.createMessage(MESSAGE_LOG_CHANNEL_ID, {
		embeds: [
			{
				author: {
					name: `${userTag(message.author)} (${message.author.id})`,
					icon_url: avatarURL(message.author),
					url: skyProfileWebsiteURL(message.author.id),
				},
				description: description.slice(0, 4000),
				color: DEFAULT_EMBED_COLOUR,
				fields: [
					{
						name: "",
						value: `[Message link](${messageLink(guild.id, message.channel_id, message.id)})`,
					},
				],
				timestamp: message.edited_timestamp!,
				title: "Message updated",
			},
		],
	});
}

export async function messageLogHandleMessageDelete(
	message: GatewayMessageDeleteDispatchData,
	guild: Guild,
) {
	const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);
	const messageLogChannel = guild.channels.get(MESSAGE_LOG_CHANNEL_ID);

	if (
		!(
			channel &&
			messageLogChannel &&
			isMessageLogChannel(messageLogChannel) &&
			shouldLogMessage(guild, channel) &&
			isMessageLogSendable(guild, messageLogChannel, await guild.fetchMe())
		)
	) {
		return;
	}

	const messagesPacket = await pg<MessagesPacket>(Table.Messages)
		.select("user_id", "content", "reply_message_id")
		.where({ message_id: message.id })
		.first();

	if (!messagesPacket) {
		return;
	}

	const user = await client.api.users.get(messagesPacket.user_id);

	const details: [string, ...string[]] = [
		`[Message link](${messageLink(guild.id, message.channel_id, message.id)})`,
	];

	if (messagesPacket.reply_message_id) {
		details.push(
			`[Reply link](${messageLink(guild.id, message.channel_id, messagesPacket.reply_message_id)})`,
		);
	}

	await client.api.channels.createMessage(MESSAGE_LOG_CHANNEL_ID, {
		embeds: [
			{
				author: {
					name: `${userTag(user)} (${user.id})`,
					icon_url: avatarURL(user),
					url: skyProfileWebsiteURL(user.id),
				},
				description: messagesPacket.content,
				color: DEFAULT_EMBED_COLOUR,
				fields: [
					{
						name: "",
						value:
							details.length > 1 ? details.map((detail) => `- ${detail}`).join("\n") : details[0],
					},
				],
				timestamp: new Date().toISOString(),
				title: "Message deleted",
			},
		],
	});
}

export async function messageLogHandleMessageDeleteBulk(
	data: GatewayMessageDeleteBulkDispatchData,
	guild: Guild,
) {
	const channel = guild.channels.get(data.channel_id) ?? guild.threads.get(data.channel_id);
	const messageLogChannel = guild.channels.get(MESSAGE_LOG_CHANNEL_ID);

	if (
		!(
			channel &&
			messageLogChannel &&
			isMessageLogChannel(messageLogChannel) &&
			shouldLogMessage(guild, channel) &&
			isMessageLogSendable(guild, messageLogChannel, await guild.fetchMe())
		)
	) {
		return;
	}

	const messagesPackets = await pg<MessagesPacket>(Table.Messages)
		.select("user_id", "content", "reply_message_id")
		.whereIn("message_id", data.ids)
		.orderBy("created_at", "asc");

	if (messagesPackets.length === 0) {
		return;
	}

	await client.api.channels.createMessage(MESSAGE_LOG_CHANNEL_ID, {
		embeds: [
			{
				description: `${messagesPackets.length} messages attached.`,
				color: DEFAULT_EMBED_COLOUR,
				timestamp: new Date().toISOString(),
				title: "Message delete bulk",
			},
		],
		files: [
			{
				data: messagesPackets
					.map((messagePacket) => `[${messagePacket.user_id}]: ${messagePacket.content}`)
					.join("\n"),
				name: "messages.txt",
			},
		],
	});
}
