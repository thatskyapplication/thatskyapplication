import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIAttachment,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIComponentInMessageActionRow,
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
	GuildSystemChannelFlags,
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
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import type { NonNullableInterface } from "../types/index.js";
import { CDN_BUCKET, CDN_URL } from "../utility/configuration.js";
import { ANIMATED_HASH_PREFIX, MAXIMUM_ASSET_SIZE } from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import {
	isAnimatedHash,
	isValidImageAttachment,
	notInCachedGuildResponse,
} from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";
import { friendshipActionComponents } from "./friendship-actions.js";

const WELCOME_EDIT_MODAL_HUG_YES_VALUE = "1" as const;
const WELCOME_EDIT_MODAL_HUG_NO_VALUE = "0" as const;
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
	guild: Guild;
	locale: Locale;
	reply?: boolean;
	editReply?: boolean;
}

export async function welcomeSetup({
	interaction,
	guild,
	locale,
	reply,
	editReply,
}: WelcomeSetupOptions) {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.where({ guild_id: interaction.guild_id })
		.first();

	const components: APIMessageTopLevelComponent[] = [];

	if (welcomePacket) {
		const preview = welcomeComponents(interaction.member.user.id, welcomePacket, locale);

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

	const missingPermissions = [];

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
				missingPermissions.push(
					`- ${t("welcome.channel-description-missing-permissions", {
						lng: locale,
						ns: "features",
						channel: `<#${channel.id}>`,
					})}`,
				);
			}

			if (
				welcomePacket.hug &&
				!can({
					permission: WELCOME_MESSAGE_HUG_PERMISSIONS,
					guild,
					member: await guild.fetchMe(),
					channel,
				})
			) {
				missingPermissions.push(
					`- ${t("welcome.hug-description-missing-permissions", {
						lng: locale,
						ns: "features",
						channel: `<#${channel.id}>`,
					})}`,
				);
			}
		}
	}

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		{
			type: ComponentType.Button,
			style: ButtonStyle.Primary,
			custom_id: CustomId.WelcomeEdit,
			emoji: MISCELLANEOUS_EMOJIS.Edit,
			label: t("welcome.edit-button-label", { lng: locale, ns: "features" }),
		},
	];

	if (welcomePacket?.asset) {
		actionRowComponents.push({
			type: ComponentType.Button,
			style: ButtonStyle.Danger,
			custom_id: CustomId.WelcomeAssetDelete,
			label: t("welcome.asset-remove", { lng: locale, ns: "features" }),
			emoji: MISCELLANEOUS_EMOJIS.Trash,
		});
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
			content: t("welcome.main-description", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.ActionRow,
			components: actionRowComponents,
		},
	];

	if (
		welcomePacket &&
		(guild.systemChannelFlags & GuildSystemChannelFlags.SuppressJoinNotifications) === 0
	) {
		const appMissingPermission =
			(BigInt(interaction.app_permissions) & PermissionFlagsBits.ManageGuild) === 0n;

		containerComponents.push(
			{
				type: ComponentType.TextDisplay,
				content: appMissingPermission
					? (BigInt(interaction.member.permissions) & PermissionFlagsBits.ManageGuild) === 0n
						? t("welcome.suppress-join-notifications-app-missing-member-missing", {
								lng: locale,
								ns: "features",
							})
						: t("welcome.suppress-join-notifications-app-missing-member-not-missing", {
								lng: locale,
								ns: "features",
							})
					: t("welcome.suppress-join-notifications-app-not-missing", {
							lng: locale,
							ns: "features",
						}),
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						custom_id: CustomId.WelcomeSuppressJoinNotifications,
						label: t("welcome.suppress-join-notifications-button-label", {
							lng: locale,
							ns: "features",
						}),
						emoji: MISCELLANEOUS_EMOJIS.Edit,
						disabled: appMissingPermission,
					},
				],
			},
		);
	}

	if (missingPermissions.length > 0) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content: `${t("welcome.missing-permissions-description", { lng: locale, ns: "features" })}\n${missingPermissions.join("\n")}`,
			},
		);
	}

	components.push({ type: ComponentType.Container, components: containerComponents });

	const responseOptions = {
		components,
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (reply) {
		await client.api.interactions.reply(interaction.id, interaction.token, responseOptions);
		return;
	}

	if (editReply) {
		await client.api.interactions.editReply(
			interaction.application_id,
			interaction.token,
			responseOptions,
		);

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, responseOptions);
}

export async function welcomeHandleEditButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;

	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.select("welcome_channel_id", "message", "accent_colour", "hug", "asset")
		.where({ guild_id: interaction.guild_id })
		.first();

	const textInputAccentColour: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: CustomId.WelcomeEditModalAccentColour,
		placeholder: "#123456",
		max_length: 7,
		min_length: 7,
		style: TextInputStyle.Short,
		required: false,
	};

	if (typeof welcomePacket?.accent_colour === "number") {
		textInputAccentColour.value = `#${welcomePacket.accent_colour.toString(16).padStart(6, "0")}`;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.ChannelSelect,
					custom_id: CustomId.WelcomeEditModalChannel,
					channel_types: [ChannelType.GuildText],
					placeholder: t("welcome.edit-modal-channel-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
					min_values: 0,
					max_values: 1,
					default_values: welcomePacket?.welcome_channel_id
						? [{ type: SelectMenuDefaultValueType.Channel, id: welcomePacket.welcome_channel_id }]
						: [],
					required: false,
				},
				label: t("welcome.edit-modal-label-channel-label", { lng: locale, ns: "features" }),
				description: t("welcome.edit-modal-label-channel-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.WelcomeEditModalMessage,
					placeholder: t("welcome.edit-modal-label-welcome-message-text-input-placeholder", {
						lng: locale,
						ns: "features",
					}),
					max_length: WELCOME_MESSAGE_MAXIMUM_LENGTH,
					style: TextInputStyle.Paragraph,
					value: welcomePacket?.message ?? "",
					required: false,
				},
				label: t("welcome.edit-modal-label-welcome-message-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("welcome.edit-modal-label-welcome-message-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: textInputAccentColour,
				label: t("welcome.edit-modal-label-accent-colour-label", {
					lng: locale,
					ns: "features",
				}),
				description: t("welcome.edit-modal-label-accent-colour-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.StringSelect,
					custom_id: CustomId.WelcomeEditModalHug,
					min_values: 0,
					max_values: 1,
					options: [
						{
							label: t("welcome.edit-modal-label-hug-string-select-menu-option-yes", {
								lng: locale,
								ns: "features",
							}),
							value: WELCOME_EDIT_MODAL_HUG_YES_VALUE,
							default: welcomePacket?.hug === true,
						},
						{
							label: t("welcome.edit-modal-label-hug-string-select-menu-option-no", {
								lng: locale,
								ns: "features",
							}),
							value: WELCOME_EDIT_MODAL_HUG_NO_VALUE,
							default: welcomePacket?.hug === false,
						},
					],
					required: false,
				},
				label: t("welcome.edit-modal-label-hug-label", { lng: locale, ns: "features" }),
				description: t("welcome.edit-modal-label-hug-description", {
					lng: locale,
					ns: "features",
				}),
			},
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.WelcomeEditModalAsset,
					min_values: 0,
					max_values: 1,
					required: false,
				},
				label: t("welcome.edit-modal-label-asset-label", { lng: locale, ns: "features" }),
				description: t("welcome.edit-modal-label-asset-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.WelcomeEditModal,
		title: t("welcome.edit-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function welcomeHandleSuppressJoinNotificationsButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
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

	if (
		(BigInt(interaction.app_permissions) & PermissionFlagsBits.ManageGuild) ===
		PermissionFlagsBits.ManageGuild
	) {
		await client.api.guilds.edit(interaction.guild_id, {
			system_channel_flags:
				guild.systemChannelFlags | GuildSystemChannelFlags.SuppressJoinNotifications,
		});

		await welcomeSetup({
			interaction,
			guild,
			locale: guild.preferredLocale,
		});
	} else {
		await welcomeSetup({
			interaction,
			guild,
			locale: guild.preferredLocale,
		});

		await client.api.interactions.followUp(interaction.application_id, interaction.token, {
			content: t("welcome.suppress-join-notifications-missing-permissions", {
				lng: interaction.locale,
				ns: "features",
			}),
			flags: MessageFlags.Ephemeral,
		});
	}
}

export async function welcomeHandleEditModal(interaction: APIModalSubmitGuildInteraction) {
	const { locale } = interaction;
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(locale),
		);

		return;
	}

	let editReply = false;
	const components = new ModalResolver(interaction.data);
	const channel = components.getChannelValues(CustomId.WelcomeEditModalChannel);
	const message = components.getTextInputValue(CustomId.WelcomeEditModalMessage);
	const accentColour = components.getTextInputValue(CustomId.WelcomeEditModalAccentColour);

	const hug = components.getStringSelectValues(CustomId.WelcomeEditModalHug) as readonly (
		| typeof WELCOME_EDIT_MODAL_HUG_YES_VALUE
		| typeof WELCOME_EDIT_MODAL_HUG_NO_VALUE
	)[];

	const asset = components.getFileUploadValues(CustomId.WelcomeEditModalAsset)[0];

	const data: WelcomePacketSetData = {
		guild_id: interaction.guild_id,
		welcome_channel_id: channel.length === 0 ? null : channel[0]!.id,
		message: message.length === 0 ? null : message,
		hug: hug.length === 0 ? null : hug[0]! === WELCOME_EDIT_MODAL_HUG_YES_VALUE,
	};

	const errors = [];

	if (accentColour.length === 0) {
		data.accent_colour = null;
	} else {
		const hexadecimalString = accentColour.slice(1);

		if (accentColour[0] === "#" && hexadecimalRegularExpression.test(hexadecimalString)) {
			data.accent_colour = Number.parseInt(hexadecimalString, 16);
		} else {
			errors.push(t("welcome.accent-colour-invalid", { lng: locale, ns: "features" }));
		}
	}

	if (asset) {
		if (isValidImageAttachment(asset, MAXIMUM_ASSET_SIZE)) {
			await client.api.interactions.deferMessageUpdate(interaction.id, interaction.token);
			editReply = true;
			data.asset = await welcomeSetAsset(interaction, asset);
		} else {
			errors.push(
				t("asset-image-invalid", {
					lng: locale,
					ns: "general",
					size: MAXIMUM_ASSET_SIZE / 1_000_000,
				}),
			);
		}
	}

	await pg<WelcomePacket>(Table.Welcome).insert(data).onConflict("guild_id").merge();

	await welcomeSetup({
		interaction,
		guild,
		locale: guild.preferredLocale!,
		editReply,
	});

	if (errors.length > 0) {
		await client.api.interactions.followUp(interaction.application_id, interaction.token, {
			content: errors.length === 1 ? errors[0]! : errors.map((error) => `- ${error}`).join("\n"),
			flags: MessageFlags.Ephemeral,
		});
	}
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

export async function welcomeHandleAssetSettingDeleteButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
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

	await welcomeSetup({ interaction, guild, locale: guild.preferredLocale });
}

async function welcomeSetAsset(
	interaction: APIModalSubmitGuildInteraction,
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

	return hashedBuffer;
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
