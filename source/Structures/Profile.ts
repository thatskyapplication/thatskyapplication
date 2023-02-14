import type {
	ChatInputCommandInteraction,
	EmbedAuthorOptions,
	Guild,
	ModalSubmitInteraction,
	Snowflake,
} from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";
import commands from "../Commands/index.js";
import pg, { Table } from "../pg.js";

interface ProfilePacket {
	id: number;
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
}

interface ProfileData {
	id: ProfilePacket["id"];
	userId: ProfilePacket["user_id"];
	name: ProfilePacket["name"];
	icon: ProfilePacket["icon"];
	thumbnail: ProfilePacket["thumbnail"];
	description: ProfilePacket["description"];
}

interface ProfileSetData {
	name?: string;
	icon?: string;
	thumbnail?: string;
	description?: string;
}

type ProfilePatchData = Omit<ProfilePacket, "id" | "user_id">;

export default class Profile {
	public readonly id: ProfileData["id"];

	public readonly userId: ProfileData["userId"];

	public name!: ProfileData["name"];

	public icon!: ProfileData["icon"];

	public thumbnail!: ProfileData["thumbnail"];

	public description!: ProfileData["description"];

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
	}

	public static async fetch(userId: Snowflake) {
		const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).where("user_id", userId);
		if (!profilePacket) throw new Error("No profile found.");
		return new this(profilePacket);
	}

	public static async set(interaction: ChatInputCommandInteraction | ModalSubmitInteraction, data: ProfileSetData) {
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
		const hearts = await commands.heart.heartCount(this.userId);

		const embed = new EmbedBuilder()
			.setColor(me?.displayColor ?? 0)
			.setDescription(this.description ?? "Hi! I'm an amazing Skykid.")
			.setFooter({ text: `Hearts: ${hearts}` })
			.setThumbnail(this.thumbnail);

		if (this.name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name: this.name };
			if (this.icon) embedAuthorOptions.iconURL = this.icon;
			embed.setAuthor(embedAuthorOptions);
		}

		return embed;
	}
}
