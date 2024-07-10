import type { Buffer } from "node:buffer";
import { URL } from "node:url";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ActionRowBuilder,
	type Attachment,
	type ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	EmbedBuilder,
	ModalBuilder,
	type ModalSubmitInteraction,
	type Snowflake,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
	TextInputBuilder,
	TextInputStyle,
	type UserContextMenuCommandInteraction,
	chatInputApplicationCommandMention,
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
} from "../Utility/Constants.js";
import { MISCELLANEOUS_EMOJIS, formatEmoji, formatEmojiURL } from "../Utility/emojis.js";
import { resolveBitsToSeasons } from "../catalogue/spirits/seasons/index.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { Catalogue } from "./Catalogue.js";
import { resolveBitsToPlatform } from "./Platforms.js";

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

interface ProfileSetData {
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

export enum ProfileEditType {
	Name = "Name",
	Description = "Description",
	Country = "Country",
}

export const PROFILE_EDIT_TYPE_VALUES = Object.values(ProfileEditType);

function isProfileEditType(value: unknown): value is ProfileEditType {
	return PROFILE_EDIT_TYPE_VALUES.includes(value as ProfileEditType);
}

export const SKY_PROFILE_EDIT_CUSTOM_ID = "SKY_PROFILE_EDIT_CUSTOM_ID" as const;
export const SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID = "SKY_PROFILE_SET_NAME_MODAL_CUSTOM_ID" as const;
export const SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID = "SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_MODAL_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID =
	"SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID" as const;

export const SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID =
	"SKY_PROFILE_SET_COUNTRY_MODAL_CUSTOM_ID" as const;
export const SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID =
	"SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID" as const;

export const PROFILE_EDIT_SELECT_MENU = new StringSelectMenuBuilder()
	.setCustomId(SKY_PROFILE_EDIT_CUSTOM_ID)
	.setMaxValues(1)
	.setMinValues(1)
	.setOptions(
		PROFILE_EDIT_TYPE_VALUES.map((profileEditType) =>
			new StringSelectMenuOptionBuilder().setLabel(profileEditType).setValue(profileEditType),
		),
	);

export const enum AssetType {
	Icon = 0,
	Thumbnail = 1,
}

const SKY_PROFILE_MAXIMUM_NAME_LENGTH = 16 as const;
const SKY_PROFILE_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
const SKY_PROFILE_MINIMUM_COUNTRY_LENGTH = 2 as const;
const SKY_PROFILE_MAXIMUM_COUNTRY_LENGTH = 60 as const;
const ANIMATED_HASH_PREFIX = "a_" as const;

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
		interaction: ChatInputCommandInteraction | StringSelectMenuInteraction | ModalSubmitInteraction,
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

		const { embed } = await profile.embed(interaction);
		await interaction.update({ content: "", embeds: [embed] });

		// const baseReplyOptions = { content: "Your profile has been updated!", embeds: [embed] };

		// if (interaction instanceof StringSelectMenuInteraction) {
		// 	await interaction.update({
		// 		...baseReplyOptions,
		// 		components: [],
		// 	});
		// } else if (interaction.deferred) {
		// 	await interaction.editReply(baseReplyOptions);
		// } else {
		// 	await interaction.reply({
		// 		...baseReplyOptions,
		// 		ephemeral: true,
		// 	});
		// }

		// if (unfilled) {
		// await interaction.followUp({ content: unfilled, ephemeral: true });
		// }
	}

	public static async setAsset(
		interaction: ChatInputCommandInteraction,
		{ contentType, url }: Attachment,
		type: AssetType,
	) {
		await interaction.deferReply({ ephemeral: true });
		const { user } = interaction;
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

		await Profile.set(interaction, {
			[type === AssetType.Icon ? "icon" : "thumbnail"]: hashedBuffer,
		});
	}

	public static async showNameModal(interaction: StringSelectMenuInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID)
			.setLabel("What's your name?")
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

	public static setName(interaction: ModalSubmitInteraction) {
		const name = interaction.fields.getTextInputValue(SKY_PROFILE_SET_NAME_INPUT_CUSTOM_ID).trim();
		return this.set(interaction, { name });
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

	public static setDescription(interaction: ModalSubmitInteraction) {
		const description = interaction.fields
			.getTextInputValue(SKY_PROFILE_SET_DESCRIPTION_INPUT_CUSTOM_ID)
			.trim();

		return this.set(interaction, { description });
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

	public static setCountry(interaction: ModalSubmitInteraction) {
		const country = interaction.fields
			.getTextInputValue(SKY_PROFILE_SET_COUNTRY_INPUT_CUSTOM_ID)
			.trim();

		return this.set(interaction, { country });
	}

	public static async edit(interaction: StringSelectMenuInteraction) {
		const profileEditType = interaction.values[0];

		if (!isProfileEditType(profileEditType)) {
			pino.warn(interaction, "Received an unknown profile edit type");

			await interaction.update({
				components: [],
				content: "Unknown profile edit type. Please try again",
				embeds: [],
			});

			return;
		}

		switch (profileEditType) {
			case ProfileEditType.Name: {
				await this.showNameModal(interaction);
				return;
			}
			case ProfileEditType.Description: {
				await this.showDescriptionModal(interaction);
				return;
			}
			case ProfileEditType.Country: {
				await this.showCountryModal(interaction);
				return;
			}
		}
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

	public async embed(
		interaction:
			| ChatInputCommandInteraction
			| StringSelectMenuInteraction
			| ModalSubmitInteraction
			| UserContextMenuCommandInteraction,
	) {
		const { locale } = interaction;
		const hearts = await commands.heart.heartCount(this.userId);
		const skyProfileCommand = commands.skyprofile;
		const commandId = skyProfileCommand.id;
		const commandName = skyProfileCommand.data.name;

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
		const unfilled = [];

		if (seasons) {
			descriptions.push(resolveBitsToSeasons(seasons).join(" "));
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"seasons",
					commandId,
				)} to tell others what seasons you participated in!`,
			);
		}

		if (description) {
			descriptions.push(description);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"description",
					commandId,
				)} to set a description!`,
			);
		}

		if (descriptions.length > 0) {
			embed.setDescription(descriptions.join("\n"));
		}

		if (thumbnailURL) {
			embed.setThumbnail(thumbnailURL);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"thumbnail",
					commandId,
				)} to set a thumbnail on the embed!`,
			);
		}

		if (name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name };

			if (iconURL) {
				embedAuthorOptions.iconURL = iconURL;
			} else if (commandId) {
				unfilled.push(
					`- Use ${chatInputApplicationCommandMention(
						commandName,
						"set",
						"icon",
						commandId,
					)} to set an icon by your name!`,
				);
			}

			embed.setAuthor(embedAuthorOptions);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(commandName, "set", "name", commandId)} to set your name!`,
			);
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
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"winged-light",
					commandId,
				)} to flex how much winged light you have!`,
			);
		}

		if (spirit) {
			fields.push({
				name: "Favourite Spirit",
				value: t(`spiritNames.${spirit}`, { lng: locale, ns: "general" }),
				inline: true,
			});
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"spirit",
					commandId,
				)} to set your favourite spirit!`,
			);
		}

		if (country) {
			fields.push({ name: "Country", value: country, inline: true });
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"country",
					commandId,
				)} to tell others where you're from!`,
			);
		}

		if (spot) {
			fields.push({ name: "Favourite Spot", value: spot, inline: true });
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"spot",
					commandId,
				)} to tell others where your favourite spot to hang out is!`,
			);
		}

		if (platform) {
			fields.push({
				name: "Platform",
				value: resolveBitsToPlatform(platform).join("\n"),
				inline: true,
			});
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"platform",
					commandId,
				)} to show what platforms you play on!`,
			);
		}

		if (typeof catalogueProgression === "boolean") {
			const catalogue = await Catalogue.fetch(userId).catch(() => null);
			const allProgress = catalogue?.allProgress(true) ?? 0;
			fields.push({ name: "Catalogue Progression", value: `${allProgress}%`, inline: true });
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"catalogue-progression",
					commandId,
				)} to show your catalogue progression!`,
			);
		}

		if (fields.length > 4 && fields.length % 3 === 2) {
			fields.push({ name: "\u200B", value: "\u200B", inline: true });
		}

		embed.setFields(fields);
		return { embed, unfilled: unfilled.join("\n") || null };
	}
}
