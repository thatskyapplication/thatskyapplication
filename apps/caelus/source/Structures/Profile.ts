import {
	StringSelectMenuInteraction,
	type ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	type Guild,
	type ModalSubmitInteraction,
	type Snowflake,
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";
import commands from "../Commands/index.js";
import { MAXIMUM_WINGED_LIGHT } from "../Utility/Constants.js";
import pg, { Table } from "../pg.js";
import { resolveBitsToPlatform } from "./Platforms.js";

interface ProfilePacket {
	id: number;
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: number | null;
	season_started: string | null;
	platform: number | null;
}

interface ProfileData {
	id: ProfilePacket["id"];
	userId: ProfilePacket["user_id"];
	name: ProfilePacket["name"];
	icon: ProfilePacket["icon"];
	thumbnail: ProfilePacket["thumbnail"];
	description: ProfilePacket["description"];
	country: ProfilePacket["country"];
	wingedLight: ProfilePacket["winged_light"];
	seasonStarted: ProfilePacket["season_started"];
	platform: ProfilePacket["platform"];
}

interface ProfileSetData {
	name?: string;
	icon?: string;
	thumbnail?: string;
	description?: string;
	country?: string;
	winged_light?: number;
	season_started?: string;
	platform?: number;
}

type ProfilePatchData = Omit<ProfilePacket, "id" | "user_id">;

export default class Profile {
	public readonly id: ProfileData["id"];

	public readonly userId: ProfileData["userId"];

	public name!: ProfileData["name"];

	public icon!: ProfileData["icon"];

	public thumbnail!: ProfileData["thumbnail"];

	public description!: ProfileData["description"];

	public country!: ProfileData["country"];

	public wingedLight!: ProfileData["wingedLight"];

	public seasonStarted!: ProfileData["seasonStarted"];

	public platform!: ProfileData["platform"];

	public constructor(profile: ProfilePacket) {
		this.id = profile.id;
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
		this.seasonStarted = data.season_started;
		this.platform = data.platform;
	}

	public static async fetch(userId: Snowflake) {
		const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).where("user_id", userId);
		if (!profilePacket) throw new Error("No profile found.");
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
				.where("id", profile.id)
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

		const baseReplyOptions = {
			content: "Your profile has been updated!",
			embeds: [await profile.embed(interaction.guild)],
		};

		if (interaction instanceof StringSelectMenuInteraction) {
			await interaction.update({
				...baseReplyOptions,
				components: [],
			});
		} else {
			await interaction.reply({
				...baseReplyOptions,
				ephemeral: true,
			});
		}
	}

	public static async setDescription(interaction: ModalSubmitInteraction) {
		const description = interaction.fields.getTextInputValue(SKY_PROFILE_TEXT_INPUT_DESCRIPTION).trim();
		return this.set(interaction, { description });
	}

	public static async setPlatform(interaction: StringSelectMenuInteraction) {
		return this.set(interaction, { platform: interaction.values.reduce((bit, value) => bit | Number(value), 0) });
	}

	public async embed(guild: Guild | null) {
		const me = await guild?.members.fetchMe();
		const hearts = await commands.heart.heartCount(this.userId);
		const { name, icon, thumbnail, description, country, wingedLight, seasonStarted, platform } = this;

		const embed = new EmbedBuilder()
			.setColor(me?.displayColor ?? 0)
			.setDescription(description ?? "Hi! I'm an amazing Skykid.")
			.setFooter({ text: `Hearts: ${hearts}` })
			.setThumbnail(thumbnail);

		if (name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name };
			if (icon) embedAuthorOptions.iconURL = icon;
			embed.setAuthor(embedAuthorOptions);
		}

		if (country) embed.addFields({ name: "Country", value: country, inline: true });
		if (seasonStarted) embed.addFields({ name: "Season Started", value: seasonStarted, inline: true });

		if (typeof wingedLight === "number") {
			embed.addFields({
				name: "Winged Light",
				value:
					wingedLight === 0
						? "Capeless"
						: wingedLight === MAXIMUM_WINGED_LIGHT
						? `${wingedLight} (Max 🪽)`
						: String(wingedLight),
				inline: true,
			});
		}

		if (platform) {
			embed.addFields({
				name: "Platform",
				value: resolveBitsToPlatform(platform, me).join("\n"),
				inline: true,
			});
		}

		return embed;
	}
}
