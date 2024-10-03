import type { Buffer } from "node:buffer";
import { URL } from "node:url";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ActionRowBuilder,
	type Attachment,
	type AutocompleteInteraction,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	EmbedBuilder,
	MessageFlags,
	ModalBuilder,
	type ModalMessageModalSubmitInteraction,
	type ModalSubmitInteraction,
	PermissionFlagsBits,
	type Snowflake,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
	TextInputBuilder,
	TextInputStyle,
	type UserContextMenuCommandInteraction,
	userMention,
} from "discord.js";
import { hash } from "hasha";
import { t } from "i18next";
import sharp from "sharp";
import commands from "../Commands/index.js";
import S3Client from "../S3Client.js";
import {
	CDN_BUCKET,
	CDN_URL,
	DEFAULT_EMBED_COLOUR,
	MAXIMUM_WINGED_LIGHT,
	MINIMUM_WINGED_LIGHT,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
} from "../Utility/Constants.js";
import {
	SEASON_FLAGS_TO_SEASON_NAME_ENTRIES,
	SeasonNameToSeasonalEmoji,
} from "../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, formatEmojiURL } from "../Utility/emojis.js";
import { cannotUsePermissions } from "../Utility/permissionChecks.js";
import { resolveBitsToSeasons } from "../catalogue/spirits/seasons/index.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { Catalogue } from "./Catalogue.js";
import {
	PLATFORM_FLAGS_TO_STRING_ENTRIES,
	resolveBitsToPlatform,
	resolvePlatformToEmoji,
} from "./Platforms.js";

export interface ProfilePacket {
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: number | null;
	seasons: number;
	platform: number | null;
	spirit: string | null;
	spot: string | null;
	catalogue_progression: boolean | null;
}

interface SkyProfileLikesPacket {
	user_id: Snowflake;
	target_id: Snowflake;
}

interface ProfileData {
	userId: ProfilePacket["user_id"];
	name: ProfilePacket["name"];
	icon: ProfilePacket["icon"];
	thumbnail: ProfilePacket["thumbnail"];
	description: ProfilePacket["description"];
	country: ProfilePacket["country"];
	wingedLight: ProfilePacket["winged_light"];
	seasons: ProfilePacket["seasons"];
	platform: ProfilePacket["platform"];
	spirit: ProfilePacket["spirit"];
	spot: ProfilePacket["spot"];
	catalogueProgression: ProfilePacket["catalogue_progression"];
}

export interface ProfileSetData {
	name?: string;
	icon?: string;
	thumbnail?: string;
	description?: string;
	country?: string;
	winged_light?: number;
	seasons?: number;
	platform?: number;
	spirit?: string;
	spot?: string;
	catalogue_progression?: boolean;
}

type ProfilePatchData = Omit<ProfilePacket, "user_id">;

enum ProfileInteractiveEditType {
	Name = "Name",
	Description = "Description",
	WingedLight = "Winged Light",
	Country = "Country",
	Spot = "Spot",
	Seasons = "Seasons",
	Platforms = "Platforms",
	CatalogueProgression = "Catalogue Progression",
}

const PROFILE_INTERACTIVE_EDIT_TYPE_VALUES = Object.values(ProfileInteractiveEditType);

const ProfileInteractiveEditTypeToDescription = {
	[ProfileInteractiveEditType.Name]: "What name do you go by?",
	[ProfileInteractiveEditType.Description]: "What's your story?",
	[ProfileInteractiveEditType.WingedLight]: "What's the maximum winged light you can possess?",
	[ProfileInteractiveEditType.Country]: "What country are you from?",
	[ProfileInteractiveEditType.Spot]: "Where do you hang out?",
	[ProfileInteractiveEditType.Seasons]: "What seasons have you played in?",
	[ProfileInteractiveEditType.Platforms]: "What platforms do you play on?",
	[ProfileInteractiveEditType.CatalogueProgression]: "Toggle showing your catalogue progression?",
} as const satisfies Readonly<Record<ProfileInteractiveEditType, string>>;

function isProfileInteractiveEditType(value: unknown): value is ProfileInteractiveEditType {
	return PROFILE_INTERACTIVE_EDIT_TYPE_VALUES.includes(value as ProfileInteractiveEditType);
}

export const SKY_PROFILE_EDIT_CUSTOM_ID = "SKY_PROFILE_EDIT_CUSTOM_ID" as const;
export const SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID = "SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID" as const;
const SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID" as const;

const SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID" as const;

const SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID" as const;

const SKY_PROFILE_SET_WINGED_LIGHT_INPUT_CUSTOM_ID =
	"SKY_PROFILE_SET_WINGED_LIGHT_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID =
	"SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID =
	"SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID = "SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID" as const;
const SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID =
	"SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID" as const;

const SKY_PROFILE_EDIT_ACTION_ROW = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
	new StringSelectMenuBuilder()
		.setCustomId(SKY_PROFILE_EDIT_CUSTOM_ID)
		.setMaxValues(1)
		.setMinValues(1)
		.setOptions(
			PROFILE_INTERACTIVE_EDIT_TYPE_VALUES.map((profileInteractiveEditType) =>
				new StringSelectMenuOptionBuilder()
					.setDescription(ProfileInteractiveEditTypeToDescription[profileInteractiveEditType])
					.setLabel(profileInteractiveEditType)
					.setValue(profileInteractiveEditType),
			),
		)
		.setPlaceholder("What do you want to edit?"),
);

const SKY_PROFILE_BACK_TO_START_ACTION_ROW = new ActionRowBuilder<ButtonBuilder>().setComponents(
	new ButtonBuilder()
		.setCustomId(SKY_PROFILE_BACK_TO_START_BUTTON_CUSTOM_ID)
		.setEmoji("⏮️")
		.setLabel("Back to Sky Profile")
		.setStyle(ButtonStyle.Primary),
);

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

export const SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID = "SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID" as const;

export const SKY_PROFILE_REPORT_MODAL_CUSTOM_ID = "SKY_PROFILE_REPORT_MODAL_CUSTOM_ID" as const;

export const SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID =
	"SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID" as const;

export const SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID =
	"SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID" as const;

export const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
export const SKY_PROFILE_MAXIMUM_ASSET_SIZE = 5_000_000 as const;
const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
export const SKY_PROFILE_MINIMUM_COUNTRY_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH = 60 as const;
const SKY_PROFILE_MINIMUM_WINGED_LIGHT_LENGTH = 1 as const;
const SKY_PROFILE_MAXIMUM_WINGED_LIGHT_LENGTH = 3 as const;
export const SKY_PROFILE_MINIMUM_SPOT_LENGTH = 2 as const;
export const SKY_PROFILE_MAXIMUM_SPOT_LENGTH = 50 as const;
const ANIMATED_HASH_PREFIX = "a_" as const;
const SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER = 25 as const;
const SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH = 100 as const;
const SKY_PROFILE_EXPLORE_AUTOCOMPLETE_NAME_LENGTH = 100 as const;
const SKY_PROFILE_REPORT_MAXIMUM_LENGTH = 1000 as const;
const SKY_PROFILE_REPORT_MINIMUM_LENGTH = 10 as const;
const SKY_PROFILE_UNKNOWN_NAME = "Anonymous" as const;

export const enum AssetType {
	Icon = 0,
	Thumbnail = 1,
}

function generateProfileExplorerSelectMenuOptions(
	profiles: Profile[],
	indexStart: number,
	skyProfileLikesPackets?: SkyProfileLikesPacket[],
) {
	const maximumIndex = SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER + indexStart;

	return profiles.slice(indexStart, maximumIndex).map((profile) => {
		const stringSelectMenuOptionBuilder = new StringSelectMenuOptionBuilder()
			.setLabel(profile.name ?? SKY_PROFILE_UNKNOWN_NAME)
			.setValue(profile.userId);

		if (
			skyProfileLikesPackets?.some(
				(skyProfileLikesPacket) => skyProfileLikesPacket.target_id === profile.userId,
			)
		) {
			stringSelectMenuOptionBuilder.setEmoji(MISCELLANEOUS_EMOJIS.Heart);
		}

		let { description } = profile;

		if (description) {
			description =
				description.length >= SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH
					? `${description.slice(0, SKY_PROFILE_EXPLORE_DESCRIPTION_LENGTH - 3)}...`
					: description;

			stringSelectMenuOptionBuilder.setDescription(description);
		}

		return stringSelectMenuOptionBuilder;
	});
}

function isAnimatedHash(hash: string): hash is `${typeof ANIMATED_HASH_PREFIX}${string}` {
	return hash.startsWith(ANIMATED_HASH_PREFIX);
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

	public spirit!: ProfilePacket["spirit"];

	public spot!: ProfilePacket["spot"];

	public catalogueProgression!: ProfilePacket["catalogue_progression"];

	public constructor(profile: ProfilePacket) {
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
		this.seasons = data.seasons;
		this.platform = data.platform;
		this.spirit = data.spirit;
		this.spot = data.spot;
		this.catalogueProgression = data.catalogue_progression;
	}

	public static async fetch(userId: Snowflake) {
		const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).where("user_id", userId);

		if (!profilePacket) {
			throw new Error("No profile found.");
		}

		return new this(profilePacket);
	}

	public static async set(
		interaction:
			| ChatInputCommandInteraction
			| StringSelectMenuInteraction
			| ModalMessageModalSubmitInteraction,
		data: ProfileSetData,
	) {
		let profile = await this.fetch(interaction.user.id).catch(() => null);

		if (profile) {
			const [profilePacket] = await pg<ProfilePacket>(Table.Profiles)
				.update(data)
				.where({ user_id: profile.userId })
				.returning("*");

			profile.patch(profilePacket!);
		} else {
			const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).insert(
				{
					...data,
					user_id: interaction.user.id,
				},
				"*",
			);

			profile = new this(profilePacket!);
		}

		await this.showEdit(interaction);
	}

	public static async setAsset(
		{ user }: ChatInputCommandInteraction,
		{ contentType, url }: Attachment,
		type: AssetType,
	) {
		const profile = await Profile.fetch(user.id).catch(() => null);

		// Delete the old asset if it exists.
		if (profile) {
			if (profile.icon && type === AssetType.Icon) {
				await S3Client.send(
					new DeleteObjectCommand({
						Bucket: CDN_BUCKET,
						Key: Profile.iconRoute(user.id, profile.icon),
					}),
				);
			}

			if (profile.thumbnail && type === AssetType.Thumbnail) {
				await S3Client.send(
					new DeleteObjectCommand({
						Bucket: CDN_BUCKET,
						Key: Profile.thumbnailRoute(user.id, profile.thumbnail),
					}),
				);
			}
		}

		const gif = contentType === "image/gif";
		const assetBuffer = sharp(await (await fetch(url)).arrayBuffer(), { animated: true });
		let buffer: Buffer;

		if (gif) {
			buffer = await assetBuffer.gif().toBuffer();
		} else {
			buffer = await assetBuffer.webp().toBuffer();
		}

		let hashedBuffer = await hash(buffer, { algorithm: "md5" });

		if (gif) {
			hashedBuffer = `${ANIMATED_HASH_PREFIX}${hash}`;
		}

		await S3Client.send(
			new PutObjectCommand({
				Bucket: CDN_BUCKET,
				Key:
					type === AssetType.Icon
						? Profile.iconRoute(user.id, hashedBuffer)
						: Profile.thumbnailRoute(user.id, hashedBuffer),
				Body: buffer,
			}),
		);

		return hashedBuffer;
	}

	public static async edit(interaction: StringSelectMenuInteraction) {
		const profileInteractiveEditType = interaction.values[0];

		if (!isProfileInteractiveEditType(profileInteractiveEditType)) {
			pino.warn(interaction, "Received an unknown profile edit type");

			await interaction.update({
				components: [],
				content: "Unknown profile edit type. Please try again",
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
				await this.showWingedLightModal(interaction);
				return;
			}
			case ProfileInteractiveEditType.Country: {
				await this.showCountryModal(interaction);
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
		}
	}

	public static async explore(interaction: ButtonInteraction | ChatInputCommandInteraction) {
		const page =
			interaction instanceof ChatInputCommandInteraction
				? 1
				: Number(interaction.customId.slice(interaction.customId.indexOf("§") + 1));

		const limit =
			SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER * SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.length;

		const offset = (page - 1) * limit;

		const profilePackets = await pg<ProfilePacket>(Table.Profiles)
			.whereNotNull("name")
			.orderBy("name", "asc")
			.limit(limit + 1)
			.offset(offset);

		if (profilePackets.length === 0) {
			await interaction.reply({
				content: "There are no profiles to explore. Why not be the first?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const hasPreviousPage = offset > 0;
		const hasNextPage = profilePackets.length > limit;

		if (hasNextPage) {
			profilePackets.pop();
		}

		const profiles = profilePackets.map((profilePacket) => new this(profilePacket));

		const skyProfileLikesPackets = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
			user_id: interaction.user.id,
		});

		const response = {
			components: [
				...SKY_PROFILE_EXPLORE_SELECT_MENU_CUSTOM_IDS.map((customId, index) => {
					return new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(customId)
							.setMaxValues(1)
							.setMinValues(1)
							.setOptions(
								generateProfileExplorerSelectMenuOptions(
									profiles,
									index * SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER,
									skyProfileLikesPackets,
								),
							)
							.setPlaceholder("View a profile!"),
					);
				}).filter((selectMenu) => selectMenu.components[0]!.options.length > 0),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_BACK_CUSTOM_ID}§${page - 1!}`)
						.setDisabled(!hasPreviousPage)
						.setEmoji("⬅️")
						.setLabel("Back")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_NEXT_CUSTOM_ID}§${page + 1}`)
						.setDisabled(!hasNextPage)
						.setEmoji("➡️")
						.setLabel("Next")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID}§1`)
						.setDisabled(skyProfileLikesPackets.length === 0)
						.setEmoji(MISCELLANEOUS_EMOJIS.Heart)
						.setLabel("Explore Likes")
						.setStyle(ButtonStyle.Secondary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						`You can explore Sky profiles others have created!\n\nYou can ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} a Sky profile to keep track of it, and report any Sky profiles that are not in the spirit of Sky.\n\nHave fun exploring!`,
					)
					.setTitle("Sky Profile Explorer"),
			],
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply({ ...response, flags: MessageFlags.Ephemeral });
		}
	}

	public static async exploreAutocomplete(interaction: AutocompleteInteraction) {
		const focused = interaction.options.getFocused().toUpperCase();

		await interaction.respond(
			focused.length === 0
				? []
				: (
						await pg<ProfilePacket>(Table.Profiles)
							.select(["user_id", "name", "description"])
							.where("name", "ilike", `%${focused}%`)
							.limit(25)
					).map(({ user_id, name: skyProfileName, description }) => {
						let name = `${skyProfileName}`;

						if (description) {
							name += `: ${description}`;
						}

						if (name.length > SKY_PROFILE_EXPLORE_AUTOCOMPLETE_NAME_LENGTH) {
							name = `${name.slice(0, SKY_PROFILE_EXPLORE_AUTOCOMPLETE_NAME_LENGTH - 3)}...`;
						}

						return { name, value: user_id };
					}),
		);
	}

	public static async exploreProfile(
		interaction: ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction,
	) {
		const { user } = interaction;
		let userId: Snowflake;

		if (interaction.isChatInputCommand()) {
			userId = interaction.options.getString("name", true);
		} else if (interaction.isButton()) {
			userId = interaction.customId.slice(interaction.customId.indexOf("§") + 1);
		} else {
			userId = interaction.values[0]!;
		}

		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "Could not go to that Sky kid's Sky profile. Try browsing?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const name = profile.name!;
		const previous = await this.exploreProfilePreviousRow(name, userId);
		const next = await this.exploreProfileNextRow(name, userId);
		const ownSkyProfile = user.id === profile.userId;

		const isLiked =
			(
				await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
					user_id: interaction.user.id,
					target_id: userId,
				})
			).length === 1;

		const response = {
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_PROFILE_BACK_CUSTOM_ID}§${previous?.user_id}`)
						.setDisabled(!previous)
						.setEmoji("⬅️")
						.setLabel("Back")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_PROFILE_NEXT_CUSTOM_ID}§${next?.user_id}`)
						.setDisabled(!next)
						.setEmoji("➡️")
						.setLabel("Next")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_PROFILE_LIKE_CUSTOM_ID}§${userId}`)
						.setDisabled(ownSkyProfile)
						.setEmoji(MISCELLANEOUS_EMOJIS.Heart)
						.setLabel(isLiked ? "Unlike" : "Like")
						.setStyle(isLiked ? ButtonStyle.Secondary : ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID}§1`)
						.setEmoji("🌐")
						.setLabel("Explore")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_REPORT_CUSTOM_ID}§${userId}`)
						.setDisabled(ownSkyProfile)
						.setEmoji("⚠️")
						.setLabel("Report")
						.setStyle(ButtonStyle.Secondary),
				),
			],
			content: "",
			embeds: [(await profile.embed(interaction)).embed],
		};

		if (interaction.isMessageComponent()) {
			await interaction.update(response);
		} else {
			await interaction.reply({ ...response, flags: MessageFlags.Ephemeral });
		}
	}

	private static async exploreProfilePreviousRow(name: string, userId: Snowflake) {
		const [previous] = await pg<ProfilePacket>(Table.Profiles)
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

	private static async exploreProfileNextRow(name: string, userId: Snowflake) {
		const [next] = await pg<ProfilePacket>(Table.Profiles)
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

	public static async exploreLikes(interaction: ButtonInteraction | StringSelectMenuInteraction) {
		const { customId, user } = interaction;
		const page = Number(customId.slice(customId.indexOf("§") + 1));

		const limit =
			SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER *
			SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.length;

		const offset = (page - 1) * limit;

		const profilePackets = await pg(Table.SkyProfileLikes)
			.join(Table.Profiles, `${Table.SkyProfileLikes}.target_id`, `${Table.Profiles}.user_id`)
			.select(`${Table.Profiles}.*`)
			.where(`${Table.SkyProfileLikes}.user_id`, user.id)
			.orderBy(`${Table.Profiles}.name`, "asc")
			.limit(limit + 1)
			.offset(offset);

		if (profilePackets.length === 0) {
			await interaction.reply({
				content: "You have no Sky profiles that you've liked.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const hasPreviousPage = offset > 0;
		const hasNextPage = profilePackets.length > limit;

		if (hasNextPage) {
			profilePackets.pop();
		}

		const profiles = profilePackets.map((profilePacket) => new this(profilePacket));

		await interaction.update({
			components: [
				...SKY_PROFILE_EXPLORE_LIKES_SELECT_MENU_CUSTOM_IDS.map((customId, index) => {
					return new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(customId)
							.setMaxValues(1)
							.setMinValues(1)
							.setOptions(
								generateProfileExplorerSelectMenuOptions(
									profiles,
									index * SKY_PROFILE_EXPLORE_MAXIMUM_OPTION_NUMBER,
								),
							)
							.setPlaceholder("View a profile!"),
					);
				}).filter((selectMenu) => selectMenu.components[0]!.options.length > 0),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_BACK_CUSTOM_ID}§${page - 1}`)
						.setDisabled(!hasPreviousPage)
						.setEmoji("⬅️")
						.setLabel("Back")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_NEXT_CUSTOM_ID}§${page + 1}`)
						.setDisabled(!hasNextPage)
						.setEmoji("➡️")
						.setLabel("Next")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_VIEW_START_CUSTOM_ID}§1`)
						.setEmoji("🌐")
						.setLabel("Explore")
						.setStyle(ButtonStyle.Secondary),
				),
			],
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(`You ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} these Sky profiles!`)
					.setTitle("Sky Profile Explorer"),
			],
		});
	}

	private static async exploreLikedProfilePreviousRow(
		name: string,
		userId: Snowflake,
		targetId: Snowflake,
	) {
		const [previous] = await pg<ProfilePacket>(Table.SkyProfileLikes)
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
		userId: Snowflake,
		targetId: Snowflake,
	) {
		const [next] = await pg<ProfilePacket>(Table.SkyProfileLikes)
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
		interaction: ButtonInteraction | StringSelectMenuInteraction,
	) {
		const { user } = interaction;

		const userId = interaction.isButton()
			? interaction.customId.slice(interaction.customId.indexOf("§") + 1)
			: interaction.values[0]!;

		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "Could not go to that Sky kid's Sky profile. Try browsing?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const name = profile.name!;
		const previous = await this.exploreLikedProfilePreviousRow(name, user.id, userId);
		const next = await this.exploreLikedProfileNextRow(name, user.id, userId);
		const ownSkyProfile = user.id === profile.userId;

		const isLiked =
			(
				await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
					user_id: interaction.user.id,
					target_id: userId,
				})
			).length === 1;

		await interaction.update({
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_PROFILE_BACK_CUSTOM_ID}§${previous?.user_id}`)
						.setDisabled(!previous)
						.setEmoji("⬅️")
						.setLabel("Back")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_PROFILE_NEXT_CUSTOM_ID}§${next?.user_id}`)
						.setDisabled(!next)
						.setEmoji("➡️")
						.setLabel("Next")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_PROFILE_LIKE_CUSTOM_ID}§${userId}`)
						.setDisabled(ownSkyProfile)
						.setEmoji(MISCELLANEOUS_EMOJIS.Heart)
						.setLabel(isLiked ? "Unlike" : "Like")
						.setStyle(isLiked ? ButtonStyle.Secondary : ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_CUSTOM_ID}§1`)
						.setEmoji("🌐")
						.setLabel("Explore Likes")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_LIKES_REPORT_CUSTOM_ID}§${userId}`)
						.setDisabled(ownSkyProfile)
						.setEmoji("⚠️")
						.setLabel("Report")
						.setStyle(ButtonStyle.Secondary),
				),
			],
			content: "",
			embeds: [(await profile.embed(interaction)).embed],
		});
	}

	public static async like(interaction: ButtonInteraction) {
		const { customId } = interaction;
		const userId = customId.slice(customId.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (interaction.user.id === profile.userId) {
			await interaction.reply({
				content: "You can't like your own Sky profile!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const [like] = await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).where({
			user_id: interaction.user.id,
			target_id: userId,
		});

		if (like) {
			await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).delete().where({
				user_id: interaction.user.id,
				target_id: userId,
			});
		} else {
			await pg<SkyProfileLikesPacket>(Table.SkyProfileLikes).insert({
				user_id: interaction.user.id,
				target_id: userId,
			});
		}

		await this.exploreProfile(interaction);
	}

	public static async report(interaction: ButtonInteraction) {
		const { customId } = interaction;
		const userId = customId.slice(customId.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await interaction.update({
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID}§${userId}`)
						.setEmoji("⬅️")
						.setLabel("Back")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId(`${SKY_PROFILE_EXPLORE_REPORT_CONFIRM_CUSTOM_ID}§${userId}`)
						.setEmoji("⚠️")
						.setLabel("Confirm")
						.setStyle(ButtonStyle.Danger),
				),
			],
			content:
				"If someone's Sky profile is not in the spirit of Sky (excessive slurs, spam, etc.), feel free to report it so it can be reviewed.\n\nDo you wish to report this Sky profile?",
			embeds: [(await profile.embed(interaction)).embed],
		});
	}

	public static async reportModalPrompt(interaction: ButtonInteraction) {
		const { customId } = interaction;
		const userId = customId.slice(customId.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID)
							.setLabel("What's wrong with this Sky profile?")
							.setMaxLength(SKY_PROFILE_REPORT_MAXIMUM_LENGTH)
							.setMinLength(SKY_PROFILE_REPORT_MINIMUM_LENGTH)
							.setStyle(TextInputStyle.Paragraph),
					),
				)
				.setCustomId(`${SKY_PROFILE_REPORT_MODAL_CUSTOM_ID}§${userId}`)
				.setTitle("Report Sky Profile"),
		);
	}

	public static async sendReport(interaction: ModalMessageModalSubmitInteraction) {
		const channel = interaction.client.channels.cache.get(SKY_PROFILE_REPORTS_CHANNEL_ID);

		if (!channel?.isTextBased()) {
			return;
		}

		const { customId, fields } = interaction;
		const userId = customId.slice(customId.indexOf("§") + 1);
		const profile = await this.fetch(userId).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: "This Sky kid does not have a Sky profile. Why not ask them to make one?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		const text = fields.getTextInputValue(SKY_PROFILE_REPORT_TEXT_INPUT_1_CUSTOM_ID);

		await channel.send({
			allowedMentions: { parse: [] },
			content: `Report by ${interaction.user} (${interaction.user.tag}) against ${userMention(profile.userId)}:\n>>> ${text}`,
			embeds: [(await profile.embed(interaction)).embed],
		});

		await interaction.update({
			components: [],
			content: "This Sky profile has been reported. Thank you for keeping the community safe!",
		});
	}

	public static async showNameModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID)
			.setLabel("What's your in-game name?")
			.setMaxLength(SKY_PROFILE_MAXIMUM_NAME_LENGTH)
			.setMinLength(1)
			.setRequired()
			.setStyle(TextInputStyle.Short);

		if (profile?.name) {
			textInput.setValue(profile.name);
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(new ActionRowBuilder<TextInputBuilder>().setComponents(textInput))
				.setCustomId(SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID)
				.setTitle("Sky Profile"),
		);
	}

	public static async showDescriptionModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID)
			.setLabel("Type a lovely description about your Skykid!")
			.setMaxLength(SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH)
			.setMinLength(1)
			.setRequired()
			.setStyle(TextInputStyle.Paragraph);

		if (profile?.description) {
			textInput.setValue(profile.description);
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(new ActionRowBuilder<TextInputBuilder>().setComponents(textInput))
				.setCustomId(SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID)
				.setTitle("Sky Profile"),
		);
	}

	public static async showWingedLightModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_WINGED_LIGHT_INPUT_CUSTOM_ID)
			.setLabel(
				`How much winged light do you have? (${MINIMUM_WINGED_LIGHT}-${MAXIMUM_WINGED_LIGHT})`,
			)
			.setMaxLength(SKY_PROFILE_MAXIMUM_WINGED_LIGHT_LENGTH)
			.setMinLength(SKY_PROFILE_MINIMUM_WINGED_LIGHT_LENGTH)
			.setRequired()
			.setStyle(TextInputStyle.Short);

		if (profile?.wingedLight) {
			textInput.setValue(String(profile.wingedLight));
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(new ActionRowBuilder<TextInputBuilder>().setComponents(textInput))
				.setCustomId(SKY_PROFILE_SET_WINGED_LIGHT_MODAL_CUSTOM_ID)
				.setTitle("Sky Profile"),
		);
	}

	public static async showCountryModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID)
			.setLabel("Feel like specifying your country?")
			.setMaxLength(SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH)
			.setMinLength(SKY_PROFILE_MINIMUM_COUNTRY_LENGTH)
			.setRequired()
			.setStyle(TextInputStyle.Short);

		if (profile?.country) {
			textInput.setValue(profile.country);
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(new ActionRowBuilder<TextInputBuilder>().setComponents(textInput))
				.setCustomId(SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID)
				.setTitle("Sky Profile"),
		);
	}

	private static async showSpotModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID)
			.setLabel("Where's your favourite spot to hang out?")
			.setMaxLength(SKY_PROFILE_MAXIMUM_SPOT_LENGTH)
			.setMinLength(SKY_PROFILE_MINIMUM_SPOT_LENGTH)
			.setRequired()
			.setStyle(TextInputStyle.Short);

		if (profile?.spot) {
			textInput.setValue(profile.spot);
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(new ActionRowBuilder<TextInputBuilder>().setComponents(textInput))
				.setCustomId(SKY_PROFILE_SET_SPOT_MODAL_CUSTOM_ID)
				.setTitle("Sky Profile"),
		);
	}

	private static async showSeasonsSelectMenu(interaction: StringSelectMenuInteraction) {
		const { locale } = interaction;
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const currentSeasons = profile?.seasons;

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SKY_PROFILE_SET_SEASONS_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(SEASON_FLAGS_TO_SEASON_NAME_ENTRIES.length)
						.setMinValues(0)
						.setOptions(
							SEASON_FLAGS_TO_SEASON_NAME_ENTRIES.map(([flag, season]) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(currentSeasons && currentSeasons & Number(flag)))
									.setEmoji(SeasonNameToSeasonalEmoji[season])
									.setLabel(t(`seasons.${season}`, { lng: locale, ns: "general" }))
									.setValue(flag),
							),
						)
						.setPlaceholder("Select the seasons you participated in!"),
				),
				SKY_PROFILE_BACK_TO_START_ACTION_ROW,
			],
			content: "",
			embeds: [],
		});
	}

	private static async showPlatformsSelectMenu(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const currentPlatforms = profile?.platform;

		await interaction.update({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SKY_PROFILE_SET_PLATFORMS_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(PLATFORM_FLAGS_TO_STRING_ENTRIES.length)
						.setMinValues(0)
						.setOptions(
							PLATFORM_FLAGS_TO_STRING_ENTRIES.map(([flag, platform]) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(currentPlatforms && currentPlatforms & Number(flag)))
									.setEmoji(resolvePlatformToEmoji(platform))
									.setLabel(platform)
									.setValue(flag),
							),
						)
						.setPlaceholder("Select the platforms you play on!"),
				),
				SKY_PROFILE_BACK_TO_START_ACTION_ROW,
			],
			content: "",
			embeds: [],
		});
	}

	public static setName(interaction: ModalMessageModalSubmitInteraction) {
		const name = interaction.fields.getTextInputValue(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID).trim();
		return this.set(interaction, { name });
	}

	public static setDescription(interaction: ModalMessageModalSubmitInteraction) {
		const description = interaction.fields
			.getTextInputValue(SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID)
			.trim();

		return this.set(interaction, { description });
	}

	public static async setWingedLight(interaction: ModalMessageModalSubmitInteraction) {
		const wingedLight = interaction.fields
			.getTextInputValue(SKY_PROFILE_SET_WINGED_LIGHT_INPUT_CUSTOM_ID)
			.trim();

		const wingedLightNumber = Number(wingedLight);

		if (!Number.isInteger(wingedLightNumber)) {
			await interaction.reply({
				content: `Please enter an integer between ${MINIMUM_WINGED_LIGHT} and ${MAXIMUM_WINGED_LIGHT}.`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		return this.set(interaction, { winged_light: wingedLightNumber });
	}

	public static setCountry(interaction: ModalMessageModalSubmitInteraction) {
		const country = interaction.fields
			.getTextInputValue(SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID)
			.trim();

		return this.set(interaction, { country });
	}

	public static setSpot(interaction: ModalMessageModalSubmitInteraction) {
		const spot = interaction.fields.getTextInputValue(SKY_PROFILE_SET_SPOT_INPUT_CUSTOM_ID).trim();
		return this.set(interaction, { spot });
	}

	public static async setSeasons(interaction: StringSelectMenuInteraction) {
		return this.set(interaction, {
			seasons: interaction.values.reduce((bit, value) => bit | Number(value), 0),
		});
	}

	public static async setPlatform(interaction: StringSelectMenuInteraction) {
		return this.set(interaction, {
			platform: interaction.values.reduce((bit, value) => bit | Number(value), 0),
		});
	}

	private static async setCatalogueProgression(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		await Profile.set(interaction, { catalogue_progression: !profile?.catalogueProgression });
	}

	public static iconRoute(userId: Snowflake, hash: string) {
		return `sky_profiles/icons/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}`;
	}

	public static thumbnailRoute(userId: Snowflake, hash: string) {
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
			| ButtonInteraction
			| ChatInputCommandInteraction
			| ModalMessageModalSubmitInteraction
			| StringSelectMenuInteraction,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const embedData = await profile?.embed(interaction);
		const embed = embedData?.embed;
		const missing = embedData?.missing;

		const baseReplyOptions = {
			components: [SKY_PROFILE_EDIT_ACTION_ROW],
			content: embed
				? missing
					? `${missing}`
					: ""
				: "You do not have a Sky profile yet. Build one!",
			embeds: embed ? [embed] : [],
		};

		await (interaction instanceof ChatInputCommandInteraction
			? interaction.deferred
				? interaction.editReply(baseReplyOptions)
				: interaction.reply({ ...baseReplyOptions, flags: MessageFlags.Ephemeral })
			: interaction.update(baseReplyOptions));
	}

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
	public async embed(
		interaction:
			| ButtonInteraction
			| ChatInputCommandInteraction
			| StringSelectMenuInteraction
			| ModalSubmitInteraction
			| UserContextMenuCommandInteraction,
	) {
		const { locale } = interaction;
		const hearts = await commands.heart.heartCount(this.userId);

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
		} = this;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFooter({ iconURL: formatEmojiURL(MISCELLANEOUS_EMOJIS.Heart.id), text: String(hearts) });

		const descriptions = [];
		const fields = [];
		const missing = [];

		if (typeof seasons === "number") {
			if (seasons !== 0) {
				descriptions.push(resolveBitsToSeasons(seasons).join(" "));
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
			embed.setDescription(descriptions.join("\n"));
		}

		if (thumbnailURL) {
			embed.setThumbnail(thumbnailURL);
		} else {
			missing.push("- Use the command to upload a thumbnail!");
		}

		if (name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name };

			if (iconURL) {
				embedAuthorOptions.iconURL = iconURL;
			} else {
				missing.push("- Use the command to upload an icon!");
			}

			embed.setAuthor(embedAuthorOptions);
		} else {
			missing.push("- Set your name!");
		}

		if (typeof wingedLight === "number") {
			fields.push({
				name: "Winged Light",
				value:
					wingedLight === 0
						? "Capeless"
						: wingedLight === MAXIMUM_WINGED_LIGHT
							? `${wingedLight} (Max ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
							: String(wingedLight),
				inline: true,
			});
		} else {
			missing.push("- Set the winged light you have!");
		}

		if (spirit) {
			fields.push({
				name: "Favourite Spirit",
				value: t(`spiritNames.${spirit}`, { lng: locale, ns: "general" }),
				inline: true,
			});
		} else {
			missing.push("- Use the command to set your favourite spirit!");
		}

		if (country) {
			fields.push({ name: "Country", value: country, inline: true });
		} else {
			missing.push("- Set your country!");
		}

		if (spot) {
			fields.push({ name: "Favourite Spot", value: spot, inline: true });
		} else {
			missing.push("- Set your favourite spot!");
		}

		if (typeof platform === "number") {
			if (platform !== 0) {
				fields.push({
					name: "Platform",
					value: resolveBitsToPlatform(platform).join("\n"),
					inline: true,
				});
			}
		} else {
			missing.push("- Use the select menu to show what platforms you play on!");
		}

		if (typeof catalogueProgression === "boolean") {
			if (catalogueProgression) {
				const catalogue = await Catalogue.fetch(userId).catch(() => null);
				const allProgress = catalogue?.allProgress(true) ?? 0;
				fields.push({ name: "Catalogue Progression", value: `${allProgress}%`, inline: true });
			}
		} else {
			missing.push("- Set if you want to share your catalogue progression!");
		}

		if (fields.length > 4 && fields.length % 3 === 2) {
			fields.push({ name: "\u200B", value: "\u200B", inline: true });
		}

		embed.setFields(fields);
		return { embed, missing: missing.join("\n") || null };
	}
}
