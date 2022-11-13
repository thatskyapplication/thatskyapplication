import type {
	ApplicationCommandData,
	ChatInputCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import Profile from "../../Structures/Profile.js";
import type { ChatInputCommand } from "../index.js";

export const SKY_PROFILE_MODAL = "SKY_PROFILE_MODAL" as const;
export const SKY_PROFILE_TEXT_INPUT_DESCRIPTION = "SKY_PROFILE_DESCRIPTION" as const;
const SKY_MAXIMUM_NAME_LENGTH = 16 as const;
const SKY_MINIMUM_IMAGE_URL_LENGTH = 9 as const;
const SKY_MAXIMUM_IMAGE_URL_LENGTH = 150 as const;

export default class implements ChatInputCommand {
	public readonly name = "sky-profile";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "set-description":
				await this.setDescription(interaction);
				return;
			case "set-icon":
				await this.setIcon(interaction);
				return;
			case "set-name":
				await this.setName(interaction);
				return;
			case "set-thumbnail":
				await this.setThumbnail(interaction);
				return;
			case "show":
				await this.show(interaction);
		}
	}

	public async setDescription(interaction: ChatInputCommandInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_TEXT_INPUT_DESCRIPTION)
			.setLabel("Type a lovely description about your Skykid.")
			.setMaxLength(4_000)
			.setStyle(TextInputStyle.Paragraph);

		if (profile?.description) {
			textInput.setValue(profile.description);
		}

		const actionRow = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput);

		const modal = new ModalBuilder()
			.setComponents(actionRow)
			.setCustomId(SKY_PROFILE_MODAL)
			.setTitle("Set your Sky profile description!");

		await interaction.showModal(modal);
	}

	public async setIcon(interaction: ChatInputCommandInteraction) {
		const icon = interaction.options.getString("icon", true);

		if (!icon.startsWith("https://")) {
			await interaction.reply({
				content: "Please use a valid URL!",
				ephemeral: true,
			});

			return;
		}

		await Profile.set(interaction, { icon });
	}

	public async setName(interaction: ChatInputCommandInteraction) {
		const name = interaction.options.getString("name", true);
		await Profile.set(interaction, { name });
	}

	public async setThumbnail(interaction: ChatInputCommandInteraction) {
		const thumbnail = interaction.options.getString("thumbnail", true);

		if (!thumbnail.startsWith("https://")) {
			await interaction.reply({
				content: "Please use a valid URL!",
				ephemeral: true,
			});

			return;
		}

		await Profile.set(interaction, { thumbnail });
	}

	public async show(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		const user = interaction.options.getUser("user");
		const ephemeral = interaction.isUserContextMenuCommand() || (interaction.options.getBoolean("ephemeral") ?? false);

		if (user?.bot) {
			await interaction.reply({
				content: "Do bots have Sky profiles? Hm. Who knows?",
				ephemeral,
			});

			return;
		}

		const profile = await Profile.fetch(user?.id ?? interaction.user.id).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: `${user === null ? "You do" : `${user} does`} not have a Sky profile! Why not ${
					user === null ? "" : "ask them to"
				} create one?`,
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			embeds: [await profile.embed(interaction.guild)],
			ephemeral,
		});
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "The command related to everything about your Sky profile.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "set-description",
					description: "Set the description of your Sky profile!",
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "set-name",
					description: "Set the name of your Skykid in your Sky profile!",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "name",
							description: "Provide your in-game name.",
							required: true,
							maxLength: SKY_MAXIMUM_NAME_LENGTH,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "set-icon",
					description: "Set the icon of your Skykid in your Sky profile!",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "icon",
							description: "Provide a URL to show as your author icon.",
							required: true,
							minLength: SKY_MINIMUM_IMAGE_URL_LENGTH,
							maxLength: SKY_MAXIMUM_IMAGE_URL_LENGTH,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "set-thumbnail",
					description: "Set the thumbnail of your Skykid in your Sky profile!",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "thumbnail",
							description: "Provide a URL to show as your thumbnail.",
							required: true,
							minLength: SKY_MINIMUM_IMAGE_URL_LENGTH,
							maxLength: SKY_MAXIMUM_IMAGE_URL_LENGTH,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "show",
					description: "Shows the Sky profile of someone.",
					options: [
						{
							type: ApplicationCommandOptionType.User,
							name: "user",
							description: "The user whose Sky profile you wish to see.",
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "ephemeral",
							description: "Whether the response should be ephemeral. By default, the response is shown.",
						},
					],
				},
			],
		};
	}
}
