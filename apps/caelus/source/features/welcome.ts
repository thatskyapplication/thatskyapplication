import {
	type APIComponentInContainer,
	type APIContainerComponent,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	SelectMenuDefaultValueType,
	SeparatorSpacingSize,
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { Table } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import type { NonNullableInterface } from "../types/index.js";
import { FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { notInCachedGuildResponse } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";
import { friendshipActionComponents } from "./friendship-actions.js";

export const WELCOME_WELCOME_CHANNEL_CUSTOM_ID = "WELCOME_WELCOME_CHANNEL_CUSTOM_ID" as const;
export const WELCOME_HUG_SETTING_CUSTOM_ID = "WELCOME_HUG_SETTING_CUSTOM_ID" as const;
export const WELCOME_MESSAGE_SETTING_CUSTOM_ID = "WELCOME_MESSAGE_SETTING_CUSTOM_ID" as const;

export const WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID =
	"WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID" as const;

export const WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID =
	"WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID" as const;

const WELCOME_MESSAGE_SETTING_MESSAGE_CUSTOM_ID =
	"WELCOME_MESSAGE_SETTING_MESSAGE_CUSTOM_ID" as const;

export const WELCOME_HUG_CUSTOM_ID = "WELCOME_HUG_CUSTOM_ID" as const;

const WELCOME_MESSAGE_MAXIMUM_LENGTH = 1000 as const;

export interface WelcomePacket {
	guild_id: string;
	welcome_channel_id: string | null;
	hug: boolean | null;
	message: string | null;
}

export type WelcomePacketWithChannel = WelcomePacket &
	NonNullableInterface<Pick<WelcomePacket, "welcome_channel_id">>;

type WelcomePacketSetData = Pick<WelcomePacket, "guild_id"> & Partial<WelcomePacket>;

export async function setupResponse(
	userId: Snowflake,
	guildId: Snowflake,
): Promise<APIInteractionResponseCallbackData> {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome).where({ guild_id: guildId }).first();
	const components: APIMessageTopLevelComponent[] = [];

	if (welcomePacket) {
		const preview = welcomeComponents(userId, welcomePacket);

		if (preview[0].components.length > 0) {
			components.push(...preview);
		} else {
			components.push({
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "This is the preview area for your welcome message. It is currently empty.",
					},
				],
			});
		}
	}

	components.push({
		type: ComponentType.Container,
		components: [
			{
				type: ComponentType.TextDisplay,
				content: "## Welcome setup",
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content: "You can set up messages for whenever someone joins your server.",
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.ChannelSelect,
						custom_id: WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
						channel_types: [ChannelType.GuildText],
						placeholder: "Select a welcome channel.",
						min_values: 0,
						max_values: 1,
						default_values: welcomePacket?.welcome_channel_id
							? [
									{
										type: SelectMenuDefaultValueType.Channel,
										id: welcomePacket.welcome_channel_id,
									},
								]
							: [],
					},
				],
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content:
					"You can choose to display a message! To mention the user who joined, type `{{user}}`.",
			},
			{
				type: ComponentType.ActionRow,
				components: welcomePacket?.message
					? [
							{
								type: ComponentType.Button,
								style: ButtonStyle.Danger,
								custom_id: WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID,
								label: "Remove the message?",
								emoji: MISCELLANEOUS_EMOJIS.Trash,
							},
							{
								type: ComponentType.Button,
								style: ButtonStyle.Primary,
								custom_id: WELCOME_MESSAGE_SETTING_CUSTOM_ID,
								label: "Edit the message?",
								emoji: MISCELLANEOUS_EMOJIS.Edit,
							},
						]
					: [
							{
								type: ComponentType.Button,
								style: ButtonStyle.Success,
								custom_id: WELCOME_MESSAGE_SETTING_CUSTOM_ID,
								label: "Use a message?",
								emoji: { name: "📝" },
							},
						],
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content:
					"You can show a cute hug button on the message for others to use to welcome the joined Sky kid!",
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: welcomePacket?.hug ? ButtonStyle.Danger : ButtonStyle.Success,
						custom_id: `${WELCOME_HUG_SETTING_CUSTOM_ID}§${Number(welcomePacket?.hug ?? false)}`,
						label: welcomePacket?.hug
							? "Disable showing the hug button?"
							: "Enable showing the hug button?",
						emoji: FRIEND_ACTION_EMOJIS.Hug,
					},
				],
			},
		],
	});

	return { components, flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 };
}

interface WelcomeByeSetupOptions {
	welcomeChannelId: Snowflake | null;
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ welcomeChannelId }: WelcomeByeSetupOptions,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	const me = await guild.fetchMe();
	const data: WelcomePacketSetData = { guild_id: interaction.guild_id };

	if (welcomeChannelId !== undefined) {
		const channel = welcomeChannelId ? guild.channels.get(welcomeChannelId) : null;

		if (
			channel &&
			!can({
				permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
				guild,
				member: me,
				channel,
			})
		) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "`View Channel` & `Send Messages` are required.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		data.welcome_channel_id = welcomeChannelId;
	}

	await pg<WelcomePacket>(Table.Welcome).insert(data).onConflict("guild_id").merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.member.user.id, guild.id),
	);
}

interface WelcomeMessageOptions {
	userId: Snowflake;
	welcomePacket: WelcomePacketWithChannel;
}

export async function sendWelcomeMessage({ userId, welcomePacket }: WelcomeMessageOptions) {
	try {
		await client.api.channels.createMessage(welcomePacket.welcome_channel_id, {
			allowed_mentions: { users: [userId] },
			components: welcomeComponents(
				userId,
				(await pg<WelcomePacket>(Table.Welcome)
					.where({ guild_id: welcomePacket.guild_id })
					.first())!,
			),
			flags: MessageFlags.IsComponentsV2,
		});
	} catch (error) {
		if (error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.MissingPermissions) {
			pino.warn(error, "Missing permissions to send welcome message. Removing configuration.");

			await pg<WelcomePacket>(Table.Welcome)
				.update({ welcome_channel_id: null })
				.where({ welcome_channel_id: welcomePacket.welcome_channel_id });

			return;
		}

		pino.error(error, "Failed to send welcome message.");
	}
}

function welcomeComponents(
	userId: Snowflake,
	welcomePacket: WelcomePacket,
): [APIContainerComponent] {
	const containerComponents: APIComponentInContainer[] = [];

	if (welcomePacket.message) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: welcomePacket.message.replace(/\{\{user\}\}/g, `<@${userId}>`),
		});
	}

	if (welcomePacket.hug) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${WELCOME_HUG_CUSTOM_ID}§${userId}`,
					label: "Welcome with a hug!",
					emoji: FRIEND_ACTION_EMOJIS.Hug,
				},
			],
		});
	}

	return [{ type: ComponentType.Container, components: containerComponents }];
}

export async function welcomeHandleHugButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	userId: Snowflake,
) {
	if (interaction.member.user.id === userId) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This is you! Why not hug the others?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("welcome_channel_id")
		.where({ guild_id: interaction.guild_id })
		.first();

	const channelId = welcomePacket?.welcome_channel_id;

	if (!channelId) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This server has disabled hugging.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	try {
		const user = await client.api.users.get(userId);

		await client.api.channels.createMessage(channelId, {
			allowed_mentions: { users: [user.id] },
			components: friendshipActionComponents({
				invoker: interaction.member.user,
				user,
				key: "hug",
				locale: interaction.guild_locale ?? Locale.EnglishGB,
			}),
			flags: MessageFlags.IsComponentsV2,
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {});
	} catch (error) {
		if (error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.MissingPermissions) {
			pino.warn(error, "Missing permissions to send welcome hug. Removing configuration.");

			await pg<WelcomePacket>(Table.Welcome)
				.update({ welcome_channel_id: null })
				.where({ welcome_channel_id: channelId });

			return;
		}

		pino.error(error, "Failed to send welcome hug.");
	}
}

export async function welcomeHandleHugSettingButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	customId: string,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			hug: !Number(customId.slice(customId.indexOf("§") + 1)),
		})
		.onConflict("guild_id")
		.merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.member.user.id, interaction.guild_id),
	);
}

export async function welcomeHandleMessageSettingButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("message")
		.where({ guild_id: interaction.guild_id })
		.first();

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: WELCOME_MESSAGE_SETTING_MESSAGE_CUSTOM_ID,
						label: "Enter your welcome message.",
						placeholder: "Welcome to the server, {{user}}!",
						max_length: WELCOME_MESSAGE_MAXIMUM_LENGTH,
						style: TextInputStyle.Paragraph,
						value: welcomePacket?.message ?? "",
						required: true,
					},
				],
			},
		],
		custom_id: WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID,
		title: "Welcome message",
	});
}

export async function welcomeHandleMessageSettingModal(
	interaction: APIModalSubmitGuildInteraction,
) {
	const components = new ModalResolver(interaction.data.components);

	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			message: components.getTextInputValue(WELCOME_MESSAGE_SETTING_MESSAGE_CUSTOM_ID),
		})
		.onConflict("guild_id")
		.merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.member.user.id, interaction.guild_id),
	);
}

export async function welcomeHandleMessageSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			message: null,
		})
		.onConflict("guild_id")
		.merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(interaction.member.user.id, interaction.guild_id),
	);
}
