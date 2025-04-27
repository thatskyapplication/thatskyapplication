import {
	type APIGuildForumChannel,
	type APIGuildInteractionWrapper,
	type APIGuildMember,
	type APIInteractionResponseCallbackData,
	type APIMessageApplicationCommandGuildInteraction,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	ApplicationCommandType,
	ButtonStyle,
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
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	REPORT_CHANNEL_TYPE,
	REPORT_MAXIMUM_REASON_LENGTH,
	REPORT_MESSAGE_COLOUR,
	REPORT_MESSAGE_MAXIMUM_LENGTH,
	REPORT_MINIMUM_REASON_LENGTH,
} from "../utility/constants.js";
import { avatarURL, messageLink, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import { CustomId, schemaStore } from "../utility/string-store.js";
import type { GuildSettingsPacket } from "./guild-settings.js";

export function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
	me: APIGuildMember,
	returnErrors: true,
): string[];

export function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
	me: APIGuildMember,
	returnErrors?: false,
): boolean;

export function isReportCreatableAndSendable(
	guild: Guild,
	channel: APIGuildForumChannel,
	me: APIGuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.communication_disabled_until && Date.parse(me.communication_disabled_until) > Date.now()) {
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
	guildId: Snowflake;
	channelId: Snowflake | null;
}

export async function setup({ guildId, channelId }: ReportSetupOptions) {
	let reportCommandId: Snowflake | null;

	if (channelId) {
		reportCommandId = (
			await client.api.applicationCommands.createGuildCommand(APPLICATION_ID, guildId, {
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
				APPLICATION_ID,
				guildId,
				guildSettingsPacket.report_command_id,
			);
		}

		reportCommandId = null;
	}

	await pg<GuildSettingsPacket>(Table.GuildSettings)
		.insert({ guild_id: guildId, report_channel_id: channelId, report_command_id: reportCommandId })
		.onConflict("guild_id")
		.merge();
}

export async function setupResponse(
	guildId: Snowflake,
): Promise<APIInteractionResponseCallbackData> {
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("report_channel_id")
		.where({ guild_id: guildId })
		.first();

	return {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content:
							'Choose a forum channel for reports to go in.\n\nWith a report channel, this server will have a "Report" message context command deployed and users will be able to report messages.',
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: schemaStore.serialize(CustomId.ReportChannel, {}).toString(),
								channel_types: [REPORT_CHANNEL_TYPE],
								default_values: guildSettingsPacket?.report_channel_id
									? [
											{
												id: guildSettingsPacket.report_channel_id,
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
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
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

	await setup({ guildId: interaction.guild_id, channelId: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.guild_id),
	);
}

export async function reportModalResponse(
	interaction: APIMessageApplicationCommandGuildInteraction,
	guild: Guild,
) {
	const guildSettingsPacket = await pg<GuildSettingsPacket>(Table.GuildSettings)
		.select("report_channel_id")
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
			APPLICATION_ID,
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

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		title: "Report",
		custom_id: schemaStore
			.serialize(CustomId.ReportModalResponse, {
				commandId: interaction.data.id,
				username: message.author.username,
				userId: message.author.id,
				messageId: message.id,
			})
			.toString(),
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: schemaStore.serialize(CustomId.ReportModalResponseText, {}).toString(),
						label: "Reason",
						style: TextInputStyle.Paragraph,
						min_length: REPORT_MINIMUM_REASON_LENGTH,
						max_length: REPORT_MAXIMUM_REASON_LENGTH,
						placeholder: "Please provide a reason for the report.",
						required: true,
					},
				],
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
	{ username, commandId, userId, messageId }: ReportConfirmationOptions,
) {
	const components = new ModalResolver(interaction.data.components);

	const reason = components.getTextInputValue(
		schemaStore.serialize(CustomId.ReportModalResponseText, {}),
	);

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
				color: DEFAULT_EMBED_COLOUR,
				description: reason,
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
		.select("report_channel_id")
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

		await client.api.applicationCommands.deleteGuildCommand(APPLICATION_ID, guild.id, commandId);

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

	const reportChannelId = interaction.channel!.id;

	// Fetch messages around the message id for context.
	const messages = (
		await client.api.channels.getMessages(reportChannelId, {
			limit: 100,
			around: messageId,
		})
	).reverse();

	const reportedMessage = messages.find((message) => message.id === messageId);
	let reportedMessageContent = reportedMessage?.content;

	if (reportedMessageContent) {
		if (reportedMessageContent.length > REPORT_MESSAGE_MAXIMUM_LENGTH) {
			reportedMessageContent = `${reportedMessageContent.slice(0, REPORT_MESSAGE_MAXIMUM_LENGTH)}...`;
		}
	} else {
		reportedMessageContent = "_No content_";
	}

	const reportedUser = reportedMessage?.author ?? (await client.api.users.get(userId));

	await client.api.channels.createForumThread(channel.id, {
		message: {
			allowed_mentions: { parse: [] },
			embeds: [
				{
					author: {
						name: `${userTag(interaction.member.user)} (${interaction.member.user.id})`,
						icon_url: avatarURL(interaction.member.user),
					},
					color: DEFAULT_EMBED_COLOUR,
					description: reason,
				},
				{
					author: {
						name: `${userTag(reportedUser)} (${userId})`,
						icon_url: avatarURL(reportedUser),
					},
					color: REPORT_MESSAGE_COLOUR,
					description: reportedMessageContent,
					timestamp: new Date(DiscordSnowflake.timestampFrom(messageId)).toISOString(),
				},
			],
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							label: "View message",
							style: ButtonStyle.Link,
							url: messageLink(guild.id, reportChannelId, messageId),
						},
					],
				},
			],
			files: [
				{
					data: messages
						.map((message) => {
							const createdAt = new Date(DiscordSnowflake.timestampFrom(message.id)).toISOString();
							return `[${createdAt}] ${userTag(message.author)} (${message.author.id}): ${message.content}`;
						})
						.join("\n"),
					name: "messages.txt",
				},
			],
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
