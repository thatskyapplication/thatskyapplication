import type { Buffer } from "node:buffer";
import { URL } from "node:url";
import { DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteractionDataStringOption,
	type APIAttachment,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
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
	type Locale,
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
	CROWDIN_URL,
	type Emoji,
	formatEmoji,
	GuessType,
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
	type SkyProfileData,
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
import {
	APPLICATION_ID,
	ARTIST_ROLE_ID,
	CDN_BUCKET,
	CDN_URL,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORTER_ROLE_ID,
	TRANSLATOR_ROLE_ID,
} from "../utility/configuration.js";
import {
	ANIMATED_HASH_PREFIX,
	MAXIMUM_AUTOCOMPLETE_NAME_LIMIT,
	MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
	SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
	SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
	SKY_PROFILE_REPORT_MAXIMUM_LENGTH,
	SKY_PROFILE_REPORT_MINIMUM_LENGTH,
	SKY_PROFILE_UNKNOWN_NAME,
	SKY_PROFILES_URL,
} from "../utility/constants.js";
import {
	CustomId,
	SKY_PROFILE_EXPLORER_LIKES,
	SKY_PROFILE_EXPLORERS,
} from "../utility/custom-id.js";
import { EMOTE_EMOJIS, MISCELLANEOUS_EMOJIS, SeasonIdToSeasonalEmoji } from "../utility/emojis.js";
import {
	chatInputApplicationCommandMention,
	interactionInvoker,
	isAnimatedHash,
	isButton,
	isChatInputCommand,
	resolveStringSelectMenu,
	userLogFormat,
	validateAttachment,
} from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import { allProgress, fetchCatalogue } from "./catalogue.js";
import { findUser } from "./guess.js";
import { totalReceived } from "./heart.js";

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

export const enum AssetType {
	Icon = 0,
	Banner = 1,
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

async function skyProfileFetch(userId: Snowflake) {
	return await pg
		.select<SkyProfileData>(["p.*", "u.crowdin_user_id", "u.supporter", "u.artist"])
		.from(`${Table.Profiles} as p`)
		.leftJoin(`${Table.Users} as u`, "p.user_id", "u.discord_user_id")
		.where("p.user_id", userId)
		.first();
}

export async function skyProfileSet(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIModalSubmitInteraction,
	data: SkyProfileSetData,
	options: SkyProfileShowEditOptions = {},
) {
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("icon", "banner")
		.where({ user_id: data.user_id })
		.first();

	if (skyProfilePacket) {
		const skyProfileDeleteData = [];

		if (data.icon === null && skyProfilePacket.icon) {
			skyProfileDeleteData.push({ Key: skyProfileIconRoute(data.user_id, skyProfilePacket.icon) });
		}

		if (data.banner === null && skyProfilePacket.banner) {
			skyProfileDeleteData.push({
				Key: skyProfileBannerRoute(data.user_id, skyProfilePacket.banner),
			});
		}

		if (skyProfileDeleteData.length > 0) {
			await S3Client.send(
				new DeleteObjectsCommand({ Bucket: CDN_BUCKET, Delete: { Objects: skyProfileDeleteData } }),
			);
		}
	}

	await pg<SkyProfilePacket>(Table.Profiles).insert(data).onConflict("user_id").merge();
	await skyProfileShowEdit(interaction, options);
}

export async function skyProfileSetAsset(
	interaction: APIChatInputApplicationCommandInteraction | APIModalSubmitInteraction,
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

		if (skyProfilePacket.banner && type === AssetType.Banner) {
			await S3Client.send(
				new DeleteObjectCommand({
					Bucket: CDN_BUCKET,
					Key: skyProfileBannerRoute(invoker.id, skyProfilePacket.banner),
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
					: skyProfileBannerRoute(invoker.id, hashedBuffer),
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
					content: t("sky-profile.unknown-profile-edit-type", {
						lng: interaction.locale,
						ns: "features",
					}),
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
		case SkyProfileEditType.Icon: {
			await skyProfileShowIconModal(interaction);
			return;
		}
		case SkyProfileEditType.Banner: {
			await skyProfileShowBannerModal(interaction);
			return;
		}
		case SkyProfileEditType.WingedLight: {
			await skyProfileShowWingedLightSelectMenu(interaction);
			return;
		}
		case SkyProfileEditType.Hangout: {
			await skyProfileShowHangoutModal(interaction);
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
						content: t("sky-profile.unknown-profile-reset-type", {
							lng: interaction.locale,
							ns: "features",
						}),
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
			case SkyProfileResetType.Banner:
				data.banner = null;
				continue;
			case SkyProfileResetType.WingedLight:
				data.winged_light = null;
				continue;
			case SkyProfileResetType.Country:
				data.country = null;
				continue;
			case SkyProfileResetType.Hangout:
				data.hangout = null;
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

interface SkyProfileShowEditOptions {
	reply?: boolean;
	editReply?: boolean;
}

export async function skyProfileShowEdit(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction
		| APIModalSubmitInteraction,
	{ reply, editReply }: SkyProfileShowEditOptions = {},
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);
	const data = await skyProfileFetch(invoker.id);

	const components: APIMessageTopLevelComponent[] = [];
	const containerComponents: APIComponentInContainer[] = [];

	if (data) {
		components.push(...(await skyProfileComponents(interaction, data)));
		const missing = skyProfileMissingData(data, locale);

		if (missing.length > 0) {
			containerComponents.push({ type: ComponentType.TextDisplay, content: missing.join("\n") });
		}
	} else {
		components.push({
			type: ComponentType.TextDisplay,
			content: t("sky-profile.no-sky-profile-edit", {
				lng: locale,
				ns: "features",
				url: SKY_PROFILES_URL,
			}),
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.StringSelect,
				custom_id: CustomId.SkyProfileEdit,
				max_values: 1,
				min_values: 1,
				options: SKY_PROFILE_EDIT_TYPE_VALUES.map((skyProfileEditType) => ({
					description: t(`sky-profile.edit-type-description.${skyProfileEditType}`, {
						lng: locale,
						ns: "features",
					}),
					label: t(`sky-profile.edit-type-label.${skyProfileEditType}`, {
						lng: locale,
						ns: "features",
					}),
					value: skyProfileEditType.toString(),
				})),
				placeholder: t("sky-profile.edit-placeholder", { lng: locale, ns: "features" }),
			},
		],
	});

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: CustomId.SkyProfileViewReset,
				label: t("sky-profile.edit-reset-button-label", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
		],
	});

	const baseReplyOptions:
		| Parameters<InteractionsAPI["editReply"]>[2]
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [...components, { type: ComponentType.Container, components: containerComponents }],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (reply) {
		await client.api.interactions.reply(interaction.id, interaction.token, baseReplyOptions);
		return;
	}

	if (editReply) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, baseReplyOptions);
		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, baseReplyOptions);
}

export async function skyProfileDelete(userId: Snowflake) {
	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("icon", "banner")
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

	if (skyProfilePacket.banner) {
		profileDeleteData.push({
			Key: skyProfileBannerRoute(userId, skyProfilePacket.banner),
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
			content: t("sky-profile.no-sky-profile-application", {
				lng: interaction.locale,
				ns: "features",
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	if (hide) {
		await skyProfileExploreProfile(interaction, user?.id ?? invoker.id);
	} else {
		const data = await skyProfileFetch(user?.id ?? invoker.id);

		if (!data) {
			const userIsInvoker = !user || user.id === invoker.id;

			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: userIsInvoker
					? t("sky-profile.no-sky-profile-invoker", { lng: locale, ns: "features" })
					: t("sky-profile.no-sky-profile-other", {
							lng: locale,
							ns: "features",
							user: `<@${user.id}>`,
						}),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.reply(interaction.id, interaction.token, {
			allowed_mentions: { parse: [] },
			components: await skyProfileComponents(interaction, data),
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

	const limit = MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT * SKY_PROFILE_EXPLORERS.length;

	const offset = (page - 1) * limit;

	const skyProfilePackets = await pg<SkyProfilePacket>(Table.Profiles)
		.whereNotNull("name")
		.orderBy("name", "asc")
		.orderBy("user_id", "asc")
		.limit(limit + 1)
		.offset(offset);

	if (skyProfilePackets.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-explore", { lng: locale, ns: "features" }),
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
			content: `## ${t("sky-profile.explore-title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("sky-profile.explore-description", {
				lng: locale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
		},
	];

	for (const [index, customId] of SKY_PROFILE_EXPLORERS.entries()) {
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
				custom_id: `${CustomId.SkyProfileExplorerBack}§${page - 1}`,
				disabled: !hasPreviousPage,
				emoji: { name: "⬅️" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.SkyProfileExplorerNext}§${page + 1}`,
				disabled: !hasNextPage,
				emoji: { name: "➡️" },
				label: t("navigation-next", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.SkyProfileExplorerViewLikes}§1`,
				disabled: skyProfileLikesPackets.length === 0,
				emoji: { name: "🌐" },
				label: t("sky-profile.explore-likes-button", { lng: locale, ns: "features" }),
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
	const data = await skyProfileFetch(userId);

	if (!data) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-explore-user", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const name = data.name!;
	const previous = await skyProfileExploreProfilePreviousRow(name, userId);
	const next = await skyProfileExploreProfileNextRow(name, userId);
	const ownSkyProfile = invoker.id === data.user_id;

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
			...(await skyProfileComponents(interaction, data)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `<@${data.user_id}>`,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerProfileBack}§${previous?.user_id}`,
								disabled: !previous,
								emoji: { name: "⬅️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerProfileNext}§${next?.user_id}`,
								disabled: !next,
								emoji: { name: "➡️" },
								label: t("navigation-next", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerProfileLike}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Heart,
								label: isLiked
									? t("sky-profile.explore-profile-like-button-unlike", {
											lng: locale,
											ns: "features",
										})
									: t("sky-profile.explore-profile-like-button-like", {
											lng: locale,
											ns: "features",
										}),
								style: isLiked ? ButtonStyle.Secondary : ButtonStyle.Success,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileViewExplorer}§1`,
								emoji: { name: "🌐" },
								label: t("sky-profile.explore-profile-explore-button", {
									lng: locale,
									ns: "features",
								}),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerProfileReport}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: t("sky-profile.explore-profile-report-button", {
									lng: locale,
									ns: "features",
								}),
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

	const limit = MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT * SKY_PROFILE_EXPLORER_LIKES.length;
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
			content: t("sky-profile.explore-likes-none", { lng: locale, ns: "features" }),
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
			content: `## ${t("sky-profile.explore-title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("sky-profile.explore-likes-description", {
				lng: locale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
			}),
		},
	];

	for (const [index, customId] of SKY_PROFILE_EXPLORER_LIKES.entries()) {
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
				custom_id: `${CustomId.SkyProfileExplorerLikesBack}§${page - 1}`,
				disabled: !hasPreviousPage,
				emoji: { name: "⬅️" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.SkyProfileExplorerLikesNext}§${page + 1}`,
				disabled: !hasNextPage,
				emoji: { name: "➡️" },
				label: t("navigation-next", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.SkyProfileViewExplorer}§1`,
				emoji: { name: "🌐" },
				label: t("sky-profile.explore-profile-explore-button", { lng: locale, ns: "features" }),
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

	const data = await skyProfileFetch(userId);

	if (!data) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-explore-likes", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const name = data.name!;
	const previous = await skyProfileExploreLikedProfilePreviousRow(name, invoker.id, userId);
	const next = await skyProfileExploreLikedProfileNextRow(name, invoker.id, userId);
	const ownSkyProfile = invoker.id === data.user_id;

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
			...(await skyProfileComponents(interaction, data)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `<@${data.user_id}>`,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerLikesProfileBack}§${previous?.user_id}`,
								disabled: !previous,
								emoji: { name: "⬅️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerLikesProfileNext}§${next?.user_id}`,
								disabled: !next,
								emoji: { name: "➡️" },
								label: t("navigation-next", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerLikesProfileLike}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Heart,
								label: isLiked
									? t("sky-profile.explore-profile-like-button-unlike", {
											lng: locale,
											ns: "features",
										})
									: t("sky-profile.explore-profile-like-button-like", {
											lng: locale,
											ns: "features",
										}),
								style: isLiked ? ButtonStyle.Secondary : ButtonStyle.Success,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerViewLikes}§1`,
								emoji: { name: "🌐" },
								label: t("sky-profile.explore-likes-button", { lng: locale, ns: "features" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerLikesProfileReport}§${userId}`,
								disabled: ownSkyProfile,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: t("sky-profile.explore-profile-report-button", {
									lng: locale,
									ns: "features",
								}),
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
	const { locale } = interaction;
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-sky-kid", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const invoker = interactionInvoker(interaction);

	if (invoker.id === skyProfilePacket.user_id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.like-own-profile", { lng: locale, ns: "features" }),
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
	const { locale } = interaction;
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
	const data = await skyProfileFetch(userId);

	if (!data) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-sky-kid", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			...(await skyProfileComponents(interaction, data)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("sky-profile.report-description", { lng: locale, ns: "features" }),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: `${fromLike ? CustomId.SkyProfileExplorerLikesViewProfile : CustomId.SkyProfileExplorerViewProfile}§${userId}`,
								emoji: { name: "⬅️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
							{
								type: ComponentType.Button,
								custom_id: `${CustomId.SkyProfileExplorerConfirmReport}§${userId}`,
								emoji: MISCELLANEOUS_EMOJIS.Report,
								label: t("sky-profile.report-confirm-button", { lng: locale, ns: "features" }),
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
	const { locale } = interaction;
	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: userId })
		.first();

	if (!skyProfilePacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-sky-kid", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.SkyProfileReportModalReason,
					max_length: SKY_PROFILE_REPORT_MAXIMUM_LENGTH,
					min_length: SKY_PROFILE_REPORT_MINIMUM_LENGTH,
					style: TextInputStyle.Paragraph,
				},
				label: t("sky-profile.report-modal-label-reason-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.report-modal-label-reason-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: `${CustomId.SkyProfileReportModal}§${userId}`,
		title: t("sky-profile.report-modal-title", { lng: locale, ns: "features" }),
	});
}

export async function skyProfileSendReport(interaction: APIModalSubmitInteraction) {
	const { locale } = interaction;
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the guild of the Sky profile reports channel.");

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.TextDisplay,
					content: t("sky-profile.report-submission", { lng: locale, ns: "features" }),
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
					content: t("sky-profile.report-submission", { lng: locale, ns: "features" }),
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
					content: t("sky-profile.report-submission", { lng: locale, ns: "features" }),
				},
			],
		});

		return;
	}

	const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
	const data = await skyProfileFetch(userId);

	if (!data) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-sky-kid", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data);
	const text = components.getTextInputValue(CustomId.SkyProfileReportModalReason);
	const invoker = interactionInvoker(interaction);

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { parse: [] },
		components: [
			{
				type: ComponentType.TextDisplay,
				content: `Report by ${userLogFormat(invoker)} against <@${data.user_id}>:\n>>> ${text}`,
			},
			...(await skyProfileComponents(interaction, data)),
		],
		flags: MessageFlags.IsComponentsV2,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.TextDisplay,
				content: t("sky-profile.report-submission", { lng: locale, ns: "features" }),
			},
		],
	});
}

async function skyProfileShowNameModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: CustomId.SkyProfileNameModalName,
		max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
		min_length: 1,
		required: true,
		style: TextInputStyle.Short,
	};

	if (skyProfilePacket?.name) {
		textInput.value = skyProfilePacket.name;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: textInput,
				label: t("sky-profile.edit-modal-label-name-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-name-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.SkyProfileNameModal,
		title: t("sky-profile.edit-modal-title", { lng: locale, ns: "features" }),
	});
}

async function skyProfileShowDescriptionModal(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: CustomId.SkyProfileDescriptionModalDescription,
		max_length: SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
		min_length: 1,
		required: true,
		style: TextInputStyle.Paragraph,
	};

	if (skyProfilePacket?.description) {
		textInput.value = skyProfilePacket.description;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: textInput,
				label: t("sky-profile.edit-modal-label-description-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-description-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.SkyProfileDescriptionModal,
		title: t("sky-profile.edit-modal-title", { lng: locale, ns: "features" }),
	});
}

async function skyProfileShowIconModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const { locale } = interaction;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.SkyProfileIconModalIcon,
					max_values: 1,
					min_values: 1,
					required: false,
				},
				label: t("sky-profile.edit-modal-label-icon-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-icon-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.SkyProfileIconModal,
		title: t("sky-profile.edit-modal-title", { lng: locale, ns: "features" }),
	});
}

async function skyProfileShowBannerModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const { locale } = interaction;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.SkyProfileBannerModalBanner,
					max_values: 1,
					min_values: 1,
					required: false,
				},
				label: t("sky-profile.edit-modal-label-banner-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-banner-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.SkyProfileBannerModal,
		title: t("sky-profile.edit-modal-title", { lng: locale, ns: "features" }),
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
						content: t("sky-profile.edit-winged-light-description", {
							lng: locale,
							ns: "features",
						}),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CustomId.SkyProfileWingedLight,
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
								placeholder: t("sky-profile.edit-winged-light-string-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: CustomId.SkyProfileViewEdit,
								emoji: { name: "⏮️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Primary,
							},
						],
					},
				],
			},
		],
	});
}

async function skyProfileShowHangoutModal(interaction: APIMessageComponentSelectMenuInteraction) {
	const { locale } = interaction;
	const invoker = interactionInvoker(interaction);

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.where({ user_id: invoker.id })
		.first();

	const textInput: APITextInputComponent = {
		type: ComponentType.TextInput,
		custom_id: CustomId.SkyProfileHangoutModalHangout,
		max_length: SKY_PROFILE_MAXIMUM_HANGOUT_LENGTH,
		min_length: SKY_PROFILE_MINIMUM_HANGOUT_LENGTH,
		required: true,
		style: TextInputStyle.Short,
	};

	if (skyProfilePacket?.hangout) {
		textInput.value = skyProfilePacket.hangout;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Label,
				component: textInput,
				label: t("sky-profile.edit-modal-label-hangout-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-hangout-description", {
					lng: locale,
					ns: "features",
				}),
			},
		],
		custom_id: CustomId.SkyProfileHangoutModal,
		title: t("sky-profile.edit-modal-title", { lng: locale, ns: "features" }),
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
					custom_id: CustomId.SkyProfileSeasons1,
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
					placeholder: t("sky-profile.edit-seasons-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
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
					custom_id: CustomId.SkyProfileSeasons2,
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
					placeholder: t("sky-profile.edit-seasons-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		});
	}

	components.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: CustomId.SkyProfileViewEdit,
				emoji: { name: "⏮️" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Primary,
			},
		],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [{ type: ComponentType.Container, components }],
	});
}

async function skyProfileShowPlatformsSelectMenu(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	const { locale } = interaction;
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
								custom_id: CustomId.SkyProfilePlatforms,
								max_values: PLATFORM_ID_VALUES.length,
								min_values: 0,
								options: PLATFORM_ID_VALUES.map((platformId) => ({
									default: currentPlatforms?.includes(platformId) ?? false,
									emoji: PlatformIdToEmoji[platformId],
									label: t(`sky-profile.platform-label.${platformId}`, {
										lng: locale,
										ns: "features",
									}),
									value: String(platformId),
								})),
								placeholder: t("sky-profile.edit-platforms-string-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: CustomId.SkyProfileViewEdit,
								emoji: { name: "⏮️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Primary,
							},
						],
					},
				],
			},
		],
	});
}

export function skyProfileSetName(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);

	// Mobile may use new lines.
	const name = components.getTextInputValue(CustomId.SkyProfileNameModalName).replace(/\n/g, " ");

	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, name });
}

export function skyProfileSetDescription(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);
	const description = components.getTextInputValue(CustomId.SkyProfileDescriptionModalDescription);
	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, description });
}

export async function skyProfileSetIcon(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);
	const icon = components.getFileUploadValues(CustomId.SkyProfileIconModalIcon)[0]!;
	await client.api.interactions.deferMessageUpdate(interaction.id, interaction.token);

	if (!(await validateAttachment(interaction, icon))) {
		return;
	}

	await skyProfileSet(
		interaction,
		{
			user_id: interactionInvoker(interaction).id,
			icon: await skyProfileSetAsset(interaction, icon, AssetType.Icon),
		},
		{ editReply: true },
	);
}

export async function skyProfileSetBanner(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);
	const banner = components.getFileUploadValues(CustomId.SkyProfileBannerModalBanner)[0]!;
	await client.api.interactions.deferMessageUpdate(interaction.id, interaction.token);

	if (!(await validateAttachment(interaction, banner))) {
		return;
	}

	await skyProfileSet(
		interaction,
		{
			user_id: interactionInvoker(interaction).id,
			banner: await skyProfileSetAsset(interaction, banner, AssetType.Banner),
		},
		{ editReply: true },
	);
}

export async function skyProfileSetWingedLight(
	interaction: APIMessageComponentSelectMenuInteraction,
) {
	await skyProfileSet(interaction, {
		user_id: interactionInvoker(interaction).id,
		winged_light: Number(interaction.data.values[0]) as SkyProfileWingedLightTypes,
	});
}

export function skyProfileSetHangout(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);

	// Mobile may use new lines.
	const hangout = components
		.getTextInputValue(CustomId.SkyProfileHangoutModalHangout)
		.replace(/\n/g, " ");

	return skyProfileSet(interaction, { user_id: interactionInvoker(interaction).id, hangout });
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
			content: t("sky-profile.edit-platform-invalid", { lng: interaction.locale, ns: "features" }),
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
	const { locale } = interaction;
	const data = await skyProfileFetch(interactionInvoker(interaction).id);

	if (!data) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("sky-profile.no-sky-profile-reset", { lng: locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			...(await skyProfileComponents(interaction, data)),
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CustomId.SkyProfileReset,
								max_values: SKY_PROFILE_RESET_TYPE_VALUES.length,
								min_values: 1,
								options: SKY_PROFILE_RESET_TYPE_VALUES.map((skyProfileResetType) => ({
									label: t(`sky-profile.reset-type-label.${skyProfileResetType}`, {
										lng: locale,
										ns: "features",
									}),
									value: skyProfileResetType.toString(),
								})),
								placeholder: t("sky-profile.reset-string-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.Button,
								custom_id: CustomId.SkyProfileViewEdit,
								emoji: { name: "⏮️" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Primary,
							},
						],
					},
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
	data: SkyProfileData,
): Promise<APIMessageTopLevelComponent[]> {
	const { locale, guild_id: guildId } = interaction;

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
		hangout,
		catalogue_progression: catalogueProgression,
		guess_rank: guessRank,
		crowdin_user_id,
		supporter,
		artist,
	} = data;

	const components: APIMessageTopLevelComponent[] = [];
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
				`**${t("sky-profile.country", { lng: locale, ns: "features" })}** ${CountryToEmoji[country]} ${new Intl.DisplayNames(locale, { type: "region", style: "long" }).of(country)!}`,
			);
		} else {
			pino.error(interaction, `Invalid country code in Sky Profile: ${country}`);
		}
	}

	if (typeof wingedLight === "number") {
		if (wingedLight === SkyProfileWingedLightType.Capeless) {
			miscellaneous.push(
				`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${t("sky-profile.winged-light-capeless", { lng: locale, ns: "features" })}`,
			);
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
					`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${
						count === MAXIMUM_WINGED_LIGHT
							? `${count} (${t("sky-profile.winged-light-max", { lng: locale, ns: "features" })} ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
							: count.toString()
					}`,
				);
			}
		}
	}

	if (typeof spirit === "number") {
		miscellaneous.push(
			`**${t("sky-profile.favourite-spirit", { lng: locale, ns: "features" })}** ${t(`spirits.${spirit}`, { lng: locale, ns: "general" })}`,
		);
	}

	if (hangout) {
		miscellaneous.push(
			`**${t("sky-profile.favourite-hangout", { lng: locale, ns: "features" })}** ${hangout}`,
		);
	}

	if (catalogueProgression) {
		const catalogue = await fetchCatalogue(userId);
		const allProgressResult = allProgress(catalogue?.data, true) ?? 0;

		miscellaneous.push(
			`**${t("sky-profile.catalogue-progression", { lng: locale, ns: "features" })}** ${allProgressResult}%`,
		);
	}

	if (guessRank) {
		const spiritsRanking = await findUser(userId, GuessType.Spirits);
		const spiritsHardRanking = await findUser(userId, GuessType.SpiritsHard);
		const eventsRanking = await findUser(userId, GuessType.Events);

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-spirits", { lng: locale, ns: "features" })}** ${spiritsRanking ? `#${spiritsRanking.rank}` : t("sky-profile.guess-rank-unranked", { lng: locale, ns: "features" })}`,
		);

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-spirits-hard", { lng: locale, ns: "features" })}** ${spiritsHardRanking ? `#${spiritsHardRanking.rank}` : t("sky-profile.guess-rank-unranked", { lng: locale, ns: "features" })}`,
		);

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-events", { lng: locale, ns: "features" })}** ${eventsRanking ? `#${eventsRanking.rank}` : t("sky-profile.guess-rank-unranked", { lng: locale, ns: "features" })}`,
		);
	}

	if (miscellaneous.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: miscellaneous.join("\n"),
		});
	}

	if (description || miscellaneous.length > 0) {
		containerComponents.push({
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		});
	}

	const hearts = await totalReceived(data.user_id);

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `-# ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: hearts })}`,
	});

	components.push({
		type: ComponentType.Container,
		components: containerComponents,
	});

	const userDataContent = [];
	const suffix = guildId === SUPPORT_SERVER_GUILD_ID ? "support-server" : "other-server";

	if (crowdin_user_id) {
		userDataContent.push(
			t(`sky-profile.crowdin-${suffix}`, {
				lng: locale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Crowdin),
				role: `<@&${TRANSLATOR_ROLE_ID}>`,
				url: CROWDIN_URL,
			}),
		);
	}

	if (artist) {
		userDataContent.push(
			t(`sky-profile.artist-${suffix}`, {
				lng: locale,
				ns: "features",
				emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Dye),
				role: `<@&${ARTIST_ROLE_ID}>`,
			}),
		);
	}

	if (supporter) {
		userDataContent.push(
			t(`sky-profile.supporter-${suffix}`, {
				lng: locale,
				ns: "features",
				emoji1: formatEmoji(MISCELLANEOUS_EMOJIS.Heart),
				role: `<@&${SUPPORTER_ROLE_ID}>`,
				emoji2: formatEmoji(EMOTE_EMOJIS.Bow),
			}),
		);
	}

	if (userDataContent.length > 0) {
		components.push({
			type: ComponentType.Container,
			components: [{ type: ComponentType.TextDisplay, content: userDataContent.join("\n") }],
		});
	}

	return components;
}

function skyProfileMissingData(skyProfilePacket: SkyProfilePacket, locale: Locale) {
	const {
		name,
		icon,
		banner,
		description,
		country,
		winged_light: wingedLight,
		seasons,
		platform,
		spirit,
		hangout,
		catalogue_progression: catalogueProgression,
		guess_rank: guessRank,
	} = skyProfilePacket;

	const missing = [];
	const skyProfileCommandId = COMMAND_CACHE.get(t("sky-profile.command-name", { ns: "commands" }));

	let suffix: "mention" | "text";
	const options: Parameters<typeof t>[1] = { lng: locale, ns: "features" };

	if (skyProfileCommandId) {
		suffix = "mention";

		options.mention = chatInputApplicationCommandMention(
			skyProfileCommandId,
			t("sky-profile.command-name", { ns: "commands" }),
			t("sky-profile.edit.command-name", { ns: "commands" }),
		);
	} else {
		suffix = "text";
	}

	if (!name) {
		missing.push(`- ${t("sky-profile.missing-name", options)}`);
	}

	if (!description) {
		missing.push(`- ${t("sky-profile.missing-description", options)}`);
	}

	if (!icon) {
		missing.push(`- ${t("sky-profile.missing-icon", options)}`);
	}

	if (!banner) {
		missing.push(
			`- ${t("sky-profile.missing-banner", { ...options, url: `${SKY_PROFILES_URL}/${skyProfilePacket.user_id}` })}`,
		);
	}

	if (!country) {
		missing.push(`- ${t(`sky-profile.missing-country-${suffix}`, options)}`);
	}

	if (wingedLight === null) {
		missing.push(`- ${t("sky-profile.missing-winged-light", options)}`);
	}

	if (!seasons) {
		missing.push(`- ${t("sky-profile.missing-seasons", options)}`);
	}

	if (!platform) {
		missing.push(`- ${t("sky-profile.missing-platforms", options)}`);
	}

	if (spirit === null) {
		missing.push(`- ${t(`sky-profile.missing-spirit-${suffix}`, options)}`);
	}

	if (!hangout) {
		missing.push(`- ${t("sky-profile.missing-hangout", options)}`);
	}

	if (catalogueProgression === null) {
		missing.push(`- ${t("sky-profile.missing-catalogue-progression", options)}`);
	}

	if (guessRank === null) {
		missing.push(`- ${t("sky-profile.missing-guess-rank", options)}`);
	}

	return missing;
}

function skyProfileBannerRoute(userId: Snowflake, hash: string) {
	return `sky_profiles/banners/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

function skyProfileIconRoute(userId: Snowflake, hash: string) {
	return `sky_profiles/icons/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
}

export function skyProfileIconURL(userId: Snowflake, icon: string) {
	return new URL(skyProfileIconRoute(userId, icon), CDN_URL).href;
}
