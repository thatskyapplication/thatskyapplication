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
	MessageReferenceType,
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
import { APPLICATION_ID, CDN_BUCKET, CDN_URL } from "../utility/configuration.js";
import { ANIMATED_HASH_PREFIX } from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
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

const WELCOME_MESSAGE_MAXIMUM_LENGTH = 1000 as const;
const hexadecimalRegularExpression = /^[0-9A-Fa-f]+$/;

const WELCOME_CHANNEL_PERMISSIONS =
	PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages;

const WELCOME_MESSAGE_HUG_PERMISSIONS =
	PermissionFlagsBits.ViewChannel |
	PermissionFlagsBits.SendMessages |
	PermissionFlagsBits.ReadMessageHistory;

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

interface WelcomeSetupOptions {
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>
		| APIModalSubmitGuildInteraction;
	userId: Snowflake;
	locale: Locale;
	deferred?: boolean;
}

export async function welcomeSetup({ interaction, userId, locale, deferred }: WelcomeSetupOptions) {
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

	let channelDescription = t("welcome.channel-description", { lng: locale, ns: "features" });
	let hugDescription = t("welcome.hug-description", { lng: locale, ns: "features" });

	if (welcomePacket?.welcome_channel_id) {
		const guild = GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			throw new Error("Could not find the guild to set up a welcome message.");
		}

		const channel =
			welcomePacket?.welcome_channel_id && guild.channels.get(welcomePacket?.welcome_channel_id);

		if (channel) {
			if (
				!can({
					permission: WELCOME_CHANNEL_PERMISSIONS,
					guild,
					member: await guild.fetchMe(),
					channel,
				})
			) {
				channelDescription += `\n\n⚠️ ${t("welcome.channel-description-missing-permissions", {
					lng: locale,
					ns: "features",
				})}`;
			}

			if (
				!can({
					permission: WELCOME_MESSAGE_HUG_PERMISSIONS,
					guild,
					member: await guild.fetchMe(),
					channel,
				})
			) {
				hugDescription += `\n\n⚠️ ${t("welcome.hug-description-missing-permissions", {
					lng: locale,
					ns: "features",
					channel: `<#${channel.id}>`,
				})}`;
			}
		}
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
			content: channelDescription,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.ChannelSelect,
					custom_id: CustomId.WelcomeChannel,
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
							custom_id: CustomId.WelcomeMessage,
							label: t("welcome.message-edit", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Edit,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: CustomId.WelcomeMessageDelete,
							label: t("welcome.message-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
					]
				: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: CustomId.WelcomeMessage,
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
			content: hugDescription,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				welcomePacket?.hug
					? {
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: `${CustomId.WelcomeHugEdit}§1`,
							label: t("welcome.hug-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						}
					: {
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: `${CustomId.WelcomeHugEdit}§0`,
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
							custom_id: CustomId.WelcomeAccentColour,
							label: t("welcome.accent-colour-edit", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Edit,
						},
						{
							type: ComponentType.Button,
							style: ButtonStyle.Danger,
							custom_id: CustomId.WelcomeAccentColourDelete,
							label: t("welcome.accent-colour-remove", { lng: locale, ns: "features" }),
							emoji: MISCELLANEOUS_EMOJIS.Trash,
						},
					]
				: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: CustomId.WelcomeAccentColour,
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
					custom_id: CustomId.WelcomeAssetDelete,
					label: t("welcome.asset-remove", { lng: locale, ns: "features" }),
					emoji: MISCELLANEOUS_EMOJIS.Trash,
				},
			],
		});
	}

	components.push({ type: ComponentType.Container, components: containerComponents });

	const responseOptions = {
		components,
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	await (isChatInputCommand(interaction)
		? deferred
			? client.api.interactions.editReply(APPLICATION_ID, interaction.token, responseOptions)
			: client.api.interactions.reply(interaction.id, interaction.token, responseOptions)
		: client.api.interactions.updateMessage(interaction.id, interaction.token, responseOptions));
}

interface WelcomeSetupChannelOptions {
	welcomeChannelId: Snowflake | null;
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ welcomeChannelId }: WelcomeSetupChannelOptions,
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

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: guild.preferredLocale,
	});
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

	const guild = GUILD_CACHE.get(welcomePacket.guild_id);

	if (!guild) {
		pino.error(
			new Error("Could not find the guild of a welcome message."),
			"Failed to send welcome message.",
		);

		return;
	}

	const channel = guild.channels.get(welcomePacket.welcome_channel_id);

	if (!channel) {
		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: WELCOME_CHANNEL_PERMISSIONS,
			guild,
			member: me,
			channel,
		})
	) {
		return;
	}

	try {
		await client.api.channels.createMessage(welcomePacket.welcome_channel_id, {
			allowed_mentions: { users: [userId] },
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} catch (error) {
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
					custom_id: `${CustomId.WelcomeHugSend}§${userId}`,
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

	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		throw new Error("Could not find the guild of a welcome message.");
	}

	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("welcome_channel_id", "hug")
		.where({ guild_id: interaction.guild_id })
		.first();

	const channel =
		welcomePacket?.welcome_channel_id && guild.channels.get(welcomePacket?.welcome_channel_id);

	if (!(channel && welcomePacket.hug)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("welcome.hug-disabled", { lng: interaction.locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: WELCOME_MESSAGE_HUG_PERMISSIONS,
			guild,
			member: me,
			channel,
		})
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("welcome.hug-missing-permissions", { lng: interaction.locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	try {
		const user = await client.api.users.get(userId);

		await client.api.channels.createMessage(channel.id, {
			allowed_mentions: { users: [user.id] },
			components: friendshipActionComponents({
				invoker: interaction.member.user,
				user,
				key: "hug",
				locale: interaction.guild_locale ?? Locale.EnglishGB,
			}),
			flags: MessageFlags.IsComponentsV2,
			message_reference: {
				type: MessageReferenceType.Default,
				message_id: interaction.message.id,
			},
		});
	} catch (error) {
		if (
			error instanceof DiscordAPIError &&
			error.code === RESTJSONErrorCodes.InvalidFormBodyOrContentType &&
			error.message.includes("MESSAGE_REFERENCE_UNKNOWN_MESSAGE")
		) {
			// Welcome message was deleted as we were sending one. This will not happen again.
			return;
		}

		pino.error(error, "Failed to send welcome hug.");
	} finally {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {});
	}
}

export async function welcomeHandleHugSettingButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	hug: boolean,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, hug })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
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
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.WelcomeMessageModalMessage,
					placeholder: t("welcome.message-modal-label-welcome-message-text-input-placeholder", {
						lng: locale,
						ns: "features",
					}),
					max_length: WELCOME_MESSAGE_MAXIMUM_LENGTH,
					style: TextInputStyle.Paragraph,
					value: welcomePacket?.message ?? "",
					required: true,
				},
				label: t("welcome.message-modal-label-welcome-message-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("welcome.message-modal-label-welcome-message-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.WelcomeMessageModal,
		title: t("welcome.message-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function welcomeHandleMessageSettingModal(
	interaction: APIModalSubmitGuildInteraction,
) {
	const components = new ModalResolver(interaction.data);

	await pg<WelcomePacket>(Table.Welcome)
		.insert({
			guild_id: interaction.guild_id,
			message: components.getTextInputValue(CustomId.WelcomeMessageModalMessage),
		})
		.onConflict("guild_id")
		.merge();

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
}

export async function welcomeHandleMessageSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, message: null })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
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

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
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
		custom_id: CustomId.WelcomeAccentColourModalAccentColour,
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
		components: [
			{
				type: ComponentType.Label,
				component: textInput,
				label: t("welcome.accent-colour-modal-label-accent-colour-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("welcome.accent-colour-modal-label-accent-colour-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.WelcomeAccentColourModal,
		title: t("welcome.accent-colour-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function welcomeHandleAccentColourSettingModal(
	interaction: APIModalSubmitGuildInteraction,
) {
	const components = new ModalResolver(interaction.data);
	const accentColour = components.getTextInputValue(CustomId.WelcomeAccentColourModalAccentColour);
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

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
}

export async function welcomeHandleAccentColourSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await pg<WelcomePacket>(Table.Welcome)
		.insert({ guild_id: interaction.guild_id, accent_colour: null })
		.onConflict("guild_id")
		.merge();

	await welcomeSetup({
		interaction,
		userId: interaction.member.user.id,
		locale: interaction.guild_locale!,
	});
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
