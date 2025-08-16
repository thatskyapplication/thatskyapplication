import type { Buffer } from "node:buffer";
import { URL } from "node:url";
import { DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIActionRowComponent,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteractionDataStringOption,
	type APIAttachment,
	type APIButtonComponent,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIComponentInMessageActionRow,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitInteraction,
	type APISelectMenuOption,
	type APITextDisplayComponent,
	type APITextInputComponent,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandOptionType,
	ButtonStyle,
	ChannelType,
	ComponentType,
	type InteractionsAPI,
	InteractionType,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import {
	COUNTRY_VALUES,
	type Country,
	CountryToEmoji,
	type Emoji,
	formatEmoji,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	isCountry,
	isPlatformId,
	MAXIMUM_WINGED_LIGHT,
	PLATFORM_ID_VALUES,
	PlatformId,
	type PlatformIds,
	resolveCurrencyEmoji,
	type SeasonIds,
	SKY_PROFILE_EDIT_TYPE_VALUES,
	SKY_PROFILE_RESET_TYPE_VALUES,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	SkyProfileEditType,
	type SkyProfileEditTypes,
	type SkyProfilePacket,
	SkyProfileResetType,
	type SkyProfileResetTypes,
	SkyProfileWingedLightType,
	type SkyProfileWingedLightTypes,
	skySeasons,
	Table,
	WING_BUFFS,
	WINGED_LIGHT_IN_AREAS,
} from "@thatskyapplication/utility";
import { hash } from "hasha";
import { t } from "i18next";
import sharp from "sharp";
import { COMMAND_CACHE } from "../caches/commands.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import { findUser } from "../services/guess.js";
import { totalReceived } from "../services/heart.js";
import {
	APPLICATION_ID,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
	SUPPORT_SERVER_GUILD_ID,
	THAT_WINGLESS_COMMUNITY_INVITE_URL,
} from "../utility/configuration.js";
import {
	ANIMATED_HASH_PREFIX,
	CDN_BUCKET,
	CDN_URL,
	MAXIMUM_AUTOCOMPLETE_NAME_LIMIT,
	MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
	SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
	SKY_PROFILE_MINIMUM_SPOT_LENGTH,
	SKY_PROFILE_REPORT_MAXIMUM_LENGTH,
	SKY_PROFILE_REPORT_MINIMUM_LENGTH,
	SKY_PROFILE_UNKNOWN_NAME,
	SKY_PROFILES_URL,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS, SeasonIdToSeasonalEmoji } from "../utility/emojis.js";
import {
	chatInputApplicationCommandMention,
	interactionInvoker,
	isAnimatedHash,
	isButton,
	isChatInputCommand,
	resolveStringSelectMenu,
	userLogFormat,
} from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import { allProgress, fetchCatalogue } from "./catalogue.js";

interface SkyProfileLikesPacket {
	user_id: Snowflake;
	target_id: Snowflake;
}

export type SkyProfileSetData = Partial<SkyProfilePacket> &
	Pick<SkyProfilePacket, "user_id"> & {
		country?: Country | null;
		seasons?: readonly SeasonIds[] | null;
		platform?: readonly PlatformIds[] | null;
	};

function isSkyProfileEditType(value: number): value is SkyProfileEditTypes {
	return SKY_PROFILE_EDIT_TYPE_VALUES.includes(value as SkyProfileEditTypes);
}

function isSkyProfileResetType(value: number): value is SkyProfileResetTypes {
	return SKY_PROFILE_RESET_TYPE_VALUES.includes(value as SkyProfileResetTypes);
}

const PlatformIdToEmoji = {
	[PlatformId.iOS]: MISCELLANEOUS_EMOJIS.PlatformIOS,
	[PlatformId.Android]: MISCELLANEOUS_EMOJIS.PlatformAndroid,
	[PlatformId.Mac]: MISCELLANEOUS_EMOJIS.PlatformMac,
	[PlatformId.NintendoSwitch]: MISCELLANEOUS_EMOJIS.PlatformSwitch,
	[PlatformId.PlayStation]: MISCELLANEOUS_EMOJIS.PlatformPlayStation,
	[PlatformId.Steam]: MISCELLANEOUS_EMOJIS.PlatformSteam,
} as const satisfies Readonly<Record<PlatformIds, Emoji>>;

export const SKY_PROFILE_EDIT_CUSTOM_ID = "SKY_PROFILE_EDIT_CUSTOM_ID" as const;
export const SKY_PROFILE_SHOW_RESET_CUSTOM_ID = "SKY_PROFILE_SHOW_RESET_CUSTOM_ID" as const;
export const SKY_PROFILE_RESET_CUSTOM_ID = "SKY_PROFILE_RESET_CUSTOM_ID" as const;
export const SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID = "SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID" as const;
const SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID" as const;

const SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID =
	"SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_SEASONS_SELECT_MENU_1_CUSTOM_ID =
	"SKY_PROFILE_SET_SEASONS_SELECT_MENU_1_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_SEASONS_SELECT_MENU_2_CUSTOM_ID =
	"SKY_PROFILE_SET_SEASONS_SELECT_MENU_2_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID =
	"SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID = "SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID" as const;
const SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID =
	"SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID" as const;

const SKY_PROFILE_EDIT_WINGLESS_BUTTON = {
	type: ComponentType.Button,
	style: ButtonStyle.Link,
	label: "Join capeless community server",
	url: THAT_WINGLESS_COMMUNITY_INVITE_URL,
} as const;

const SKY_PROFILE_EDIT_RESET_BUTTON = {
	type: ComponentType.Button,
	custom_id: SKY_PROFILE_SHOW_RESET_CUSTOM_ID,
	label: "Reset",
	style: ButtonStyle.Secondary,
} as const;

const SKY_PROFILE_BACK_TO_START_ACTION_ROW: APIActionRowComponent<APIButtonComponent> = {
	type: ComponentType.ActionRow,
	components: [
		{
			type: ComponentType.Button,
			custom_id: SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID,
			emoji: { name: "⏮️" },
			label: "Back to Sky Profile",
			style: ButtonStyle.Primary,
		},
	],
} as const;

export const SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS = [
	"SKY_PROFILE_EXPLORE_1_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_2_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_3_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_4_SELECT_MENU_CUSTOM_ID",
] as const;

export const SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS = [
	"SKY_PROFILE_EXPLORE_LIKES_1_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_LIKES_2_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_LIKES_3_SELECT_MENU_CUSTOM_ID",
	"SKY_PROFILE_EXPLORE_LIKES_4_SELECT_MENU_CUSTOM_ID",
] as const;

export const SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID = "SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID" as const;
export const SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID = "SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID" as const;
export const SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID = "SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID = "SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID" as const;

export const SKY_PROFILE_REPORT_MODAL_CUSTOM_ID = "SKY_PROFILE_REPORT_MODAL_CUSTOM_ID" as const;

const SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID =
	"SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID" as const;

export const enum AssetType {
	Icon = 0,
	Thumbnail = 1,
}

function generateProfileExplorerSelectMenuOptions(
	skyProfilePackets: readonly SkyProfilePacket[],
	indexStart: number,
	skyProfileLikesPackets?: readonly SkyProfileLikesPacket[],
) {
	const maximumIndex = MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT + indexStart;

	return skyProfilePackets.slice(indexStart, maximumIndex).map((skyProfilePacket) => {
		const stringSelectMenuOption: APISelectMenuOption = {
			label: skyProfilePacket.name ?? SKY_PROFILE_UNKNOWN_NAME,
			value: skyProfilePacket.user_id,
		};

		if (
			skyProfileLikesPackets?.some(
				(skyProfileLikesPacket) => skyProfileLikesPacket.target_id === skyProfilePacket.user_id,
			)
		) {
			stringSelectMenuOption.emoji = MISCELLANEOUS_EMOJIS.Heart;
		}

		const { description } = skyProfilePacket;

		if (description) {
			stringSelectMenuOption.description =
				description.length >= SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH
					? `${description.slice(0, SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH - 3)}...`
					: description;
		}

		return stringSelectMenuOption;
	});
}

function generateLabelLetter(label: string) {
	const emojiRegularExpression = /^\p{Emoji}/u.exec(label);

	if (emojiRegularExpression) {
		return emojiRegularExpression[0];
	}

	const zeroWidthRegularExpression = /\u200B|\u200C|\u200D\|u00A0]/.test(label);

	if (zeroWidthRegularExpression) {
		return "??";
	}

	return label[0]!.toUpperCase();
}

export async function skyProfileSet(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIModalSubmitInteraction,
	data: SkyProfileSetData,
	deferred = false,
) {
	await pg<SkyProfilePacket>(Table.Profiles).insert(data).onConflict("user_id").merge();
	await skyProfileShowEdit(interaction, deferred);
}

export async function skyProfileSetAsset(
	interaction: APIChatInputApplicationCommandInteraction,
	attachment: APIAttachment,
	type: AssetType,
) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	// Delete the old asset if it exists.
	if (skyProfilePacket) {
		if (skyProfilePacket.icon && type === AssetType.Icon) {
			await S3Client.send(
				new DeleteObjectCommand({
					Bucket: CDN_BUCKET,
					Key: skyProfileIconRoute(invoker.id, skyProfilePacket.icon),
				}),
			);
		}

		if (skyProfilePacket.thumbnail && type === AssetType.Thumbnail) {
			await S3Client.send(
				new DeleteObjectCommand({
					Bucket: CDN_BUCKET,
					Key: skyProfileThumbnailRoute(invoker.id, skyProfilePacket.thumbnail),
				}),
			);
		}
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
			Key:
				type === AssetType.Icon
					? skyProfileIconRoute(invoker.id, hashedBuffer)
					: skyProfileThumbnailRoute(invoker.id, hashedBuffer),
			Body: buffer,
		}),
	);

	return hashedBuffer;
}

export async function skyProfileEdit(interaction: APIMessageComponentSelectMenuInteraction) {
	const skyProfileEditType = Number(interaction.data.values[0]!);

	if (!isSkyProfileEditType(skyProfileEditType)) {
		pino.warn(interaction, "Received an unknown profile edit type.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "Unknown profile edit type. Please try again!",
				},
			],
		});

		return;
	}

	switch (skyProfileEditType) {
		case SkyProfileEditType.Name: {
			await skyProfileShowNameModal(interaction);
			return;
		}
		case SkyProfileEditType.Description: {
			await skyProfileShowDescriptionModal(interaction);
			return;
		}
		case SkyProfileEditType.WingedLight: {
			await skyProfileShowWingedLightSelectMenu(interaction);
			return;
		}
		case SkyProfileEditType.Spot: {
			await skyProfileShowSpotModal(interaction);
			return;
		}
		case SkyProfileEditType.Seasons: {
			await skyProfileShowSeasonsSelectMenu(interaction);
			return;
		}
		case SkyProfileEditType.Platforms: {
			await skyProfileShowPlatformsSelectMenu(interaction);
			return;
		}
		case SkyProfileEditType.CatalogueProgression: {
			await skyProfileSetCatalogueProgression(interaction);
			return;
		}
		case SkyProfileEditType.GuessRank: {
			await skyProfileSetGuessRank(interaction);
			return;
		}
	}
}

export async function skyProfileReset(interaction: APIMessageComponentSelectMenuInteraction) {
	const data: SkyProfileSetData = { user_id: interactionInvoker(interaction).id };

	for (const values of interaction.data.values) {
		const skyProfileResetType = Number(values);

		if (!isSkyProfileResetType(skyProfileResetType)) {
			pino.warn(interaction, "Received an unknown profile reset type.");

			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "Unknown profile reset type. Please try again!",
					},
				],
			});

			return;
		}

		switch (skyProfileResetType) {
			case SkyProfileResetType.Description:
				data.description = null;
				continue;
			case SkyProfileResetType.Icon:
				data.icon = null;
				continue;
			case SkyProfileResetType.Thumbnail:
				data.thumbnail = null;
				continue;
			case SkyProfileResetType.WingedLight:
				data.winged_light = null;
				continue;
			case SkyProfileResetType.Country:
				data.country = null;
				continue;
			case SkyProfileResetType.Spot:
				data.spot = null;
				continue;
			case SkyProfileResetType.Seasons:
				data.seasons = null;
				continue;
			case SkyProfileResetType.Platforms:
				data.platform = null;
				continue;
			case SkyProfileResetType.Spirit:
				data.spirit = null;
				continue;
			case SkyProfileResetType.CatalogueProgression:
				data.catalogue_progression = null;
				continue;
			case SkyProfileResetType.GuessRank:
				data.guess_rank = null;
				continue;
		}
	}

	await skyProfileSet(interaction, data);
}

export async function skyProfileShowEdit(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIModalSubmitInteraction,
	defer?: boolean,
) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const components: APIMessageTopLevelComponent[] = [];
	const containerComponents: APIComponentInContainer[] = [];

	if (skyProfilePacket) {
		components.push(...(await skyProfileComponents(interaction, skyProfilePacket)));
		const missing = skyProfileMissingData(skyProfilePacket);

		if (missing.length > 0) {
			containerComponents.push({ type: ComponentType.TextDisplay, content: missing.join("\n") });
		}
	} else {
		components.push({
			type: ComponentType.TextDisplay,
			content: `You do not have a Sky profile yet. Build one!\nSky profiles show up on ${SKY_PROFILES_URL} too!`,
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.StringSelect,
				custom_id: SKY_PROFILE_EDIT_CUSTOM_ID,
				max_values: 1,
				min_values: 1,
				options: SKY_PROFILE_EDIT_TYPE_VALUES.map((skyProfileEditType) => ({
					description: t(`sky-profile.edit-type-description.${skyProfileEditType}`, {
						lng: interaction.locale,
						ns: "features",
					}),
					label: t(`sky-profile.edit-type-label.${skyProfileEditType}`, {
						lng: interaction.locale,
						ns: "features",
					}),
					value: skyProfileEditType.toString(),
				})),
				placeholder: "What do you want to edit?",
			},
		],
	});

	const actionRowComponents: APIComponentInMessageActionRow[] = [];

	if (skyProfilePacket?.winged_light === SkyProfileWingedLightType.Capeless) {
		actionRowComponents.push(SKY_PROFILE_EDIT_WINGLESS_BUTTON);
	}

	actionRowComponents.push(SKY_PROFILE_EDIT_RESET_BUTTON);
	containerComponents.push({ type: ComponentType.ActionRow, components: actionRowComponents });

	const baseReplyOptions:
		| Parameters<InteractionsAPI["editReply"]>[2]
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [...components, { type: ComponentType.Container, components: containerComponents }],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	await (isChatInputCommand(interaction)
		? defer
			? client.api.interactions.editReply(APPLICATION_ID, interaction.token, baseReplyOptions)
			: client.api.interactions.reply(interaction.id, interaction.token, baseReplyOptions)
		: client.api.interactions.updateMessage(interaction.id, interaction.token, baseReplyOptions));
}

export async function skyProfileDelete(userId: Snowflake) {
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("icon", "thumbnail")
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		return;
	}

	const promises = [];
	const profileDeleteData = [];

	if (skyProfilePacket.icon) {
		profileDeleteData.push({ Key: skyProfileIconRoute(userId, skyProfilePacket.icon) });
	}

	if (skyProfilePacket.thumbnail) {
		profileDeleteData.push({
			Key: skyProfileThumbnailRoute(userId, skyProfilePacket.thumbnail),
		});
	}

	if (profileDeleteData.length > 0) {
		promises.push(
			S3Client.send(
				new DeleteObjectsCommand({ Bucket: CDN_BUCKET, Delete: { Objects: profileDeleteData } }),
			),
		);
	}

	promises.push(pg<SkyProfilePacket>(Table.Profiles).delete().where({ user_id: userId }));
	await Promise.all(promises);
}

export async function skyProfileShow(
	interaction: APIChatInputApplicationCommandInteraction,
	user: APIUser | null,
	hide: boolean,
) {
	if (user?.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Do applications have Sky profiles? Hm. Who knows?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const invoker = interactionInvoker(interaction);

	if (hide) {
		await skyProfileExploreProfile(interaction, user?.id ?? invoker.id);
	} else {
		const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
			.where({ user_id: user?.id ?? invoker.id })
			.first();

		if (!skyProfilePacket) {
			const userIsInvoker = !user || user.id === invoker.id;

			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: `${userIsInvoker ? "You do" : `<@${user.id}> does`} not have a Sky profile! Why not${
					userIsInvoker ? "" : " ask them to"
				} create one?`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.reply(interaction.id, interaction.token, {
			allowed_mentions: { parse: [] },
			components: await skyProfileComponents(interaction, skyProfilePacket),
			flags: MessageFlags.IsComponentsV2,
		});
	}
}

export async function skyProfileExplore(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
	const isChatInput = isChatInputCommand(interaction);

	const page = isChatInput
		? 1
		: Number(interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1));

	const limit =
		MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT * SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.length;

	const offset = (page - 1) * limit;

	const skyProfilePackets = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.orderBy("name", "asc")
		.orderBy("user_id", "asc")
		.limit(limit + 1)
		.offset(offset);

	if (skyProfilePackets.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "There are no profiles to explore. Why not be the first?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const hasPreviousPage = offset > 0;
	const hasNextPage = skyProfilePackets.length > limit;

	if (hasNextPage) {
		skyProfilePackets.pop();
	}

	const invoker = interactionInvoker(interaction);

	const skyProfileLikesPackets = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
		user_id: invoker.id,
	});

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: "## Sky Profile Explorer",
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: `You can explore Sky profiles others have created!\n\nYou can ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} a Sky profile to keep track of it, and report any Sky profiles that are not in the spirit of Sky.\n\nHave fun exploring!`,
		},
	];

	for (const [index, customId] of SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.entries()) {
		const options = generateProfileExplorerSelectMenuOptions(
			skyProfilePackets,
			index * MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
			skyProfileLikesPackets,
		);

		if (options.length === 0) {
			continue;
		}

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: customId,
					max_values: 1,
					min_values: 1,
					options,
					placeholder: `${generateLabelLetter(options[0]!.label)} - ${generateLabelLetter(
						options[options.length - 1]!.label,
					)}`,
				},
			],
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID}§${page - 1}`,
				disabled: !hasPreviousPage,
				emoji: { name: "⬅️" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID}§${page + 1}`,
				disabled: !hasNextPage,
				emoji: { name: "➡️" },
				label: t("navigation-next", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID}§1`,
				disabled: skyProfileLikesPackets.length === 0,
				emoji: { name: "🌐" },
				label: "Explore Likes",
				style: ButtonStyle.Secondary,
			},
		],
	});

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [{ type: ComponentType.Container, components: containerComponents }],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (isChatInput) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

export async function skyProfileCountryAutocomplete(
	interaction: APIApplicationCommandAutocompleteInteraction,
	option: APIApplicationCommandInteractionDataStringOption,
) {
	const { locale } = interaction;
	const value = option.value.toUpperCase();

	await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
		choices:
			value.length === 0
				? []
				: COUNTRY_VALUES.filter((country) =>
						new Intl.DisplayNames(locale, { type: "region", style: "long" })
							.of(country)!
							.toUpperCase()
							.includes(value),
					)
						.map((country) => ({
							name: new Intl.DisplayNames(locale, { type: "region", style: "long" }).of(country)!,
							value: country,
						}))
						.slice(0, 25),
	});
}

export async function skyProfileExploreAutocomplete(
	interaction: APIApplicationCommandAutocompleteInteraction,
	options: OptionResolver,
) {
	const focused = options.getFocusedOption(ApplicationCommandOptionType.String).value.toUpperCase();

	await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
		choices:
			focused.length === 0
				? []
				: (
						await pg<SkyProfilePacket>(Table.Profiles)
							.select(["user_id", "name", "description"])
							.where("name", "ilike", `%${focused}%`)
							.limit(25)
					).map(({ user_id, name: skyProfileName, description }) => {
						let name = `${skyProfileName}`;

						if (description) {
							name += `: ${description}`;
						}

						if (name.length > MAXIMUM_AUTOCOMPLETE_NAME_LIMIT) {
							name = `${name.slice(0, MAXIMUM_AUTOCOMPLETE_NAME_LIMIT - 3)}...`;
						}

						return { name, value: user_id };
					}),
	});
}

export async function skyProfileExploreProfile(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIUserApplicationCommandInteraction,
	userId: Snowflake,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This Sky kid does not have a Sky profile. Maybe they should make one!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const name = skyProfilePacket.name!;
	const previous = await skyProfileExploreProfilePreviousRow(name, userId);
	const next = await skyProfileExploreProfileNextRow(name, userId);
	const ownSkyProfile = invoker.id === skyProfilePacket.user_id;

	const isLiked = Boolean(
		await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes)
			.where({
				user_id: invoker.id,
				target_id: userId,
			})
			.first(),
	);

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			...(await skyProfileComponents(interaction, skyProfilePacket)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `<@${skyProfilePacket.user_id}>`,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID}§${previous?.user_id}`,
								disabled: !previous,
								emoji: { name: "⬅️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID}§${next?.user_id}`,
								disabled: !next,
								emoji: { name: "➡️" },
								label: t("navigation-next", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Heart,
								label: isLiked ? "Unlike" : "Like",
								style: isLiked ? ButtonStyle.Secondary : ButtonStyle.Success,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID}§1`,
								emoji: { name: "🌐" },
								label: "Explore",
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: "Report",
								style: ButtonStyle.Secondary,
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (interaction.type === InteractionType.MessageComponent) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	}
}

async function skyProfileExploreProfilePreviousRow(name: string, userId: Snowflake) {
	return await pg<SkyProfilePacket>(Table.Profiles)
		.where(function () {
			this.where("name", "<", name).orWhere(function () {
				this.where("name", "=", name).andWhere("user_id", "<", userId);
			});
		})
		.orderBy("name", "desc")
		.orderBy("user_id", "desc")
		.limit(1)
		.first();
}

async function skyProfileExploreProfileNextRow(name: string, userId: Snowflake) {
	return await pg<SkyProfilePacket>(Table.Profiles)
		.where(function () {
			this.where("name", ">", name).orWhere(function () {
				this.where("name", "=", name).andWhere("user_id", ">", userId);
			});
		})
		.orderBy("name", "asc")
		.orderBy("user_id", "asc")
		.limit(1)
		.first();
}

export async function skyProfileExploreLikes(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const page = Number(
		interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
	);

	const limit =
		MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT *
		SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.length;

	const offset = (page - 1) * limit;

	const SkyProfilePackets = await pg(Table.SkyProfileLikes)
		.join(Table.Profiles, `${Table.SkyProfileLikes}.target_id`, `${Table.Profiles}.user_id`)
		.select(`${Table.Profiles}.*`)
		.where(`${Table.SkyProfileLikes}.user_id`, invoker.id)
		.orderBy(`${Table.Profiles}.name`, "asc")
		.orderBy(`${Table.Profiles}.user_id`, "asc")
		.limit(limit + 1)
		.offset(offset);

	if (SkyProfilePackets.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You have no Sky profiles that you've liked.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const hasPreviousPage = offset > 0;
	const hasNextPage = SkyProfilePackets.length > limit;

	if (hasNextPage) {
		SkyProfilePackets.pop();
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: "## Sky Profile Explorer",
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: `You ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} these Sky profiles!`,
		},
	];

	for (const [index, customId] of SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.entries()) {
		const options = generateProfileExplorerSelectMenuOptions(
			SkyProfilePackets,
			index * MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
		);

		if (options.length === 0) {
			continue;
		}

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: customId,
					max_values: 1,
					min_values: 1,
					options,
					placeholder: `${generateLabelLetter(options[0]!.label)} - ${generateLabelLetter(
						options[options.length - 1]!.label,
					)}`,
				},
			],
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID}§${page - 1}`,
				disabled: !hasPreviousPage,
				emoji: { name: "⬅️" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID}§${page + 1}`,
				disabled: !hasNextPage,
				emoji: { name: "➡️" },
				label: t("navigation-next", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID}§1`,
				emoji: { name: "🌐" },
				label: "Explore",
				style: ButtonStyle.Secondary,
			},
		],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [{ type: ComponentType.Container, components: containerComponents }],
	});
}

async function skyProfileExploreLikedProfilePreviousRow(
	name: string,
	userId: Snowflake,
	targetId: Snowflake,
) {
	return await pg<SkyProfilePacket>(Table.SkyProfileLikes)
		.join(Table.Profiles, `${Table.SkyProfileLikes}.target_id`, `${Table.Profiles}.user_id`)
		.select(`${Table.Profiles}.*`)
		.where(`${Table.SkyProfileLikes}.user_id`, userId)
		.andWhere(function () {
			this.where(`${Table.Profiles}.name`, "<", name).orWhere(function () {
				this.where(`${Table.Profiles}.name`, "=", name).andWhere(
					`${Table.Profiles}.user_id`,
					"<",
					targetId,
				);
			});
		})
		.orderBy(`${Table.Profiles}.name`, "desc")
		.orderBy(`${Table.Profiles}.user_id`, "desc")
		.limit(1)
		.first();
}

async function skyProfileExploreLikedProfileNextRow(
	name: string,
	userId: Snowflake,
	targetId: Snowflake,
) {
	return await pg<SkyProfilePacket>(Table.SkyProfileLikes)
		.join(Table.Profiles, `${Table.SkyProfileLikes}.target_id`, `${Table.Profiles}.user_id`)
		.select(`${Table.Profiles}.*`)
		.where(`${Table.SkyProfileLikes}.user_id`, userId)
		.andWhere(function () {
			this.where(`${Table.Profiles}.name`, ">", name).orWhere(function () {
				this.where(`${Table.Profiles}.name`, "=", name).andWhere(
					`${Table.Profiles}.user_id`,
					">",
					targetId,
				);
			});
		})
		.orderBy(`${Table.Profiles}.name`, "asc")
		.orderBy(`${Table.Profiles}.user_id`, "asc")
		.limit(1)
		.first();
}

export async function skyProfileExploreLikedProfile(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const userId = isButton(interaction)
		? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
		: interaction.data.values[0]!;

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Could not go to that Sky kid's Sky profile. Try browsing?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const name = skyProfilePacket.name!;
	const previous = await skyProfileExploreLikedProfilePreviousRow(name, invoker.id, userId);
	const next = await skyProfileExploreLikedProfileNextRow(name, invoker.id, userId);
	const ownSkyProfile = invoker.id === skyProfilePacket.user_id;

	const isLiked = Boolean(
		await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes)
			.where({
				user_id: invoker.id,
				target_id: userId,
			})
			.first(),
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			...(await skyProfileComponents(interaction, skyProfilePacket)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `<@${skyProfilePacket.user_id}>`,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID}§${previous?.user_id}`,
								disabled: !previous,
								emoji: { name: "⬅️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID}§${next?.user_id}`,
								disabled: !next,
								emoji: { name: "➡️" },
								label: t("navigation-next", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Heart,
								label: isLiked ? "Unlike" : "Like",
								style: isLiked ? ButtonStyle.Secondary : ButtonStyle.Success,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID}§1`,
								emoji: { name: "🌐" },
								label: "Explore Likes",
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: "Report",
								style: ButtonStyle.Secondary,
							},
						],
					},
				],
			},
		],
	});
}

export async function skyProfileLike(
	interaction: APIMessageComponentButtonInteraction,
	fromLike = false,
) {
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const invoker = interactionInvoker(interaction);

	if (invoker.id === skyProfilePacket.user_id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You can't like your own Sky profile!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const like = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes)
		.where({
			user_id: invoker.id,
			target_id: userId,
		})
		.first();

	if (like) {
		await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).delete().where({
			user_id: invoker.id,
			target_id: userId,
		});
	} else {
		await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).insert({
			user_id: invoker.id,
			target_id: userId,
		});
	}

	await (fromLike
		? skyProfileExploreLikedProfile(interaction)
		: skyProfileExploreProfile(interaction, userId));
}

export async function skyProfileReport(
	interaction: APIMessageComponentButtonInteraction,
	fromLike = false,
) {
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			...(await skyProfileComponents(interaction, skyProfilePacket)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content:
							"If someone's Sky profile is not in the spirit of Sky (excessive slurs, spam, etc.), feel free to report it so it can be reviewed.\n\nDo you wish to report this Sky profile?",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${fromLike ? SKY_PROFILE_EXPLORE_LIKES_VIEW_PROFILE_CUSTOM_ID : SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID}§${userId}`,
								emoji: { name: "⬅️" },
								label: "Back",
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID}§${userId}`,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: "Confirm",
								style: ButtonStyle.Danger,
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}

export async function skyProfileReportModalPrompt(
	interaction: APIMessageComponentButtonInteraction,
) {
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID,
						label: "What's wrong with this Sky profile?",
						max_length: SKY_PROFILE_REPORT_MAXIMUM_LENGTH,
						min_length: SKY_PROFILE_REPORT_MINIMUM_LENGTH,
						style: TextInputStyle.Paragraph,
					},
				],
			},
		],
		custom_id: `${SKY_PROFILE_REPORT_MODAL_CUSTOM_ID}§${userId}`,
		title: "Report Sky Profile",
	});
}

export async function skyProfileSendReport(interaction: APIModalSubmitInteraction) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the guild of the Sky profile reports channel.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "This Sky profile has been reported. Thank you for keeping the community safe!",
				},
			],
		});

		return;
	}

	const channel = guild.channels.get(SKY_PROFILE_REPORTS_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error(interaction, "Could not find the Sky profile reports channel.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "This Sky profile has been reported. Thank you for keeping the community safe!",
				},
			],
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission:
				PermissionFlagsBits.EmbedLinks |
				PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.ViewChannel,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(interaction, "Missing permissions to post in the Sky profile reports channel.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "This Sky profile has been reported. Thank you for keeping the community safe!",
				},
			],
		});

		return;
	}

	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data.components);
	const text = components.getTextInputValue(SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID);
	const invoker = interactionInvoker(interaction);

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { parse: [] },
		components: [
			{
				type: ComponentType.TextDisplay,
				content: `Report by ${userLogFormat(invoker)} against <@${skyProfilePacket.user_id}>:\n>>> ${text}`,
			},
			...(await skyProfileComponents(interaction, skyProfilePacket)),
		],
		flags: MessageFlags.IsComponentsV2,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.TextDisplay,
				content: "This Sky profile has been reported. Thank you for keeping the community safe!",
			},
		],
	});
}

async function skyProfileShowNameModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID,
		label: "What's your in-game name?",
		max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
		min_length: 1,
		required: true,
		style: TextInputStyle.Short,
	};

	if (skyProfilePacket?.name) {
		textInput.value = skyProfilePacket.name;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [{ type: ComponentType.ActionRow, components: [textInput] }],
		custom_id: SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
		title: "Sky Profile",
	});
}

async function skyProfileShowDescriptionModal(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID,
		label: "Type a lovely description about your Skykid!",
		max_length: SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
		min_length: 1,
		required: true,
		style: TextInputStyle.Paragraph,
	};

	if (skyProfilePacket?.description) {
		textInput.value = skyProfilePacket.description;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [{ type: ComponentType.ActionRow, components: [textInput] }],
		custom_id: SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID,
		title: "Sky Profile",
	});
}

async function skyProfileShowWingedLightSelectMenu(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content:
							"You may choose how to display your winged light.\n\nInferring from the catalogue means your maximum winged light is all winged light combined with any wing buffs you have chosen in the catalogue. Capeless is also an option.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID,
								max_values: 1,
								min_values: 1,
								options: SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.map((skyProfileWingedLightType) => ({
									default: skyProfilePacket?.winged_light === skyProfileWingedLightType,
									label: t(`sky-profile-winged-light-types.${skyProfileWingedLightType}`, {
										lng: locale,
										ns: "general",
									}),
									value: skyProfileWingedLightType.toString(),
								})),
								placeholder: "How would you like your winged light to be displayed?",
							},
						],
					},
					SKY_PROFILE_BACK_TO_START_ACTION_ROW,
				],
			},
		],
	});
}

async function skyProfileShowSpotModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID,
		label: "Where's your favourite spot to hang out?",
		max_length: SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
		min_length: SKY_PROFILE_MINIMUM_SPOT_LENGTH,
		required: true,
		style: TextInputStyle.Short,
	};

	if (skyProfilePacket?.spot) {
		textInput.value = skyProfilePacket.spot;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [{ type: ComponentType.ActionRow, components: [textInput] }],
		custom_id: SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID,
		title: "Sky Profile",
	});
}

async function skyProfileShowSeasonsSelectMenu(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const currentSeasons = skyProfilePacket?.seasons;
	const seasons = skySeasons();

	const [seasons1, seasons2] = seasons.partition(
		(_, key) => key < MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
	);

	const components: APIComponentInContainer[] = [
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: SKY_PROFILE_SET_SEASONS_SELECT_MENU_1_CUSTOM_ID,
					max_values: seasons1.size,
					min_values: 0,
					options: seasons1.map((season) => {
						const option: APISelectMenuOption = {
							default: currentSeasons?.includes(season.id) ?? false,
							label: t(`seasons.${season.id}`, { lng: locale, ns: "general" }),
							value: String(season.id),
						};

						const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

						if (seasonEmoji) {
							option.emoji = seasonEmoji;
						}

						return option;
					}),
					placeholder: "Select the seasons you participated in!",
				},
			],
		},
	];

	if (seasons2.size > 0) {
		components.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: SKY_PROFILE_SET_SEASONS_SELECT_MENU_2_CUSTOM_ID,
					max_values: seasons2.size,
					min_values: 0,
					options: seasons2.map((season) => {
						const option: APISelectMenuOption = {
							default: currentSeasons?.includes(season.id) ?? false,
							label: t(`seasons.${season.id}`, { lng: locale, ns: "general" }),
							value: String(season.id),
						};

						const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

						if (seasonEmoji) {
							option.emoji = seasonEmoji;
						}

						return option;
					}),
					placeholder: "Select the seasons you participated in!",
				},
			],
		});
	}

	components.push(SKY_PROFILE_BACK_TO_START_ACTION_ROW);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [{ type: ComponentType.Container, components }],
	});
}

async function skyProfileShowPlatformsSelectMenu(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const currentPlatforms = skyProfilePacket?.platform;

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID,
								max_values: PLATFORM_ID_VALUES.length,
								min_values: 0,
								options: PLATFORM_ID_VALUES.map((platformId) => ({
									default: currentPlatforms?.includes(platformId) ?? false,
									emoji: PlatformIdToEmoji[platformId],
									label: t(`sky-profile.platform-label.${platformId}`, {
										lng: interaction.locale,
										ns: "features",
									}),
									value: String(platformId),
								})),
								placeholder: "Select the platforms you play on!",
							},
						],
					},
					SKY_PROFILE_BACK_TO_START_ACTION_ROW,
				],
			},
		],
	});
}

export function skyProfileSetName(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data.components);
	const name = components.getTextInputValue(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID).trim();
	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, name });
}

export function skyProfileSetDescription(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data.components);

	const description = components
		.getTextInputValue(SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID)
		.trim();

	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, description });
}

export async function skyProfileSetWingedLight(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	await skyProfileSet(interaction, {
		user_id: interactionInvoker(interaction).id,
		winged_light: Number(interaction.data.values[0]) as SkyProfileWingedLightTypes,
	});
}

export function skyProfileSetSpot(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data.components);
	const spot = components.getTextInputValue(SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID).trim();
	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, spot });
}

export async function skyProfileSetSeasons(interaction: APIMessageComponentSelectMenuInteraction) {
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	// Get the select menu where this interaction came from.
	const component = resolveStringSelectMenu(
		interaction.message.components!,
		interaction.data.custom_id,
	)!;

	// Retrieve all seasons in this select menu.
	const selectMenuSeasons = component.options.reduce(
		(computedSeasons, { value }) => computedSeasons.add(Number(value) as SeasonIds),
		new Set<SeasonIds>(),
	);

	// Remove the seasons from the data.
	const modifiedData = new Set<SeasonIds>(
		skyProfilePacket?.seasons as readonly SeasonIds[],
	).difference(selectMenuSeasons);

	// Calculate the new data.
	const newData = modifiedData.union(
		interaction.data.values.reduce(
			(computedSeasons, value) => computedSeasons.add(Number(value) as SeasonIds),
			new Set<SeasonIds>(),
		),
	);

	return skyProfileSet(interaction, { user_id: invoker.id, seasons: [...newData] });
}

export async function skyProfileSetPlatform(interaction: APIMessageComponentSelectMenuInteraction) {
	const platformIds = interaction.data.values.map((value) => Number(value));

	if (!platformIds.every((platformId) => isPlatformId(platformId))) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Invalid platform selected. Please try again.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	return skyProfileSet(interaction, {
		user_id: interactionInvoker(interaction).id,
		platform: platformIds,
	});
}

async function skyProfileSetCatalogueProgression(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();
	await skyProfileSet(interaction, {
		user_id: invoker.id,
		catalogue_progression: !skyProfilePacket?.catalogue_progression,
	});
}

async function skyProfileSetGuessRank(interaction: APIMessageComponentSelectMenuInteraction) {
	const invoker = interactionInvoker(interaction);
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();
	await skyProfileSet(interaction, {
		user_id: invoker.id,
		guess_rank: !skyProfilePacket?.guess_rank,
	});
}

export async function skyProfileShowReset(interaction: APIMessageComponentButtonInteraction) {
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: interactionInvoker(interaction).id })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You do not have a Sky profile to reset.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			...(await skyProfileComponents(interaction, skyProfilePacket)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: SKY_PROFILE_RESET_CUSTOM_ID,
								max_values: SKY_PROFILE_RESET_TYPE_VALUES.length,
								min_values: 1,
								options: SKY_PROFILE_RESET_TYPE_VALUES.map((skyProfileResetType) => ({
									label: t(`sky-profile.reset-type-label.${skyProfileResetType}`, {
										lng: interaction.locale,
										ns: "features",
									}),
									value: skyProfileResetType.toString(),
								})),
								placeholder: "What do you wish to reset?",
							},
						],
					},
					SKY_PROFILE_BACK_TO_START_ACTION_ROW,
				],
			},
		],
	});
}

async function skyProfileComponents(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIModalSubmitInteraction
		| APIUserApplicationCommandInteraction,
	skyProfilePacket: SkyProfilePacket,
): Promise<[APIMessageTopLevelComponent]> {
	const { locale } = interaction;

	const {
		user_id: userId,
		name,
		icon,
		description,
		country,
		winged_light: wingedLight,
		seasons,
		platform,
		spirit,
		spot,
		catalogue_progression: catalogueProgression,
		guess_rank: guessRank,
	} = skyProfilePacket;

	const containerComponents: APIComponentInContainer[] = [];
	let seasonsComponent: APITextDisplayComponent | undefined;
	let platformsComponent: APITextDisplayComponent | undefined;

	if (seasons && seasons.length > 0) {
		seasonsComponent = {
			type: ComponentType.TextDisplay,
			content: seasons
				.sort((a, b) => a - b)
				.reduce<string[]>((seasonEmojis, season) => {
					const seasonEmoji = SeasonIdToSeasonalEmoji[season as SeasonIds];

					if (seasonEmoji) {
						seasonEmojis.push(formatEmoji(seasonEmoji));
					}

					return seasonEmojis;
				}, [])
				.join(" "),
		};
	}

	if (platform && platform.length > 0) {
		platformsComponent = {
			type: ComponentType.TextDisplay,
			content: platform
				.sort((a, b) => a - b)
				.map((platformId) => formatEmoji(PlatformIdToEmoji[platformId as PlatformIds]))
				.join(" "),
		};
	}

	if (name) {
		const textDisplay: APITextDisplayComponent = {
			type: ComponentType.TextDisplay,
			content: `## [${name}](${SKY_PROFILES_URL}/${userId})`,
		};

		if (icon) {
			const mediaComponents = [textDisplay];

			if (seasonsComponent) {
				mediaComponents.push(seasonsComponent);
			}

			if (platformsComponent) {
				mediaComponents.push(platformsComponent);
			}

			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Thumbnail,
					media: { url: skyProfileIconURL(userId, icon) },
				},
				components: mediaComponents,
			});
		} else {
			containerComponents.push(textDisplay);

			if (seasonsComponent) {
				containerComponents.push(seasonsComponent);
			}

			if (platformsComponent) {
				containerComponents.push(platformsComponent);
			}
		}
	} else if (icon && (seasonsComponent || platformsComponent)) {
		const mediaComponents = [];

		if (seasonsComponent) {
			mediaComponents.push(seasonsComponent);
		}

		if (platformsComponent) {
			mediaComponents.push(platformsComponent);
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Thumbnail,
				media: { url: skyProfileIconURL(userId, icon) },
			},
			components: mediaComponents,
		});
	} else {
		if (seasonsComponent) {
			containerComponents.push(seasonsComponent);
		}

		if (platformsComponent) {
			containerComponents.push(platformsComponent);
		}
	}

	if (containerComponents.length > 0) {
		containerComponents.push({
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		});
	}

	if (description) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: description });
	}

	const miscellaneous = [];

	if (country) {
		if (isCountry(country)) {
			miscellaneous.push(
				`**Country:** ${CountryToEmoji[country]} ${new Intl.DisplayNames(locale, { type: "region", style: "long" }).of(country)!}`,
			);
		} else {
			pino.error(interaction, `Invalid country code in Sky Profile: ${country}`);
		}
	}

	if (typeof wingedLight === "number") {
		if (wingedLight === SkyProfileWingedLightType.Capeless) {
			miscellaneous.push("**Winged Light:** Capeless");
		} else {
			const catalogue = await fetchCatalogue(userId);

			if (catalogue) {
				let count = WINGED_LIGHT_IN_AREAS;

				for (const wingBuff of WING_BUFFS) {
					if (catalogue.data.has(wingBuff)) {
						count++;
					}
				}

				miscellaneous.push(
					`**Winged Light:** ${
						count === MAXIMUM_WINGED_LIGHT
							? `${count} (Max ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
							: count.toString()
					}`,
				);
			}
		}
	}

	if (typeof spirit === "number") {
		miscellaneous.push(
			`**Favourite Spirit:** ${t(`spirits.${spirit}`, { lng: locale, ns: "general" })}`,
		);
	}

	if (spot) {
		miscellaneous.push(`**Favourite Spot:** ${spot}`);
	}

	if (catalogueProgression) {
		const catalogue = await fetchCatalogue(userId);
		const allProgressResult = allProgress(catalogue?.data, true) ?? 0;
		miscellaneous.push(`**Catalogue Progression:** ${allProgressResult}%`);
	}

	if (guessRank) {
		const guessPacketRanking = await findUser(userId);

		miscellaneous.push(
			`**Guess Rank ${GuessDifficultyLevelToName[GuessDifficultyLevel.Original]}:** ${guessPacketRanking?.streak_rank ? `#${guessPacketRanking.streak_rank}` : "Unranked"}`,
		);

		miscellaneous.push(
			`**Guess Rank ${GuessDifficultyLevelToName[GuessDifficultyLevel.Hard]}:** ${guessPacketRanking?.streak_hard_rank ? `#${guessPacketRanking.streak_hard_rank}` : "Unranked"}`,
		);
	}

	if (miscellaneous.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: miscellaneous.join("\n"),
		});
	}

	containerComponents.push({
		type: ComponentType.Separator,
		divider: true,
		spacing: SeparatorSpacingSize.Small,
	});

	const hearts = await totalReceived(skyProfilePacket.user_id);

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `-# ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: hearts })}`,
	});

	return [{ type: ComponentType.Container, components: containerComponents }];
}

function skyProfileMissingData(skyProfilePacket: SkyProfilePacket) {
	const {
		name,
		icon,
		thumbnail,
		description,
		country,
		winged_light: wingedLight,
		seasons,
		platform,
		spirit,
		spot,
		catalogue_progression: catalogueProgression,
		guess_rank: guessRank,
	} = skyProfilePacket;

	const missing = [];
	const skyProfileCommandId = COMMAND_CACHE.get(t("sky-profile.command-name", { ns: "commands" }));

	const useCommandPrefix = skyProfileCommandId
		? `Use ${chatInputApplicationCommandMention(
				skyProfileCommandId,
				t("sky-profile.command-name", { ns: "commands" }),
				t("sky-profile.edit.command-name", { ns: "commands" }),
			)}`
		: "- Use the command";

	if (!name) {
		missing.push("- Set your name!");
	}

	if (!icon) {
		missing.push(`- ${useCommandPrefix} to upload an icon!`);
	}

	if (!thumbnail) {
		missing.push(
			`- ${useCommandPrefix} to upload a thumbnail!\n  - The thumbnail is only used on the [website](${SKY_PROFILES_URL}/${skyProfilePacket.user_id}).`,
		);
	}

	if (!description) {
		missing.push("- Set a description!");
	}

	if (!country) {
		missing.push(`- ${useCommandPrefix} to set the country you are from!`);
	}

	if (wingedLight === null) {
		missing.push("- Set the winged light you have!");
	}

	if (!seasons) {
		missing.push("- Use the select menu to show what seasons you participated in!");
	}

	if (!platform) {
		missing.push("- Use the select menu to show what platforms you play on!");
	}

	if (spirit === null) {
		missing.push(`- ${useCommandPrefix} to set your favourite spirit!`);
	}

	if (!spot) {
		missing.push("- Set your favourite spot!");
	}

	if (catalogueProgression === null) {
		missing.push("- Set if you want to share your catalogue progression!");
	}

	if (guessRank === null) {
		missing.push("- Set if you want to share your guessing game rank!");
	}

	return missing;
}

function skyProfileThumbnailRoute(userId: Snowflake, hash: string) {
	return `sky_profiles/thumbnails/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

function skyProfileIconRoute(userId: Snowflake, hash: string) {
	return `sky_profiles/icons/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

export function skyProfileIconURL(userId: Snowflake, icon: string) {
	return new URL(skyProfileIconRoute(userId, icon), CDN_URL).href;
}
