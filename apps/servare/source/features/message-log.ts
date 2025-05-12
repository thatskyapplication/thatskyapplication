import {
	type APIChannel,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentSelectMenuInteraction,
	ChannelType,
	ComponentType,
	type GatewayMessageCreateDispatchData,
	type GatewayMessageDeleteBulkDispatchData,
	type GatewayMessageDeleteDispatchData,
	type GatewayMessageUpdateDispatchData,
	MessageFlags,
	MessageReferenceType,
	PermissionFlagsBits,
	SelectMenuDefaultValueType,
	type Snowflake,
} from "@discordjs/core";
import { diffLines, diffWords } from "diff";
import { client } from "../discord.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pg, { Table } from "../pg.js";
import {
	DEFAULT_ACCENT_COLOUR,
	MESSAGE_LOG_CHANNEL_TYPES,
	MESSAGE_LOG_IGNORE_ALLOW_CHANNEL_TYPES,
	MESSAGE_UPDATE_CODE_CHECK_REGULAR_EXPRESSION,
	MESSAGE_UPDATE_REGULAR_EXPRESSION,
} from "../utility/constants.js";
import {
	avatarURL,
	isThreadChannel,
	messageLink,
	skyProfileWebsiteURL,
	userTag,
} from "../utility/functions.js";
import { can, isChannelPublic } from "../utility/permissions.js";
import { CustomId, schemaStore } from "../utility/string-store.js";
import type { GuildSettingsPacket, GuildSettingsUpdateMessageLog } from "./guild-settings.js";

export interface MessagesPacket {
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
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		errors.push(`\`View Channel\` & \`Send Messages\` are required for <#${channel.id}>.`);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

async function setup(options: GuildSettingsUpdateMessageLog) {
	await pg<GuildSettingsPacket>(Table.GuildSettings).insert(options).onConflict("guild_id").merge();
}

export async function setupResponse(
	guildId: Snowflake,
): Promise<APIInteractionResponseCallbackData> {
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select(
			"message_log_channel_id",
			"message_log_ignore_channel_ids",
			"message_log_allow_channel_ids",
		)
		.where({ guild_id: guildId })
		.first();

	return {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.ChannelSelect,
						custom_id: schemaStore.serialize(CustomId.MessageLogChannelId, {}),
						// @ts-expect-error The mutable array error is fine.
						channel_types: MESSAGE_LOG_CHANNEL_TYPES,
						default_values: guildSettingsPacket?.message_log_channel_id
							? [
									{
										id: guildSettingsPacket.message_log_channel_id,
										type: SelectMenuDefaultValueType.Channel,
									},
								]
							: [],
						max_values: 1,
						min_values: 0,
						placeholder: "Select a channel to use for the message log.",
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.ChannelSelect,
						custom_id: schemaStore.serialize(CustomId.MessageLogIgnoreChannelIds, {}),
						// @ts-expect-error The mutable array error is fine.
						channel_types: MESSAGE_LOG_IGNORE_ALLOW_CHANNEL_TYPES,
						default_values: guildSettingsPacket?.message_log_ignore_channel_ids.map(
							(messageLogIgnoreChannelId) => ({
								id: messageLogIgnoreChannelId,
								type: SelectMenuDefaultValueType.Channel,
							}),
						),
						max_values: 25,
						min_values: 0,
						placeholder: "You may ignore channels here.",
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.ChannelSelect,
						custom_id: schemaStore.serialize(CustomId.MessageLogAllowChannelIds, {}),
						// @ts-expect-error The mutable array error is fine.
						channel_types: MESSAGE_LOG_IGNORE_ALLOW_CHANNEL_TYPES,
						default_values: guildSettingsPacket?.message_log_allow_channel_ids.map(
							(messageLogAllowChannelId) => ({
								id: messageLogAllowChannelId,
								type: SelectMenuDefaultValueType.Channel,
							}),
						),
						max_values: 25,
						min_values: 0,
						placeholder: "You may allow channels here.",
					},
				],
			},
		],
		embeds: [
			{
				title: "Message Log",
				description:
					"As a base, messages will be logged in channels viewable by @everyone.\n\nThe first select menu denotes where the messages will be logged to.\nThe second select menu denotes channels that will be ignored.\nThe third select menu denotes channels that will be allowed.\n\nThe second and third select menus accept text-based channels and category channels. A category channel will consider all channels within it.\n\nThe embed author of these logs is a link to their Sky profile.",
				color: DEFAULT_ACCENT_COLOUR,
			},
		],
		flags: MessageFlags.Ephemeral,
	};
}

export async function handleMessageLogChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (!(channel && isMessageLogChannel(channel))) {
			throw new Error("Received an unknown channel type whilst setting up the message log.");
		}

		const messageLogSendable = isMessageLogSendable(guild, channel, await guild.fetchMe(), true);

		if (messageLogSendable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: messageLogSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({ guild_id: interaction.guild_id, message_log_channel_id: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.guild_id),
	);
}

export async function handleMessageLogIgnoreChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	let channelIds = interaction.data.values;

	if (channelIds.length > 0) {
		const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
			.select("message_log_ignore_channel_ids", "message_log_allow_channel_ids")
			.where({ guild_id: guild.id })
			.first();

		const everyoneRole = guild.roles.get(guild.id);

		if (!everyoneRole) {
			throw new Error("No @everyone role found.");
		}

		for (const channelId of channelIds) {
			const channel = guild.channels.get(channelId);

			if (!channel) {
				throw new Error("Received an unknown channel whilst setting up the message log.");
			}

			const parentChannel = channel.parent_id && guild.channels.get(channel.parent_id);

			// Only check if the channel is public if the parent is not allowed.
			if (
				!(
					(parentChannel &&
						guildSettingsPacket?.message_log_allow_channel_ids.includes(parentChannel.id)) ||
					isChannelPublic(guild, channel)
				)
			) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `${channel.type === ChannelType.GuildCategory ? `The category ${channel.name}` : `<#${channel.id}>`} is already ignored: it is not public.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			if (
				!can({
					permission: PermissionFlagsBits.ViewChannel,
					guild,
					member: await guild.fetchMe(),
					channel,
				})
			) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `\`View Channel\` is required for ${channel.type === ChannelType.GuildCategory ? `the category ${channel.name}` : `<#${channel.id}>`}.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			if (guildSettingsPacket?.message_log_allow_channel_ids.includes(channelId)) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `${channel.type === ChannelType.GuildCategory ? `The category ${channel.name}` : `<#${channel.id}>`} is already in the allow list.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			// If this is a category channel, remove its children from the list.
			// Else, check to see if the category channel is already included.
			if (channel.type === ChannelType.GuildCategory) {
				channelIds = channelIds.filter((channelId) => {
					const childChannel = guild.channels.get(channelId);

					if (!childChannel || childChannel.parent_id === channel.id) {
						return false;
					}

					return true;
				});
			} else if (channel.parent_id) {
				const parentChannel = guild.channels.get(channel.parent_id);

				if (parentChannel && channelIds.includes(parentChannel.id)) {
					await client.api.interactions.reply(interaction.id, interaction.token, {
						content: `<#${channel.id}> is already ignored: its category is included already.`,
						flags: MessageFlags.Ephemeral,
					});

					return;
				}
			}
		}
	}

	await setup({ guild_id: interaction.guild_id, message_log_ignore_channel_ids: channelIds });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.guild_id),
	);
}

export async function handleMessageLogAllowChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	let channelIds = interaction.data.values;

	if (channelIds.length > 0) {
		const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
			.select("message_log_ignore_channel_ids", "message_log_allow_channel_ids")
			.where({ guild_id: guild.id })
			.first();

		const everyoneRole = guild.roles.get(guild.id);

		if (!everyoneRole) {
			throw new Error("No @everyone role found.");
		}

		for (const channelId of channelIds) {
			const channel = guild.channels.get(channelId);

			if (!channel) {
				throw new Error("Received an unknown channel whilst setting up the message log.");
			}

			const parentChannel = channel.parent_id && guild.channels.get(channel.parent_id);

			// Only check if the channel is public if the parent is allowed.
			if (
				!(
					parentChannel &&
					guildSettingsPacket?.message_log_ignore_channel_ids.includes(parentChannel.id)
				) &&
				isChannelPublic(guild, channel)
			) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `${channel.type === ChannelType.GuildCategory ? `The category ${channel.name}` : `<#${channel.id}>`} is already allowed: it is public.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			if (
				!can({
					permission: PermissionFlagsBits.ViewChannel,
					guild,
					member: await guild.fetchMe(),
					channel,
				})
			) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `\`View Channel\` is required for ${channel.type === ChannelType.GuildCategory ? `the category ${channel.name}` : `<#${channel.id}>`}.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			if (guildSettingsPacket?.message_log_ignore_channel_ids.includes(channelId)) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: `${channel.type === ChannelType.GuildCategory ? `The category ${channel.name}` : `<#${channel.id}>`} is already in the ignore list.`,
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			// If this is a category channel, remove its children from the list.
			// Else, check to see if the category channel is already included.
			if (channel.type === ChannelType.GuildCategory) {
				channelIds = channelIds.filter((channelId) => {
					const childChannel = guild.channels.get(channelId);

					if (!childChannel || childChannel.parent_id === channel.id) {
						return false;
					}

					return true;
				});
			} else if (channel.parent_id) {
				const parentChannel = guild.channels.get(channel.parent_id);

				if (parentChannel && channelIds.includes(parentChannel.id)) {
					await client.api.interactions.reply(interaction.id, interaction.token, {
						content: `<#${channel.id}> is already allowed: its category is included already.`,
						flags: MessageFlags.Ephemeral,
					});

					return;
				}
			}
		}
	}

	await setup({ guild_id: interaction.guild_id, message_log_allow_channel_ids: channelIds });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.guild_id),
	);
}

function shouldLogMessage(
	guild: Guild,
	channel: GuildChannel | AnnouncementThread | PublicThread | PrivateThread,
	guildSettingsPacket: Pick<
		GuildSettingsPacket,
		"message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
	>,
) {
	// Get the effective channel.
	const effectiveChannel = isThreadChannel(channel)
		? guild.channels.get(channel.parentId)
		: channel;

	if (!effectiveChannel) {
		return false;
	}

	// Is the channel itself explicitly allowed?
	if (guildSettingsPacket.message_log_allow_channel_ids.includes(channel.id)) {
		return true;
	}

	// Is the channel itself explicitly ignored?
	if (guildSettingsPacket.message_log_ignore_channel_ids.includes(channel.id)) {
		return false;
	}

	// Is the parent channel for threads explicitly allowed?
	if (
		isThreadChannel(channel) &&
		guildSettingsPacket.message_log_allow_channel_ids.includes(effectiveChannel.id)
	) {
		return true;
	}

	// Is the parent channel for threads explicitly ignored?
	if (
		isThreadChannel(channel) &&
		guildSettingsPacket.message_log_ignore_channel_ids.includes(effectiveChannel.id)
	) {
		return false;
	}

	// Check for categories.
	const categoryId = effectiveChannel.parent_id;

	if (categoryId) {
		if (guildSettingsPacket.message_log_allow_channel_ids.includes(categoryId)) {
			return true;
		}

		if (guildSettingsPacket.message_log_ignore_channel_ids.includes(categoryId)) {
			return false;
		}
	}

	// Lastly, is the channel public?
	return isChannelPublic(guild, effectiveChannel);
}

export async function upsert(
	message: GatewayMessageCreateDispatchData,
	guild: Guild,
	guildSettingsPacket: Pick<
		GuildSettingsPacket,
		"message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
	>,
	bypassLogCheck = false,
) {
	const channel = guild.channels.get(message.channel_id) ?? guild.threads.get(message.channel_id);

	if (!channel || (!bypassLogCheck && shouldLogMessage(guild, channel, guildSettingsPacket))) {
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

export async function deleteOldMessages() {
	// Delete messages older than 30 days.
	await pg<MessagesPacket>(Table.Messages)
		.delete()
		.where("created_at", "<", new Date(Date.now() - 2592000000));
}

export async function handleMessageUpdate(
	message: GatewayMessageUpdateDispatchData,
	guild: Guild,
	guildSettingsPacket: Pick<
		GuildSettingsPacket,
		| "guild_id"
		| "message_log_channel_id"
		| "message_log_ignore_channel_ids"
		| "message_log_allow_channel_ids"
	> & { message_log_channel_id: Snowflake },
) {
	const channel = guild.channels.get(message.channel_id);
	const messageLogChannel = guild.channels.get(guildSettingsPacket.message_log_channel_id);

	if (
		!(
			channel &&
			messageLogChannel &&
			shouldLogMessage(guild, channel, guildSettingsPacket) &&
			can({
				permission:
					PermissionFlagsBits.ViewChannel |
					PermissionFlagsBits.SendMessages |
					PermissionFlagsBits.EmbedLinks,
				guild,
				member: await guild.fetchMe(),
				channel: messageLogChannel,
			})
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

		await upsert(message, guild, guildSettingsPacket);
		return;
	}

	if (oldContent === message.content) {
		return;
	}

	await upsert(message, guild, guildSettingsPacket);
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

	await client.api.channels.createMessage(guildSettingsPacket.message_log_channel_id, {
		embeds: [
			{
				author: {
					name: `${userTag(message.author)} (${message.author.id})`,
					icon_url: avatarURL(message.author),
					url: skyProfileWebsiteURL(message.author.id),
				},
				description: description.slice(0, 4000),
				color: DEFAULT_ACCENT_COLOUR,
				fields: [
					{
						name: "",
						value: `[Message link](${messageLink(guild.id, message.channel_id, message.id)})`,
					},
				],
				timestamp: message.edited_timestamp!,
				title: "Message Updated",
			},
		],
	});
}

export async function handleMessageDelete(
	message: GatewayMessageDeleteDispatchData,
	guild: Guild,
	guildSettingsPacket: Pick<
		GuildSettingsPacket,
		"message_log_channel_id" | "message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
	> & { message_log_channel_id: Snowflake },
) {
	const channel = guild.channels.get(message.channel_id);

	if (
		!(
			channel &&
			shouldLogMessage(guild, channel, guildSettingsPacket) &&
			can({
				permission:
					PermissionFlagsBits.ViewChannel |
					PermissionFlagsBits.SendMessages |
					PermissionFlagsBits.EmbedLinks,
				guild,
				member: await guild.fetchMe(),
				channel,
			})
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

	await client.api.channels.createMessage(guildSettingsPacket.message_log_channel_id, {
		embeds: [
			{
				author: {
					name: `${userTag(user)} (${user.id})`,
					icon_url: avatarURL(user),
					url: skyProfileWebsiteURL(user.id),
				},
				description: messagesPacket.content,
				color: DEFAULT_ACCENT_COLOUR,
				fields: [
					{
						name: "",
						value:
							details.length > 1 ? details.map((detail) => `- ${detail}`).join("\n") : details[0],
					},
				],
				timestamp: new Date().toISOString(),
				title: "Message Deleted",
			},
		],
	});
}

export async function handleMessageDeleteBulk(
	data: GatewayMessageDeleteBulkDispatchData,
	guild: Guild,
	guildSettingsPacket: Pick<
		GuildSettingsPacket,
		"message_log_channel_id" | "message_log_ignore_channel_ids" | "message_log_allow_channel_ids"
	> & { message_log_channel_id: Snowflake },
) {
	const channel = guild.channels.get(data.channel_id);
	const messageLogChannel = guild.channels.get(guildSettingsPacket.message_log_channel_id);

	if (
		!(
			channel &&
			messageLogChannel &&
			shouldLogMessage(guild, channel, guildSettingsPacket) &&
			can({
				permission:
					PermissionFlagsBits.ViewChannel |
					PermissionFlagsBits.SendMessages |
					PermissionFlagsBits.EmbedLinks,
				guild,
				member: await guild.fetchMe(),
				channel: messageLogChannel,
			})
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

	await client.api.channels.createMessage(guildSettingsPacket.message_log_channel_id, {
		embeds: [
			{
				description: `${messagesPackets.length} messages attached.`,
				color: DEFAULT_ACCENT_COLOUR,
				timestamp: new Date().toISOString(),
				title: "Message Delete Bulk",
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
