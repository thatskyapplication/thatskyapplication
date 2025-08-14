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
	type APIComponentInMessageActionRow,
	type APIEmbed,
	type APIEmbedAuthor,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitInteraction,
	type APISelectMenuComponent,
	type APISelectMenuOption,
	type APITextInputComponent,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandOptionType,
	ButtonStyle,
	ChannelType,
	ComponentType,
	type InteractionsAPI,
	InteractionType,
	Locale,
	type Snowflake as LooseSnowflake,
	MessageFlags,
	PermissionFlagsBits,
	TextInputStyle,
} from "@discordjs/core";
import {
	COUNTRY_VALUES,
	type Country,
	CountryToEmoji,
	type Emoji,
	formatEmoji,
	formatEmojiURL,
	GuessDifficultyLevel,
	GuessDifficultyLevelToName,
	isCountry,
	isPlatformId,
	isSeasonId,
	MAXIMUM_WINGED_LIGHT,
	PLATFORM_ID_VALUES,
	PlatformId,
	type PlatformIds,
	type SeasonIds,
	SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES,
	type SkyProfilePacket,
	SkyProfileWingedLightType,
	type SkyProfileWingedLightTypes,
	type Snowflake,
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
import { allProgress, fetchCatalogue } from "../features/catalogue.js";
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
	DEFAULT_EMBED_COLOUR,
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

interface SkyProfileLikesPacket {
	user_id: LooseSnowflake;
	target_id: LooseSnowflake;
}

interface ProfileData {
	userId: SkyProfilePacket["user_id"];
	name: SkyProfilePacket["name"];
	icon: SkyProfilePacket["icon"];
	thumbnail: SkyProfilePacket["thumbnail"];
	description: SkyProfilePacket["description"];
	country: SkyProfilePacket["country"];
	wingedLight: SkyProfilePacket["winged_light"];
	seasons: SeasonIds[] | null;
	platform: PlatformIds[] | null;
	spirit: SkyProfilePacket["spirit"];
	spot: SkyProfilePacket["spot"];
	catalogueProgression: SkyProfilePacket["catalogue_progression"];
	guessRank: SkyProfilePacket["guess_rank"];
}

export interface ProfileSetData {
	name?: string | null;
	icon?: string | null;
	thumbnail?: string | null;
	description?: string | null;
	country?: Country | null;
	winged_light?: SkyProfileWingedLightTypes | null;
	seasons?: SeasonIds[] | null;
	platform?: PlatformIds[] | null;
	spirit?: number | null;
	spot?: string | null;
	catalogue_progression?: boolean | null;
	guess_rank?: boolean | null;
}

type ProfilePatchData = Omit<SkyProfilePacket, "user_id">;

enum ProfileInteractiveEditType {
	Name = "Name",
	Description = "Description",
	WingedLight = "Winged Light",
	Spot = "Spot",
	Seasons = "Seasons",
	Platforms = "Platforms",
	CatalogueProgression = "Catalogue Progression",
	GuessRank = "Guess Rank",
}

const PROFILE_INTERACTIVE_EDIT_TYPE_VALUES = Object.values(ProfileInteractiveEditType);

const ProfileInteractiveEditTypeToDescription = {
	[ProfileInteractiveEditType.Name]: "What name do you go by?",
	[ProfileInteractiveEditType.Description]: "What's your story?",
	[ProfileInteractiveEditType.WingedLight]: "What's your maximum winged light?",
	[ProfileInteractiveEditType.Spot]: "Where do you hang out?",
	[ProfileInteractiveEditType.Seasons]: "What seasons have you played in?",
	[ProfileInteractiveEditType.Platforms]: "What platforms do you play on?",
	[ProfileInteractiveEditType.CatalogueProgression]: "Toggle showing your catalogue progression?",
	[ProfileInteractiveEditType.GuessRank]: "Toggle showing your guessing game rank?",
} as const satisfies Readonly<Record<ProfileInteractiveEditType, string>>;

function isProfileInteractiveEditType(value: unknown): value is ProfileInteractiveEditType {
	return PROFILE_INTERACTIVE_EDIT_TYPE_VALUES.includes(value as ProfileInteractiveEditType);
}

enum ProfileInteractiveResetType {
	Description = "Description",
	Icon = "Icon",
	Thumbnail = "Thumbnail",
	WingedLight = "Winged Light",
	Country = "Country",
	Spot = "Spot",
	Seasons = "Seasons",
	Platforms = "Platforms",
	Spirit = "Spirit",
	CatalogueProgression = "Catalogue Progression",
	GuessRank = "Guess Rank",
}

const PROFILE_INTERACTIVE_RESET_TYPE_VALUES = Object.values(ProfileInteractiveResetType);

function isProfileInteractiveResetType(value: unknown): value is ProfileInteractiveResetType {
	return PROFILE_INTERACTIVE_RESET_TYPE_VALUES.includes(value as ProfileInteractiveResetType);
}

const PlatformIdToString = {
	[PlatformId.iOS]: "iOS",
	[PlatformId.Android]: "Android",
	[PlatformId.Mac]: "Mac",
	[PlatformId.NintendoSwitch]: "Nintendo Switch",
	[PlatformId.PlayStation]: "PlayStation",
	[PlatformId.Steam]: "Steam",
} as const satisfies Readonly<Record<PlatformIds, string>>;

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

const SKY_PROFILE_EDIT_OPTIONS_ACTION_ROW: APIActionRowComponent<APISelectMenuComponent> = {
	type: ComponentType.ActionRow,
	components: [
		{
			type: ComponentType.StringSelect,
			custom_id: SKY_PROFILE_EDIT_CUSTOM_ID,
			max_values: 1,
			min_values: 1,
			options: PROFILE_INTERACTIVE_EDIT_TYPE_VALUES.map((profileInteractiveEditType) => ({
				description: ProfileInteractiveEditTypeToDescription[profileInteractiveEditType],
				label: profileInteractiveEditType,
				value: profileInteractiveEditType,
			})),
			placeholder: "What do you want to edit?",
		},
	],
} as const;

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

const SKY_PROFILE_RESET_OPTIONS = PROFILE_INTERACTIVE_RESET_TYPE_VALUES.map(
	(profileInteractiveResetType) => ({
		label: profileInteractiveResetType,
		value: profileInteractiveResetType,
	}),
);

const SKY_PROFILE_RESET_OPTIONS_ACTION_ROW: APIActionRowComponent<APISelectMenuComponent> = {
	type: ComponentType.ActionRow,
	components: [
		{
			type: ComponentType.StringSelect,
			custom_id: SKY_PROFILE_RESET_CUSTOM_ID,
			max_values: SKY_PROFILE_RESET_OPTIONS.length,
			min_values: 1,
			options: SKY_PROFILE_RESET_OPTIONS,
			placeholder: "What do you wish to reset?",
		},
	],
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
	profiles: Profile[],
	indexStart: number,
	skyProfileLikesPackets?: SkyProfileLikesPacket[],
) {
	const maximumIndex = MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT + indexStart;

	return profiles.slice(indexStart, maximumIndex).map((profile) => {
		const stringSelectMenuOption: APISelectMenuOption = {
			label: profile.name ?? SKY_PROFILE_UNKNOWN_NAME,
			value: profile.userId,
		};

		if (
			skyProfileLikesPackets?.some(
				(skyProfileLikesPacket) => skyProfileLikesPacket.target_id === profile.userId,
			)
		) {
			stringSelectMenuOption.emoji = MISCELLANEOUS_EMOJIS.Heart;
		}

		let { description } = profile;

		if (description) {
			description =
				description.length >= SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH
					? `${description.slice(0, SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH - 3)}...`
					: description;

			stringSelectMenuOption.description = description;
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

export default class Profile {
	public readonly userId: ProfileData["userId"];

	public name!: ProfileData["name"];

	public icon!: ProfileData["icon"];

	public thumbnail!: ProfileData["thumbnail"];

	public description!: ProfileData["description"];

	public country!: ProfileData["country"];

	public wingedLight!: ProfileData["wingedLight"];

	public seasons!: ProfileData["seasons"];

	public platform!: ProfileData["platform"];

	public spirit!: SkyProfilePacket["spirit"];

	public spot!: SkyProfilePacket["spot"];

	public catalogueProgression!: SkyProfilePacket["catalogue_progression"];

	public guessRank!: SkyProfilePacket["guess_rank"];

	public constructor(profile: SkyProfilePacket) {
		this.userId = profile.user_id;
		this.patch(profile);
	}

	private patch(data: ProfilePatchData) {
		this.name = data.name;
		this.icon = data.icon;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
		this.country = data.country;
		this.wingedLight = data.winged_light;
		this.seasons = data.seasons?.filter((seasonId) => isSeasonId(seasonId)) ?? null;
		this.platform = data.platform?.filter((platformId) => isPlatformId(platformId)) ?? null;
		this.spirit = data.spirit;
		this.spot = data.spot;
		this.catalogueProgression = data.catalogue_progression;
		this.guessRank = data.guess_rank;
	}

	public static async fetch(userId: LooseSnowflake) {
		const [SkyProfilePacket] = await pg<SkyProfilePacket>(Table.Profiles).where("user_id", userId);

		if (!SkyProfilePacket) {
			throw new Error("No profile found.");
		}

		return new this(SkyProfilePacket);
	}

	public static async set(
		interaction:
			| APIChatInputApplicationCommandInteraction
			| APIMessageComponentSelectMenuInteraction
			| APIModalSubmitInteraction,
		data: ProfileSetData,
		deferred = false,
	) {
		const invoker = interactionInvoker(interaction);
		let profile = await this.fetch(invoker.id).catch(() => null);

		if (profile) {
			const [SkyProfilePacket] = await pg<SkyProfilePacket>(Table.Profiles)
				.update(data)
				.where({ user_id: profile.userId })
				.returning("*");

			profile.patch(SkyProfilePacket!);
		} else {
			const [SkyProfilePacket] = await pg<SkyProfilePacket>(Table.Profiles).insert(
				{
					...data,
					user_id: invoker.id as Snowflake,
				},
				"*",
			);

			profile = new this(SkyProfilePacket!);
		}

		await this.showEdit(interaction, deferred);
	}

	public static async setAsset(
		interaction: APIChatInputApplicationCommandInteraction,
		attachment: APIAttachment,
		type: AssetType,
	) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		// Delete the old asset if it exists.
		if (profile) {
			if (profile.icon && type === AssetType.Icon) {
				await S3Client.send(
					new DeleteObjectCommand({
						Bucket: CDN_BUCKET,
						Key: Profile.iconRoute(invoker.id, profile.icon),
					}),
				);
			}

			if (profile.thumbnail && type === AssetType.Thumbnail) {
				await S3Client.send(
					new DeleteObjectCommand({
						Bucket: CDN_BUCKET,
						Key: Profile.thumbnailRoute(invoker.id, profile.thumbnail),
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
						? Profile.iconRoute(invoker.id, hashedBuffer)
						: Profile.thumbnailRoute(invoker.id, hashedBuffer),
				Body: buffer,
			}),
		);

		return hashedBuffer;
	}

	public static async edit(interaction: APIMessageComponentSelectMenuInteraction) {
		const profileInteractiveEditType = interaction.data.values[0];

		if (!isProfileInteractiveEditType(profileInteractiveEditType)) {
			pino.warn(interaction, "Received an unknown profile edit type.");

			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: "Unknown profile edit type. Please try again!",
				embeds: [],
			});

			return;
		}

		switch (profileInteractiveEditType) {
			case ProfileInteractiveEditType.Name: {
				await this.showNameModal(interaction);
				return;
			}
			case ProfileInteractiveEditType.Description: {
				await this.showDescriptionModal(interaction);
				return;
			}
			case ProfileInteractiveEditType.WingedLight: {
				await this.showWingedLightSelectMenu(interaction);
				return;
			}
			case ProfileInteractiveEditType.Spot: {
				await this.showSpotModal(interaction);
				return;
			}
			case ProfileInteractiveEditType.Seasons: {
				await this.showSeasonsSelectMenu(interaction);
				return;
			}
			case ProfileInteractiveEditType.Platforms: {
				await this.showPlatformsSelectMenu(interaction);
				return;
			}
			case ProfileInteractiveEditType.CatalogueProgression: {
				await this.setCatalogueProgression(interaction);
				return;
			}
			case ProfileInteractiveEditType.GuessRank: {
				await this.setGuessRank(interaction);
				return;
			}
		}
	}

	public static async reset(interaction: APIMessageComponentSelectMenuInteraction) {
		const profileInteractiveResetTypes = interaction.data.values;

		if (
			!profileInteractiveResetTypes.every((profileInteractiveResetType) =>
				isProfileInteractiveResetType(profileInteractiveResetType),
			)
		) {
			pino.warn(interaction, "Received an unknown profile reset type.");

			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: "Unknown profile edit type. Please try again!",
				embeds: [],
			});

			return;
		}

		const data: ProfileSetData = {};

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Description)) {
			data.description = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Icon)) {
			data.icon = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Thumbnail)) {
			data.thumbnail = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.WingedLight)) {
			data.winged_light = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Country)) {
			data.country = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Spot)) {
			data.spot = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Seasons)) {
			data.seasons = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Platforms)) {
			data.platform = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.Spirit)) {
			data.spirit = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.CatalogueProgression)) {
			data.catalogue_progression = null;
		}

		if (profileInteractiveResetTypes.includes(ProfileInteractiveResetType.GuessRank)) {
			data.guess_rank = null;
		}

		await this.set(interaction, data);
	}

	public async delete() {
		const promises = [];
		const profileDeleteData = [];

		if (this.icon) {
			profileDeleteData.push({ Key: Profile.iconRoute(this.userId, this.icon) });
		}

		if (this.thumbnail) {
			profileDeleteData.push({ Key: Profile.thumbnailRoute(this.userId, this.thumbnail) });
		}

		if (profileDeleteData.length > 0) {
			promises.push(
				S3Client.send(
					new DeleteObjectsCommand({ Bucket: CDN_BUCKET, Delete: { Objects: profileDeleteData } }),
				),
			);
		}

		promises.push(pg<SkyProfilePacket>(Table.Profiles).delete().where({ user_id: this.userId }));
		await Promise.all(promises);
	}

	public static async show(
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
			await Profile.exploreProfile(interaction, user?.id ?? invoker.id);
		} else {
			const profile = await this.fetch(user?.id ?? invoker.id).catch(() => null);

			if (!profile) {
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
				embeds: [(await profile.embed(interaction)).embed],
			});
		}
	}

	public static async explore(
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

		const profiles = skyProfilePackets.map((skyProfilePacket) => new this(skyProfilePacket));
		const invoker = interactionInvoker(interaction);

		const skyProfileLikesPackets = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
			user_id: invoker.id,
		});

		const response:
			| Parameters<InteractionsAPI["reply"]>[2]
			| Parameters<InteractionsAPI["updateMessage"]>[2] = {
			components: [
				...SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.map(
					(customId, index): APIActionRowComponent<APISelectMenuComponent> | undefined => {
						const options = generateProfileExplorerSelectMenuOptions(
							profiles,
							index * MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
							skyProfileLikesPackets,
						);

						if (options.length === 0) {
							return undefined;
						}

						return {
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
						};
					},
				).filter((selectMenu) => selectMenu !== undefined),
				{
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
				},
			],
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: `You can explore Sky profiles others have created!\n\nYou can ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} a Sky profile to keep track of it, and report any Sky profiles that are not in the spirit of Sky.\n\nHave fun exploring!`,
					title: "Sky Profile Explorer",
				},
			],
		};

		if (isChatInput) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				...response,
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		}
	}

	public static async editCountryAutocomplete(
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
							t(`countries.${country}`, { lng: locale, ns: "general" })
								.toUpperCase()
								.includes(value),
						)
							.map((country) => ({
								name: t(`countries.${country}`, { lng: locale, ns: "general" }),
								value: country,
							}))
							.slice(0, 25),
		});
	}

	public static async exploreAutocomplete(
		interaction: APIApplicationCommandAutocompleteInteraction,
		options: OptionResolver,
	) {
		const focused = options
			.getFocusedOption(ApplicationCommandOptionType.String)
			.value.toUpperCase();

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

	public static async exploreProfile(
		interaction:
			| APIChatInputApplicationCommandInteraction
			| APIMessageComponentButtonInteraction
			| APIMessageComponentSelectMenuInteraction
			| APIUserApplicationCommandInteraction,
		userId: LooseSnowflake,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "This Sky kid does not have a Sky profile. Maybe they should make one!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const name = profile.name!;
		const previous = await this.exploreProfilePreviousRow(name, userId);
		const next = await this.exploreProfileNextRow(name, userId);
		const ownSkyProfile = invoker.id === profile.userId;

		const isLiked =
			(
				await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
					user_id: invoker.id,
					target_id: userId,
				})
			).length === 1;

		const response:
			| Parameters<InteractionsAPI["reply"]>[2]
			| Parameters<InteractionsAPI["updateMessage"]>[2] = {
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							label: "View in browser",
							url: `${SKY_PROFILES_URL}/${profile.userId}`,
							style: ButtonStyle.Link,
						},
					],
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
			content: `<@${userId}>`,
			embeds: [(await profile.embed(interaction)).embed],
			flags: MessageFlags.Ephemeral,
		};

		if (interaction.type === InteractionType.MessageComponent) {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		} else {
			await client.api.interactions.reply(interaction.id, interaction.token, response);
		}
	}

	private static async exploreProfilePreviousRow(name: string, userId: LooseSnowflake) {
		const [previous] = await pg<SkyProfilePacket>(Table.Profiles)
			.where(function () {
				this.where("name", "<", name).orWhere(function () {
					this.where("name", "=", name).andWhere("user_id", "<", userId);
				});
			})
			.orderBy("name", "desc")
			.orderBy("user_id", "desc")
			.limit(1);

		return previous ? previous : null;
	}

	private static async exploreProfileNextRow(name: string, userId: LooseSnowflake) {
		const [next] = await pg<SkyProfilePacket>(Table.Profiles)
			.where(function () {
				this.where("name", ">", name).orWhere(function () {
					this.where("name", "=", name).andWhere("user_id", ">", userId);
				});
			})
			.orderBy("name", "asc")
			.orderBy("user_id", "asc")
			.limit(1);

		return next ? next : null;
	}

	public static async exploreLikes(
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

		const profiles = SkyProfilePackets.map((SkyProfilePacket) => new this(SkyProfilePacket));

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				...SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.map(
					(customId, index): APIActionRowComponent<APISelectMenuComponent> | undefined => {
						const options = generateProfileExplorerSelectMenuOptions(
							profiles,
							index * MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
						);

						if (options.length === 0) {
							return undefined;
						}

						return {
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
						};
					},
				).filter((selectMenu) => selectMenu !== undefined),
				{
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
				},
			],
			content: "",
			embeds: [
				{
					color: DEFAULT_EMBED_COLOUR,
					description: `You ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} these Sky profiles!`,
					title: "Sky Profile Explorer",
				},
			],
		});
	}

	private static async exploreLikedProfilePreviousRow(
		name: string,
		userId: LooseSnowflake,
		targetId: LooseSnowflake,
	) {
		const [previous] = await pg<SkyProfilePacket>(Table.SkyProfileLikes)
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
			.limit(1);

		return previous ? previous : null;
	}

	private static async exploreLikedProfileNextRow(
		name: string,
		userId: LooseSnowflake,
		targetId: LooseSnowflake,
	) {
		const [next] = await pg<SkyProfilePacket>(Table.SkyProfileLikes)
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
			.limit(1);

		return next ? next : null;
	}

	public static async exploreLikedProfile(
		interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);

		const userId = isButton(interaction)
			? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
			: interaction.data.values[0]!;

		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "Could not go to that Sky kid's Sky profile. Try browsing?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const name = profile.name!;
		const previous = await this.exploreLikedProfilePreviousRow(name, invoker.id, userId);
		const next = await this.exploreLikedProfileNextRow(name, invoker.id, userId);
		const ownSkyProfile = invoker.id === profile.userId;

		const isLiked =
			(
				await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
					user_id: invoker.id,
					target_id: userId,
				})
			).length === 1;

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
			content: `<@${userId}>`,
			embeds: [(await profile.embed(interaction)).embed],
		});
	}

	public static async like(interaction: APIMessageComponentButtonInteraction, fromLike = false) {
		const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const invoker = interactionInvoker(interaction);

		if (invoker.id === profile.userId) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "You can't like your own Sky profile!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const [like] = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
			user_id: invoker.id,
			target_id: userId,
		});

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
			? this.exploreLikedProfile(interaction)
			: this.exploreProfile(interaction, userId));
	}

	public static async report(interaction: APIMessageComponentButtonInteraction, fromLike = false) {
		const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
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
			content:
				"If someone's Sky profile is not in the spirit of Sky (excessive slurs, spam, etc.), feel free to report it so it can be reviewed.\n\nDo you wish to report this Sky profile?",
			embeds: [(await profile.embed(interaction)).embed],
		});
	}

	public static async reportModalPrompt(interaction: APIMessageComponentButtonInteraction) {
		const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
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

	public static async sendReport(interaction: APIModalSubmitInteraction) {
		const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

		if (!guild) {
			pino.error(interaction, "Could not find the guild of the Sky profile reports channel.");

			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: "This Sky profile has been reported. Thank you for keeping the community safe!",
			});

			return;
		}

		const channel = guild.channels.get(SKY_PROFILE_REPORTS_CHANNEL_ID);

		if (channel?.type !== ChannelType.GuildText) {
			pino.error(interaction, "Could not find the Sky profile reports channel.");

			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: "This Sky profile has been reported. Thank you for keeping the community safe!",
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
				components: [],
				content: "This Sky profile has been reported. Thank you for keeping the community safe!",
			});

			return;
		}

		const userId = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
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
			content: `Report by ${userLogFormat(invoker)} against <@${profile.userId}>:\n>>> ${text}`,
			embeds: [(await profile.embed(interaction)).embed],
		});

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: "This Sky profile has been reported. Thank you for keeping the community safe!",
		});
	}

	public static async showNameModal(interaction: APIMessageComponentSelectMenuInteraction) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		const textInput: APITextInputComponent = {
			type: ComponentType.TextInput,
			custom_id: SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID,
			label: "What's your in-game name?",
			max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
			min_length: 1,
			required: true,
			style: TextInputStyle.Short,
		};

		if (profile?.name) {
			textInput.value = profile.name;
		}

		await client.api.interactions.createModal(interaction.id, interaction.token, {
			components: [{ type: ComponentType.ActionRow, components: [textInput] }],
			custom_id: SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID,
			title: "Sky Profile",
		});
	}

	public static async showDescriptionModal(interaction: APIMessageComponentSelectMenuInteraction) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		const textInput: APITextInputComponent = {
			type: ComponentType.TextInput,
			custom_id: SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID,
			label: "Type a lovely description about your Skykid!",
			max_length: SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH,
			min_length: 1,
			required: true,
			style: TextInputStyle.Paragraph,
		};

		if (profile?.description) {
			textInput.value = profile.description;
		}

		await client.api.interactions.createModal(interaction.id, interaction.token, {
			components: [{ type: ComponentType.ActionRow, components: [textInput] }],
			custom_id: SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID,
			title: "Sky Profile",
		});
	}

	private static async showWingedLightSelectMenu(
		interaction: APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: SKY_PROFILE_SET_WINGED_LIGHT_SELECT_MENU_CUSTOM_ID,
							max_values: 1,
							min_values: 1,
							options: SKY_PROFILE_WINGED_LIGHT_TYPE_VALUES.map((skyProfileWingedLightType) => ({
								default: profile?.wingedLight === skyProfileWingedLightType,
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
			content: "",
			embeds: [
				{
					description:
						"You may choose how to display your winged light.\n\nInferring from the catalogue means your maximum winged light is all winged light combined with any wing buffs you have chosen in the catalogue. Capeless is also an option.",
					color: DEFAULT_EMBED_COLOUR,
				},
			],
		});
	}

	private static async showSpotModal(interaction: APIMessageComponentSelectMenuInteraction) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		const textInput: APITextInputComponent = {
			type: ComponentType.TextInput,
			custom_id: SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID,
			label: "Where's your favourite spot to hang out?",
			max_length: SKY_PROFILE_MAXIMUM_SPOT_LENGTH,
			min_length: SKY_PROFILE_MINIMUM_SPOT_LENGTH,
			required: true,
			style: TextInputStyle.Short,
		};

		if (profile?.spot) {
			textInput.value = profile.spot;
		}

		await client.api.interactions.createModal(interaction.id, interaction.token, {
			components: [{ type: ComponentType.ActionRow, components: [textInput] }],
			custom_id: SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID,
			title: "Sky Profile",
		});
	}

	private static async showSeasonsSelectMenu(
		interaction: APIMessageComponentSelectMenuInteraction,
	) {
		const { locale } = interaction;
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);
		const currentSeasons = profile?.seasons;
		const seasons = skySeasons();
		const [seasons1, seasons2] = seasons.partition(
			(_, key) => key < MAXIMUM_STRING_SELECT_MENU_OPTIONS_LIMIT,
		);

		const components: APIActionRowComponent<APIComponentInMessageActionRow>[] = [
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
			components,
			content: "",
			embeds: [],
		});
	}

	private static async showPlatformsSelectMenu(
		interaction: APIMessageComponentSelectMenuInteraction,
	) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);
		const currentPlatforms = profile?.platform;

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
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
								label: PlatformIdToString[platformId],
								value: String(platformId),
							})),
							placeholder: "Select the platforms you play on!",
						},
					],
				},
				SKY_PROFILE_BACK_TO_START_ACTION_ROW,
			],
			content: "",
			embeds: [],
		});
	}

	public static setName(interaction: APIModalSubmitInteraction) {
		const components = new ModalResolver(interaction.data.components);
		const name = components.getTextInputValue(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID).trim();
		return this.set(interaction, { name });
	}

	public static setDescription(interaction: APIModalSubmitInteraction) {
		const components = new ModalResolver(interaction.data.components);

		const description = components
			.getTextInputValue(SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID)
			.trim();

		return this.set(interaction, { description });
	}

	public static async setWingedLight(interaction: APIMessageComponentSelectMenuInteraction) {
		await this.set(interaction, {
			winged_light: Number(interaction.data.values[0]) as SkyProfileWingedLightTypes,
		});
	}

	public static setSpot(interaction: APIModalSubmitInteraction) {
		const components = new ModalResolver(interaction.data.components);
		const spot = components.getTextInputValue(SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID).trim();
		return this.set(interaction, { spot });
	}

	public static async setSeasons(interaction: APIMessageComponentSelectMenuInteraction) {
		const profile = await Profile.fetch(interactionInvoker(interaction).id).catch(() => null);

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
		const modifiedData = new Set<SeasonIds>(profile?.seasons).difference(selectMenuSeasons);

		// Calculate the new data.
		const newData = modifiedData.union(
			interaction.data.values.reduce(
				(computedSeasons, value) => computedSeasons.add(Number(value) as SeasonIds),
				new Set<SeasonIds>(),
			),
		);

		return this.set(interaction, { seasons: [...newData] });
	}

	public static async setPlatform(interaction: APIMessageComponentSelectMenuInteraction) {
		const platformIds = interaction.data.values.map((value) => Number(value));

		if (!platformIds.every((platformId) => isPlatformId(platformId))) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				components: [],
				content: "Invalid platform selected. Please try again.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		return this.set(interaction, { platform: platformIds });
	}

	private static async setCatalogueProgression(
		interaction: APIMessageComponentSelectMenuInteraction,
	) {
		const profile = await Profile.fetch(interactionInvoker(interaction).id).catch(() => null);
		await Profile.set(interaction, { catalogue_progression: !profile?.catalogueProgression });
	}

	private static async setGuessRank(interaction: APIMessageComponentSelectMenuInteraction) {
		const profile = await Profile.fetch(interactionInvoker(interaction).id).catch(() => null);
		await Profile.set(interaction, { guess_rank: !profile?.guessRank });
	}

	public static iconRoute(userId: LooseSnowflake, hash: string) {
		return `sky_profiles/icons/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
	}

	public static thumbnailRoute(userId: LooseSnowflake, hash: string) {
		return `sky_profiles/thumbnails/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
	}

	public get iconURL() {
		return this.icon ? String(new URL(Profile.iconRoute(this.userId, this.icon), CDN_URL)) : null;
	}

	public get thumbnailURL() {
		return this.thumbnail
			? String(new URL(Profile.thumbnailRoute(this.userId, this.thumbnail), CDN_URL))
			: null;
	}

	public static async showEdit(
		interaction:
			| APIChatInputApplicationCommandInteraction
			| APIMessageComponentButtonInteraction
			| APIMessageComponentSelectMenuInteraction
			| APIModalSubmitInteraction,
		defer?: boolean,
	) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);
		const embedData = await profile?.embed(interaction);
		const embed = embedData?.embed;
		const missing = embedData?.missing;
		let flags = MessageFlags.Ephemeral;

		if (!embed) {
			flags |= MessageFlags.SuppressEmbeds;
		}

		const actionRowComponents: APIComponentInMessageActionRow[] = [
			{
				type: ComponentType.Button,
				label: "View in browser",
				url: profile?.userId ? `${SKY_PROFILES_URL}/${profile?.userId}` : SKY_PROFILES_URL,
				style: ButtonStyle.Link,
			},
		];

		if (profile?.wingedLight === SkyProfileWingedLightType.Capeless) {
			actionRowComponents.push(SKY_PROFILE_EDIT_WINGLESS_BUTTON);
		}

		actionRowComponents.push(SKY_PROFILE_EDIT_RESET_BUTTON);

		const baseReplyOptions:
			| Parameters<InteractionsAPI["editReply"]>[2]
			| Parameters<InteractionsAPI["reply"]>[2]
			| Parameters<InteractionsAPI["updateMessage"]>[2] = {
			components: [
				SKY_PROFILE_EDIT_OPTIONS_ACTION_ROW,
				{ type: ComponentType.ActionRow, components: actionRowComponents },
			],
			content: embed
				? missing
					? `${missing}`
					: ""
				: `You do not have a Sky profile yet. Build one!\nSky profiles show up on ${SKY_PROFILES_URL} too!`,
			embeds: embed ? [embed] : [],
			flags,
		};

		await (isChatInputCommand(interaction)
			? defer
				? client.api.interactions.editReply(APPLICATION_ID, interaction.token, baseReplyOptions)
				: client.api.interactions.reply(interaction.id, interaction.token, baseReplyOptions)
			: client.api.interactions.updateMessage(interaction.id, interaction.token, baseReplyOptions));
	}

	public static async showReset(interaction: APIMessageComponentButtonInteraction) {
		const invoker = interactionInvoker(interaction);
		const profile = await Profile.fetch(invoker.id).catch(() => null);

		if (!profile) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "You do not have a Sky profile to reset.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			content: "",
			components: [SKY_PROFILE_RESET_OPTIONS_ACTION_ROW, SKY_PROFILE_BACK_TO_START_ACTION_ROW],
			embeds: [(await profile.embed(interaction)).embed],
		});
	}

	public async embed(
		interaction:
			| APIChatInputApplicationCommandInteraction
			| APIMessageComponentButtonInteraction
			| APIMessageComponentSelectMenuInteraction
			| APIModalSubmitInteraction
			| APIUserApplicationCommandInteraction,
	) {
		const { locale } = interaction;
		const hearts = await totalReceived(this.userId);

		const {
			userId,
			name,
			iconURL,
			thumbnailURL,
			description,
			country,
			wingedLight,
			seasons,
			platform,
			spirit,
			spot,
			catalogueProgression,
			guessRank,
		} = this;

		const embed: APIEmbed = {
			color: DEFAULT_EMBED_COLOUR,
			footer: { icon_url: formatEmojiURL(MISCELLANEOUS_EMOJIS.Heart.id), text: String(hearts) },
		};

		const descriptions = [];
		const fields = [];
		const missing = [];

		const skyProfileCommandId = COMMAND_CACHE.get(
			t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
		);

		const useCommandPrefix = skyProfileCommandId
			? `Use ${chatInputApplicationCommandMention(
					skyProfileCommandId,
					t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
					t("sky-profile.edit.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
				)}`
			: "- Use the command";

		if (seasons) {
			if (seasons.length > 0) {
				descriptions.push(
					seasons
						.sort((a, b) => a - b)
						.reduce<string[]>((seasonEmojis, season) => {
							const seasonEmoji = SeasonIdToSeasonalEmoji[season];

							if (seasonEmoji) {
								seasonEmojis.push(formatEmoji(seasonEmoji));
							}

							return seasonEmojis;
						}, [])
						.join(" "),
				);
			}
		} else {
			missing.push("- Use the select menu to show what seasons you participated in!");
		}

		if (description) {
			descriptions.push(description);
		} else {
			missing.push("- Set a description!");
		}

		if (descriptions.length > 0) {
			embed.description = descriptions.join("\n");
		}

		if (thumbnailURL) {
			embed.thumbnail = { url: thumbnailURL };
		} else {
			missing.push(`- ${useCommandPrefix} to upload a thumbnail!`);
		}

		if (name) {
			const embedAuthorOptions: APIEmbedAuthor = { name, url: `${SKY_PROFILES_URL}/${userId}` };

			if (iconURL) {
				embedAuthorOptions.icon_url = iconURL;
			} else {
				missing.push(`- ${useCommandPrefix} to upload an icon!`);
			}

			embed.author = embedAuthorOptions;
		} else {
			missing.push("- Set your name!");
		}

		if (typeof wingedLight === "number") {
			if (wingedLight === SkyProfileWingedLightType.Capeless) {
				fields.push({ name: "Winged Light", value: "Capeless", inline: true });
			} else {
				const catalogue = await fetchCatalogue(userId);

				if (catalogue) {
					let count = WINGED_LIGHT_IN_AREAS;

					for (const wingBuff of WING_BUFFS) {
						if (catalogue.data.has(wingBuff)) {
							count++;
						}
					}

					fields.push({
						name: "Winged Light",
						value:
							count === MAXIMUM_WINGED_LIGHT
								? `${count} (Max ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
								: count.toString(),
						inline: true,
					});
				}
			}
		} else {
			missing.push("- Set the winged light you have!");
		}

		if (typeof spirit === "number") {
			fields.push({
				name: "Favourite Spirit",
				value: t(`spirits.${spirit}`, { lng: locale, ns: "general" }),
				inline: true,
			});
		} else {
			missing.push(`- ${useCommandPrefix} to set your favourite spirit!`);
		}

		if (country) {
			if (isCountry(country)) {
				fields.push({
					name: "Country",
					value: `${CountryToEmoji[country]} ${t(`countries.${country}`, { lng: locale, ns: "general" })}`,
					inline: true,
				});
			} else {
				pino.error(interaction, `Invalid country code in Sky Profile: ${country}`);
			}
		} else {
			missing.push(`- ${useCommandPrefix} to set the country you are from!`);
		}

		if (spot) {
			fields.push({ name: "Favourite Spot", value: spot, inline: true });
		} else {
			missing.push("- Set your favourite spot!");
		}

		if (platform) {
			if (platform.length > 0) {
				fields.push({
					name: "Platform",
					value: platform
						.sort((a, b) => a - b)
						.map((platformId) => formatEmoji(PlatformIdToEmoji[platformId]))
						.join(" "),
					inline: true,
				});
			}
		} else {
			missing.push("- Use the select menu to show what platforms you play on!");
		}

		if (typeof catalogueProgression === "boolean") {
			if (catalogueProgression) {
				const catalogue = await fetchCatalogue(userId);
				const allProgressResult = allProgress(catalogue?.data, true) ?? 0;
				fields.push({
					name: "Catalogue Progression",
					value: `${allProgressResult}%`,
					inline: true,
				});
			}
		} else {
			missing.push("- Set if you want to share your catalogue progression!");
		}

		if (typeof guessRank === "boolean") {
			if (guessRank) {
				const guessPacketRanking = await findUser(userId);
				const originalText = `${GuessDifficultyLevelToName[GuessDifficultyLevel.Original]}: ${guessPacketRanking?.streak_rank ? `#${guessPacketRanking.streak_rank}` : "Unranked"}`;
				const hardText = `${GuessDifficultyLevelToName[GuessDifficultyLevel.Hard]}: ${guessPacketRanking?.streak_hard_rank ? `#${guessPacketRanking.streak_hard_rank}` : "Unranked"}`;

				fields.push({
					name: "Guess Rank",
					value: `${originalText}\n${hardText}`,
					inline: true,
				});
			}
		} else {
			missing.push("- Set if you want to share your guessing game rank!");
		}

		if (fields.length > 4 && fields.length % 3 === 2) {
			fields.push({ name: "", value: "", inline: true });
		}

		embed.fields = fields;
		return { embed, missing: missing.join("\n") || null };
	}
}
