import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIAttachment,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIContainerComponent,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
	type APITextInputComponent,
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
import { hash } from "hasha";
import { t } from "i18next";
import sharp from "sharp";
import { COMMAND_CACHE } from "../caches/commands.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import type { NonNullableInterface } from "../types/index.js";
import { CDN_BUCKET, CDN_URL } from "../utility/configuration.js";
import { ANIMATED_HASH_PREFIX } from "../utility/constants.js";
import { FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import {
	chatInputApplicationCommandMention,
	isAnimatedHash,
	isChatInputCommand,
	notInCachedGuildResponse,
} from "../utility/functions.js";
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

export const WELCOME_ASSET_DELETE_SETTING_CUSTOM_ID =
	"WELCOME_ASSET_DELETE_SETTING_CUSTOM_ID" as const;

export const WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID =
	"WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID" as const;

export const WELCOME_ACCENT_COLOUR_DELETE_SETTING_CUSTOM_ID =
	"WELCOME_ACCENT_COLOUR_DELETE_SETTING_CUSTOM_ID" as const;

export const WELCOME_ACCENT_COLOUR_SETTING_MODAL_CUSTOM_ID =
	"WELCOME_ACCENT_COLOUR_SETTING_MODAL_CUSTOM_ID" as const;

const WELCOME_ACCENT_COLOUR_SETTING_ACCENT_COLOUR_CUSTOM_ID =
	"WELCOME_ACCENT_COLOUR_SETTING_ACCENT_COLOUR_CUSTOM_ID" as const;

const WELCOME_MESSAGE_MAXIMUM_LENGTH = 1000 as const;
const hexadecimalRegularExpression = /^[0-9A-Fa-f]+$/;

interface WelcomePacket {
	guild_id: string;
	welcome_channel_id: string | null;
	hug: boolean | null;
	message: string | null;
	asset: string | null;
	accent_colour: number | null;
}

export type WelcomePacketWithChannel = WelcomePacket &
	NonNullableInterface<Pick<WelcomePacket, "welcome_channel_id">>;

type WelcomePacketSetData = Pick<WelcomePacket, "guild_id"> & Partial<WelcomePacket>;

export async function welcomeSetup(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>
		| APIModalSubmitGuildInteraction,
	userId: Snowflake,
	locale: Locale,
) {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.where({ guild_id: interaction.guild_id })
		.first();

	const components: APIMessageTopLevelComponent[] = [];

	if (welcomePacket) {
		const preview = welcomeComponents(userId, welcomePacket, locale);

		if (preview[0].components.length > 0) {
			components.push(...preview);
		} else {
			components.push({
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("welcome.preview", { lng: locale, ns: "features" }),
					},
				],
			});
		}
	}

	const configureCommandId = COMMAND_CACHE.get(t("configure.command-name", { ns: "commands" }));
	const assetLocaleOptions: Parameters<typeof t>[1] = { lng: locale, ns: "features" };
	let suffix: "mention" | "text";

	if (configureCommandId) {
		suffix = "mention";

		assetLocaleOptions.mention = chatInputApplicationCommandMention(
			configureCommandId,
			t("configure.command-name", { ns: "commands" }),
			t("configure.welcome.command-name", { ns: "commands" }),
		);
	} else {
		suffix = "text";
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("welcome.title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("welcome.description", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.ChannelSelect,
					custom_id: WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
					channel_types: [ChannelType.GuildText],
					placeholder: t("welcome.welcome-channel-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
					min_values: 0,
					max_values: 1,
					default_values: welcomePacket?.welcome_channel_id
						? [{ type: SelectMenuDefaultValueType.Channel, id: welcomePacket.welcome_channel_id }]
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
			content: t("welcome.message-description", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.ActionRow,
			components: welcomePacket?.message
				? [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Primary,
							custom_id: WELCOME_MESSAGE_SETTING_CUSTOM_ID,
							label: t("welcome.message-edit", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Edit,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: WELCOME_MESSAGE_DELETE_SETTING_CUSTOM_ID,
							label: t("welcome.message-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
					]
				: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: WELCOME_MESSAGE_SETTING_CUSTOM_ID,
							label: t("welcome.message-use", { lng: locale, ns: "features" }),
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
			content: t("welcome.hug-description", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				welcomePacket?.hug
					? {
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: `${WELCOME_HUG_SETTING_CUSTOM_ID}§1`,
							label: t("welcome.hug-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						}
					: {
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: `${WELCOME_HUG_SETTING_CUSTOM_ID}§0`,
							label: t("welcome.hug-add", { lng: locale, ns: "features" }),
							emoji: FRIEND_ACTION_EMOJIS.Hug,
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
			content: t("welcome.accent-colour-description", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.ActionRow,
			components: welcomePacket?.accent_colour
				? [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Primary,
							custom_id: WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID,
							label: t("welcome.accent-colour-edit", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Edit,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: WELCOME_ACCENT_COLOUR_DELETE_SETTING_CUSTOM_ID,
							label: t("welcome.accent-colour-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
					]
				: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: WELCOME_ACCENT_COLOUR_SETTING_CUSTOM_ID,
							label: t("welcome.accent-colour-use", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Dye,
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
			content: t(`welcome.asset-description-${suffix}`, assetLocaleOptions),
		},
	];

	if (welcomePacket?.asset) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Danger,
					custom_id: WELCOME_ASSET_DELETE_SETTING_CUSTOM_ID,
					label: t("welcome.asset-remove", { lng: locale, ns: "features" }),
					emoji: MISCELLANEOUS_EMOJIS.Trash,
				},
			],
		});
	}

	components.push({ type: ComponentType.Container, components: containerComponents });

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	}
}

interface WelcomeSetupOptions {
	welcomeChannelId: Snowflake | null;
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ welcomeChannelId }: WelcomeSetupOptions,
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
				content: t("welcome.missing-permissions", { lng: interaction.locale, ns: "features" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		data.welcome_channel_id = welcomeChannelId;
	}

	await pg<WelcomePacket>(Table.Welcome).insert(data).onConflict("guild_id").merge();
	await welcomeSetup(interaction, interaction.member.user.id, guild.preferredLocale);
}

interface WelcomeMessageOptions {
	userId: Snowflake;
	welcomePacket: WelcomePacketWithChannel;
	locale: Locale;
}

export async function sendWelcomeMessage({ userId, welcomePacket, locale }: WelcomeMessageOptions) {
	const components = welcomeComponents(userId, welcomePacket, locale);

	// Could happen if only an accent colour is set.
	if (components[0].components.length === 0) {
		return;
	}

	try {
		await client.api.channels.createMessage(welcomePacket.welcome_channel_id, {
			allowed_mentions: { users: [userId] },
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} catch (error) {
		if (
			error instanceof DiscordAPIError &&
			(error.code === RESTJSONErrorCodes.MissingPermissions ||
				error.code === RESTJSONErrorCodes.InvalidFormBodyOrContentType)
		) {
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
	locale: Locale,
): [APIContainerComponent] {
	const containerComponents: APIComponentInContainer[] = [];

	if (welcomePacket.message) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: welcomePacket.message.replace(/\{\{user\}\}/g, `<@${userId}>`),
		});
	}

	if (welcomePacket.asset) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: [{ media: { url: welcomeAssetURL(welcomePacket.guild_id, welcomePacket.asset) } }],
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
					label: t("welcome.welcome-with-a-hug", { lng: locale, ns: "features" }),
					emoji: FRIEND_ACTION_EMOJIS.Hug,
				},
			],
		});
	}

	const container: APIContainerComponent = {
		type: ComponentType.Container,
		components: containerComponents,
	};

	if (welcomePacket.accent_colour !== null) {
		container.accent_color = welcomePacket.accent_colour;
	}

	return [container];
}

export async function welcomeHandleHugButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	userId: Snowflake,
) {
	if (interaction.member.user.id === userId) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("welcome.hug-self", { lng: interaction.locale, ns: "features" }),
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
			content: t("welcome.hug-disabled", { lng: interaction.locale, ns: "features" }),
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

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeHandleMessageSettingButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;

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
						label: t("welcome.message-modal-text-input-label", { lng: locale, ns: "features" }),
						placeholder: t("welcome.message-modal-text-input-placeholder", {
							lng: locale,
							ns: "features",
						}),
						max_length: WELCOME_MESSAGE_MAXIMUM_LENGTH,
						style: TextInputStyle.Paragraph,
						value: welcomePacket?.message ?? "",
						required: true,
					},
				],
			},
		],
		custom_id: WELCOME_MESSAGE_SETTING_MODAL_CUSTOM_ID,
		title: t("welcome.message-modal-title", { lng: locale, ns: "features" }),
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

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeHandleMessageSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, message: null })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeHandleAssetSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("asset")
		.where({ guild_id: interaction.guild_id })
		.first();

	if (welcomePacket?.asset) {
		await S3Client.send(
			new DeleteObjectCommand({
				Bucket: CDN_BUCKET,
				Key: welcomeAssetRoute(interaction.guild_id, welcomePacket.asset),
			}),
		);
	}

	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, asset: null })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeHandleAccentColourSettingButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;

	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("accent_colour")
		.where({ guild_id: interaction.guild_id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: WELCOME_ACCENT_COLOUR_SETTING_ACCENT_COLOUR_CUSTOM_ID,
		label: t("welcome.accent-colour-modal-text-input-label", { lng: locale, ns: "features" }),
		placeholder: "#123456",
		max_length: 7,
		min_length: 7,
		style: TextInputStyle.Short,
		required: true,
	};

	if (typeof welcomePacket?.accent_colour === "number") {
		textInput.value = `#${welcomePacket.accent_colour.toString(16).padStart(6, "0")}`;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [{ type: ComponentType.ActionRow, components: [textInput] }],
		custom_id: WELCOME_ACCENT_COLOUR_SETTING_MODAL_CUSTOM_ID,
		title: t("welcome.accent-colour-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function welcomeHandleAccentColourSettingModal(
	interaction: APIModalSubmitGuildInteraction,
) {
	const components = new ModalResolver(interaction.data.components);

	const accentColour = components.getTextInputValue(
		WELCOME_ACCENT_COLOUR_SETTING_ACCENT_COLOUR_CUSTOM_ID,
	);

	const hexadecimalString = accentColour.slice(1);

	if (accentColour[0] !== "#" || !hexadecimalRegularExpression.test(hexadecimalString)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("welcome.accent-colour-invalid", { lng: interaction.locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			accent_colour: Number.parseInt(hexadecimalString, 16),
		})
		.onConflict("guild_id")
		.merge();

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeHandleAccentColourSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, accent_colour: null })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup(interaction, interaction.member.user.id, interaction.guild_locale!);
}

export async function welcomeSetAsset(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	attachment: APIAttachment,
) {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.where({ guild_id: interaction.guild_id })
		.first();

	// Delete the old asset if it exists.
	if (welcomePacket?.asset) {
		await S3Client.send(
			new DeleteObjectCommand({
				Bucket: CDN_BUCKET,
				Key: welcomeAssetRoute(interaction.guild_id, welcomePacket.asset),
			}),
		);
	}

	const gif = attachment.content_type === "image/gif";

	const assetBuffer = sharp(await (await fetch(attachment.url)).arrayBuffer(), {
		animated: true,
	});

	let buffer: Buffer;

	if (gif) {
		buffer = await assetBuffer.gif().toBuffer();
	} else {
		buffer = await assetBuffer.webp().toBuffer();
	}

	let hashedBuffer = await hash(buffer, { algorithm: "md5" });

	if (gif) {
		hashedBuffer = `${ANIMATED_HASH_PREFIX}${hashedBuffer}`;
	}

	await S3Client.send(
		new PutObjectCommand({
			Bucket: CDN_BUCKET,
			Key: welcomeAssetRoute(interaction.guild_id, hashedBuffer),
			Body: buffer,
		}),
	);

	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			asset: hashedBuffer,
		})
		.onConflict("guild_id")
		.merge();
}

function welcomeAssetRoute<GuildId extends Snowflake, Hash extends string>(
	guildId: GuildId,
	hash: Hash,
): `welcome/asset/${GuildId}/${Hash}.gif` | `welcome/asset/${GuildId}/${Hash}.webp` {
	return `welcome/asset/${guildId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

function welcomeAssetURL<GuildId extends Snowflake, Asset extends string>(
	guildId: GuildId,
	asset: Asset,
): `${typeof CDN_URL}/${`welcome/asset/${GuildId}/${Asset}.gif` | `welcome/asset/${GuildId}/${Asset}.webp`}` {
	return `${CDN_URL}/${welcomeAssetRoute(guildId, asset)}`;
}
