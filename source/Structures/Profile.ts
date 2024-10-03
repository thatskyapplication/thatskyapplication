import type { Buffer } from "node:buffer";
import { URL } from "node:url";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ActionRowBuilder,
	type Attachment,
	ButtonBuilder,
	type ButtonInteraction,
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

export const enum AssetType {
	Icon = 0,
	Thumbnail = 1,
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
			missing.push("- Set your favourite spirit!");
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
