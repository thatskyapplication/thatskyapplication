import type { ChatInputCommandInteraction, EmbedAuthorOptions, Guild, ModalSubmitInteraction, Snowflake } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";
import { Table } from "../Utility/Constants.js";
import pg from "../pg.js";

interface RawProfileData {
	id: number;
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
}

interface ProfileData {
	id: RawProfileData["id"];
	userId: RawProfileData["user_id"];
	name: RawProfileData["name"];
	icon: RawProfileData["icon"];
	thumbnail: RawProfileData["thumbnail"];
	description: RawProfileData["description"];
}

interface ProfileSetData {
	name?: string;
	icon?: string;
	thumbnail?: string;
	description?: string;
}

type ProfilePatchData = Omit<RawProfileData, "id" | "user_id">;

export default class Profile {
	public readonly id: ProfileData["id"];

	public readonly userId: ProfileData["userId"];

	public name!: ProfileData["name"];

	public icon!: ProfileData["icon"];

	public thumbnail!: ProfileData["thumbnail"];

	public description!: ProfileData["description"];

	public constructor(profile: RawProfileData) {
		this.id = profile.id;
		this.userId = profile.user_id;
		this.patch(profile);
	}

	private patch(data: ProfilePatchData) {
		this.name = data.name;
		this.icon = data.icon;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
	}

	public static async fetch(userId: Snowflake) {
		const profilePackets = await pg<RawProfileData>(Table.Profiles).where("user_id", userId);

		if (profilePackets.length === 0) {
			throw new Error("No profile found.");
		}

		return new this(profilePackets[0]);
	}

	public static async set(interaction: ChatInputCommandInteraction | ModalSubmitInteraction, data: ProfileSetData) {
		let profile = await this.fetch(interaction.user.id).catch(() => null);

		if (profile) {
			const [profilePacket] = await pg<RawProfileData>(Table.Profiles)
				.update(data)
				.where("id", profile.id)
				.returning("*");

			profile.patch(profilePacket);
		} else {
			const [profilePacket] = await pg<RawProfileData>(Table.Profiles).insert({
				...data,
				user_id: interaction.user.id,
			}, "*");

			profile = new this(profilePacket);
		}

		await interaction.reply({
			content: "Your profile has been updated!",
			embeds: [await profile.embed(interaction.guild)],
			ephemeral: true,
		});
	}

	public static async setDescription(interaction: ModalSubmitInteraction) {
		const description = interaction.fields.getTextInputValue(SKY_PROFILE_TEXT_INPUT_DESCRIPTION).trim();
		return this.set(interaction, { description });
	}

	public async embed(guild: Guild | null) {
		const me = await guild?.members.fetchMe();

		const embed = new EmbedBuilder()
			.setColor(me?.displayColor ?? 0)
			.setDescription(this.description ?? "Hi! I'm an amazing Skykid.")
			.setThumbnail(this.thumbnail);

		if (this.name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name: this.name };

			if (this.icon) {
				embedAuthorOptions.iconURL = this.icon;
			}

			embed.setAuthor(embedAuthorOptions);
		}

		return embed;
	}
}
