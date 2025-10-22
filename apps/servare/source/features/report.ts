import {
	type APIComponentInContainer,
	type APIGuildForumChannel,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageApplicationCommandGuildInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	ApplicationCommandType,
	ButtonStyle,
	ChannelType,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	SelectMenuDefaultValueType,
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_ACCENT_COLOUR,
	REPORT_CHANNEL_TYPE,
	REPORT_MAXIMUM_REASON_LENGTH,
	REPORT_MESSAGE_COLOUR,
	REPORT_MESSAGE_MAXIMUM_LENGTH,
	REPORT_MINIMUM_REASON_LENGTH,
} from "../utility/constants.js";
import { avatarURL, isThreadChannel, messageLink, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import { CustomId, schemaStore } from "../utility/string-store.js";
import type { GuildSettingsPacket, GuildSettingsSetupReportOptions } from "./guild-settings.js";
import { type MessagesPacket, upsert } from "./message-log.js";

function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
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
		errors.push(`\`View Channel\` & \`Create Posts\` are required for <#${channel.id}>.`);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

interface ReportSetupOptions {
	applicationId: Snowflake;
	guildId: Snowflake;
	channelId?: Snowflake | null;
	tagId?: Snowflake | null;
}

async function setup({ applicationId, guildId, channelId, tagId }: ReportSetupOptions) {
	let reportCommandId: Snowflake | null | undefined;
	let reportTagId = tagId;

	if (channelId !== undefined) {
		reportTagId = null;

		if (channelId) {
			reportCommandId = (
				await client.api.applicationCommands.createGuildCommand(applicationId, guildId, {
					name: "Report",
					type: ApplicationCommandType.Message,
				})
			).id;
		} else {
			const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
				.select("report_command_id")
				.where({ guild_id: guildId })
				.first();

			if (guildSettingsPacket?.report_command_id) {
				await client.api.applicationCommands.deleteGuildCommand(
					applicationId,
					guildId,
					guildSettingsPacket.report_command_id,
				);

				reportCommandId = null;
			}
		}
	}

	const payload: GuildSettingsSetupReportOptions = { guild_id: guildId };

	if (channelId !== undefined) {
		payload.report_channel_id = channelId;
	}

	if (reportCommandId !== undefined) {
		payload.report_command_id = reportCommandId;
	}

	if (reportTagId !== undefined) {
		payload.report_tag_id = reportTagId;
	}

	await pg<GuildSettingsPacket>(Table.GuildSettings).insert(payload).onConflict("guild_id").merge();
}

export async function setupResponse(guild: Guild): Promise<APIInteractionResponseCallbackData> {
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("report_channel_id", "report_tag_id")
		.where({ guild_id: guild.id })
		.first();

	const reportChannelId = guildSettingsPacket?.report_channel_id;
	const reportChannel = reportChannelId && guild.channels.get(reportChannelId);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content:
				'Choose a forum channel for reports to go in.\n\nWith a report channel, this server will have a "Report" message context menu command deployed and users will be able to report messages.\n\nYou may also choose a forum tag to be applied to reports.',
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.ChannelSelect,
					custom_id: schemaStore.serialize(CustomId.ReportChannel, {}),
					channel_types: [REPORT_CHANNEL_TYPE],
					default_values: reportChannelId
						? [
								{
									id: reportChannelId,
									type: SelectMenuDefaultValueType.Channel,
								},
							]
						: [],
					max_values: 1,
					min_values: 0,
					placeholder: "Select a channel to use for reports.",
				},
			],
		},
	];

	const reportChannelTagOptions =
		reportChannel && reportChannel.type === ChannelType.GuildForum
			? reportChannel.available_tags.map((availableTag) => ({
					default: availableTag.id === guildSettingsPacket?.report_tag_id,
					label: availableTag.name,
					value: availableTag.id,
				}))
			: [];

	if (reportChannelTagOptions.length > 0) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: schemaStore.serialize(CustomId.ReportTag, {}),
					options: reportChannelTagOptions,
					max_values: 1,
					min_values: 0,
					placeholder: "This tag will be applied to reports.",
				},
			],
		});
	}

	return {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_ACCENT_COLOUR,
				components: containerComponents,
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

export async function handleStringSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	const [tagId] = interaction.data.values;
	await setup({
		applicationId: interaction.application_id,
		guildId: guild.id,
		tagId: tagId ?? null,
	});

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	guild: Guild,
) {
	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (channel?.type !== REPORT_CHANNEL_TYPE) {
			pino.error(
				interaction,
				"Received an unknown channel type whilst setting up the report channel.",
			);

			throw new Error("Received an unknown channel type whilst setting up the report channel.");
		}

		const reportCreatableAndSendable = isReportCreatableAndSendable(
			guild,
			channel,
			await guild.fetchMe(),
			true,
		);

		if (reportCreatableAndSendable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: reportCreatableAndSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({
		applicationId: interaction.application_id,
		guildId: interaction.guild_id,
		channelId: channelId ?? null,
	});

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

export async function reportModalResponse(
	interaction: APIMessageApplicationCommandGuildInteraction,
	guild: Guild,
) {
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("message_log_ignore_channel_ids", "message_log_allow_channel_ids", "report_channel_id")
		.where({ guild_id: guild.id })
		.first();

	if (!guildSettingsPacket) {
		// This should not happen.
		throw new Error("Attempted to respond with a report modal without a guild settings packet.");
	}

	if (!guildSettingsPacket.report_channel_id) {
		// There should not happen. Remove the command.
		pino.error(
			{ guild },
			"Attempted to respond with a report modal without a report channel. Removing command.",
		);

		await client.api.applicationCommands.deleteGuildCommand(
			interaction.application_id,
			guild.id,
			interaction.data.id,
		);

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This server does not have the report feature set up.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const message = new OptionResolver(interaction).getTargetMessage();

	// Insert the message into the database in case of missing permissions to fetch the message later.
	await upsert(message, guild, guildSettingsPacket, true);

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		title: "Report",
		custom_id: schemaStore.serialize(CustomId.ReportModalResponse, {
			commandId: interaction.data.id,
			username: message.author.username,
			userId: message.author.id,
			messageId: message.id,
		}),
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: schemaStore.serialize(CustomId.ReportModalResponseText, {}),
					style: TextInputStyle.Paragraph,
					min_length: REPORT_MINIMUM_REASON_LENGTH,
					max_length: REPORT_MAXIMUM_REASON_LENGTH,
					placeholder: "Please provide a reason for the report.",
					required: true,
				},
				label: "Reason",
				description: "What is the reason for this report?",
			},
		],
	});
}

interface ReportConfirmationOptions {
	username: string;
	commandId: string;
	userId: string;
	messageId: string;
}

export async function confirmation(
	interaction: APIGuildInteractionWrapper<APIModalSubmitInteraction>,
	guild: Guild,
	{ username, commandId, userId, messageId }: ReportConfirmationOptions,
) {
	const components = new ModalResolver(interaction.data.components);

	const reason = components.getTextInputValue(
		schemaStore.serialize(CustomId.ReportModalResponseText, {}),
	);

	const channel =
		guild.channels.get(interaction.channel!.id) ?? guild.threads.get(interaction.channel!.id);

	if (!channel) {
		throw new Error("Failed to find a channel to create a report from.");
	}

	const effectiveChannel = isThreadChannel(channel)
		? guild.channels.get(channel.parentId)
		: channel;

	if (!effectiveChannel) {
		throw new Error("Failed to find a channel to create a report from.");
	}

	const promises = [
		client.api.users.get(userId),
		can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.ReadMessageHistory,
			guild,
			member: await guild.fetchMe(),
			channel: effectiveChannel,
		})
			? client.api.channels.getMessage(interaction.channel!.id, messageId)
			: null,
	] as const;

	const settled = await Promise.allSettled(promises);
	const reportedUser = settled[0].status === "fulfilled" ? settled[0].value : null;

	if (!reportedUser) {
		throw new Error("Failed to fetch the reported user.");
	}

	let reportedMessageContent: string;

	if (settled[1].status === "fulfilled") {
		const { value } = settled[1];

		if (value === null) {
			const databaseMessage = await pg<MessagesPacket>(Table.Messages)
				.select("content")
				.where({ message_id: messageId })
				.first();

			reportedMessageContent = databaseMessage?.content ?? "_Unknown_";
		} else {
			reportedMessageContent = value.content;
		}
	} else {
		const databaseMessage = await pg<MessagesPacket>(Table.Messages)
			.select("content")
			.where({ message_id: messageId })
			.first();

		reportedMessageContent = databaseMessage?.content ?? "_Unknown_";
	}

	if (reportedMessageContent.length > REPORT_MESSAGE_MAXIMUM_LENGTH) {
		reportedMessageContent = `${reportedMessageContent.slice(0, REPORT_MESSAGE_MAXIMUM_LENGTH)}...`;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						label: "Confirm",
						style: ButtonStyle.Primary,
						custom_id: schemaStore.serialize(CustomId.ReportModalConfirmationConfirm, {
							username,
							commandId,
							userId,
							messageId,
						}),
					},
					{
						type: ComponentType.Button,
						label: "Cancel",
						style: ButtonStyle.Secondary,
						custom_id: schemaStore.serialize(CustomId.ReportModalConfirmationCancel, {}),
					},
				],
			},
		],
		content: "Is this okay?",
		embeds: [
			{
				author: {
					name: `${userTag(interaction.member.user)} (${interaction.member.user.id})`,
					icon_url: avatarURL(interaction.member.user),
				},
				color: DEFAULT_ACCENT_COLOUR,
				description: reason,
			},
			{
				author: { name: `${userTag(reportedUser)} (${userId})`, icon_url: avatarURL(reportedUser) },
				color: REPORT_MESSAGE_COLOUR,
				description: reportedMessageContent,
				timestamp: new Date(DiscordSnowflake.timestampFrom(messageId)).toISOString(),
			},
		],
		flags: MessageFlags.Ephemeral,
	});
}

export async function cancel(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [],
		content: "Report cancelled.",
		embeds: [],
	});
}

interface ReportCreateOptions {
	username: string;
	commandId: string;
	userId: string;
	messageId: string;
}

export async function create(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	{ username, commandId, userId, messageId }: ReportCreateOptions,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.error(interaction, "Failed to find a guild to create a report in.");
		return;
	}

	// Get the report channel.
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("report_channel_id", "report_tag_id")
		.where({ guild_id: guild.id })
		.first();

	if (!guildSettingsPacket) {
		// This should not happen.
		throw new Error("Attempted to create a report without a guild settings packet.");
	}

	if (!guildSettingsPacket.report_channel_id) {
		// There should not happen. Remove the command.
		pino.error(
			interaction,
			"Attempted to create a report without a report channel. Removing command.",
		);

		await client.api.applicationCommands.deleteGuildCommand(
			interaction.application_id,
			guild.id,
			commandId,
		);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "This server does not have the report feature set up.",
		});

		return;
	}

	const channel = guild.channels.get(guildSettingsPacket.report_channel_id);

	if (channel?.type !== REPORT_CHANNEL_TYPE) {
		pino.error({ guild, commandId }, "Failed to find the report channel.");
		return;
	}

	if (!isReportCreatableAndSendable(guild, channel, await guild.fetchMe())) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "Failed to create a report. Try to approach the moderators directly.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const reason = interaction.message.embeds[0]?.description;

	if (!reason) {
		pino.error(interaction, "Failed to find a reason for the report.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "Failed to create a report. Try to approach the moderators directly.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const reportedChannel =
		guild.channels.get(interaction.channel!.id) ?? guild.threads.get(interaction.channel!.id);

	if (!reportedChannel) {
		pino.error(interaction, "Failed to find the channel the report came from.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "Failed to create a report. Try to approach the moderators directly.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const effectiveReportedChannel = isThreadChannel(reportedChannel)
		? guild.channels.get(reportedChannel.parentId)
		: reportedChannel;

	if (!effectiveReportedChannel) {
		pino.error(interaction, "Failed to find the channel the report came from.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "Failed to create a report. Try to approach the moderators directly.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const files = [];

	if (
		can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.ReadMessageHistory,
			guild,
			member: await guild.fetchMe(),
			channel: effectiveReportedChannel,
		})
	) {
		// Fetch messages around the message id for context.
		files.push({
			data: (
				await client.api.channels.getMessages(reportedChannel.id, {
					limit: 100,
					around: messageId,
				})
			)
				.reduceRight<string[]>((content, message) => {
					const createdAt = new Date(DiscordSnowflake.timestampFrom(message.id)).toISOString();

					content.push(
						`[${createdAt}] ${userTag(message.author)} (${message.author.id}): ${message.content}`,
					);

					return content;
				}, [])
				.join("\n"),
			name: "messages.txt",
		});
	}

	await client.api.channels.createForumThread(channel.id, {
		applied_tags: guildSettingsPacket.report_tag_id ? [guildSettingsPacket.report_tag_id] : [],
		message: {
			allowed_mentions: { parse: [] },
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							label: "View message",
							style: ButtonStyle.Link,
							url: messageLink(guild.id, reportedChannel.id, messageId),
						},
					],
				},
			],
			content: files.length > 0 ? "" : "⚠️ Missing permissions to fetch surrounding messages.",
			embeds: interaction.message.embeds,
			files,
		},
		name: `Report for ${username} (${userId})`,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [],
		content: "Message reported. Thank you for keeping the server safe!",
		embeds: [],
		flags: MessageFlags.Ephemeral,
	});
}
