import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	type UserContextMenuCommandInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ModalBuilder,
	StringSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { PlatformFlags, resolvePlatformToBits } from "../../Structures/Platforms.js";
import Profile from "../../Structures/Profile.js";
import { MAXIMUM_WINGED_LIGHT, MINIMUM_WINGED_LIGHT, Platform, Season } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export const SKY_PROFILE_MODAL = "SKY_PROFILE_MODAL" as const;
export const SKY_PROFILE_TEXT_INPUT_DESCRIPTION = "SKY_PROFILE_DESCRIPTION" as const;
export const SKY_PROFILE_PLATFORM_CUSTOM_ID = "SKY_PROFILE_PLATFORM_CUSTOM_ID" as const;
const SKY_MAXIMUM_NAME_LENGTH = 16 as const;
const SKY_MINIMUM_IMAGE_URL_LENGTH = 9 as const;
const SKY_MAXIMUM_IMAGE_URL_LENGTH = 150 as const;
const SKY_MINIMUM_COUNTRY_LENGTH = 2 as const;
const SKY_MAXIMUM_COUNTRY_LENGTH = 60 as const;

export default class implements ChatInputCommand {
	public readonly name = "sky-profile";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;

		switch (options.getSubcommandGroup() ?? options.getSubcommand()) {
			case "set":
				await this.set(interaction);
				return;
			case "show":
				await this.show(interaction);
		}
	}

	public async set(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "country":
				await this.setCountry(interaction);
				return;
			case "description":
				await this.setDescription(interaction);
				return;
			case "icon":
				await this.setIcon(interaction);
				return;
			case "name":
				await this.setName(interaction);
				return;
			case "platform":
				await this.setPlatform(interaction);
				return;
			case "season-started":
				await this.setSeason(interaction);
				return;
			case "thumbnail":
				await this.setThumbnail(interaction);
				return;
			case "winged-light":
				await this.setWingedLight(interaction);
		}
	}

	public async setCountry(interaction: ChatInputCommandInteraction) {
		const country = interaction.options.getString("country", true);
		await Profile.set(interaction, { country });
	}

	public async setDescription(interaction: ChatInputCommandInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);

		const textInput = new TextInputBuilder()
			.setCustomId(SKY_PROFILE_TEXT_INPUT_DESCRIPTION)
			.setLabel("Type a lovely description about your Skykid.")
			.setMaxLength(4_000)
			.setStyle(TextInputStyle.Paragraph);

		if (profile?.description) textInput.setValue(profile.description);
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
			await interaction.reply({ content: "Please use a valid URL!", ephemeral: true });
			return;
		}

		await Profile.set(interaction, { icon });
	}

	public async setName(interaction: ChatInputCommandInteraction) {
		const name = interaction.options.getString("name", true);
		await Profile.set(interaction, { name });
	}

	public async setPlatform(interaction: ChatInputCommandInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const currentPlatform = profile?.platform;

		await interaction.reply({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SKY_PROFILE_PLATFORM_CUSTOM_ID)
						.setMaxValues(Object.values(Platform).length)
						.setMinValues(0)
						.setOptions(
							Object.values(Platform).map((platform) =>
								new StringSelectMenuOptionBuilder()
									.setLabel(platform)
									.setValue(platform)
									.setDefault(
										Boolean(currentPlatform && PlatformFlags.has(currentPlatform, resolvePlatformToBits(platform))),
									),
							),
						)
						.setPlaceholder("Select the platforms you play on!"),
				),
			],
			ephemeral: true,
		});
	}

	public async setSeason(interaction: ChatInputCommandInteraction) {
		const season = interaction.options.getString("season", true);
		await Profile.set(interaction, { season_started: season });
	}

	public async setThumbnail(interaction: ChatInputCommandInteraction) {
		const thumbnail = interaction.options.getString("thumbnail", true);

		if (!thumbnail.startsWith("https://")) {
			await interaction.reply({ content: "Please use a valid URL!", ephemeral: true });
			return;
		}

		await Profile.set(interaction, { thumbnail });
	}

	public async setWingedLight(interaction: ChatInputCommandInteraction) {
		const wingedLight = interaction.options.getInteger("winged-light", true);
		await Profile.set(interaction, { winged_light: wingedLight });
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
			const userIsInvoker = user === null || user.id === interaction.user.id;

			await interaction.reply({
				content: `${userIsInvoker ? "You do" : `${user} does`} not have a Sky profile! Why not${
					userIsInvoker ? "" : " ask them to"
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
					type: ApplicationCommandOptionType.SubcommandGroup,
					name: "set",
					description: "Set some information for your Sky profile.",
					options: [
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "country",
							description: "Set the country of your Sky profile!",
							options: [
								{
									type: ApplicationCommandOptionType.String,
									name: "country",
									description: "What country are you from?",
									required: true,
									maxLength: SKY_MAXIMUM_COUNTRY_LENGTH,
									minLength: SKY_MINIMUM_COUNTRY_LENGTH,
								},
							],
						},
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "description",
							description: "Set the description of your Sky profile!",
						},
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "name",
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
							name: "icon",
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
							name: "platform",
							description: "Set the platform your Skykid plays on in your Sky profile!",
						},
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "season-started",
							description: "Set the season your Skykid started with in your Sky profile!",
							options: [
								{
									type: ApplicationCommandOptionType.String,
									name: "season",
									description: "What season did you start with?",
									choices: Object.values(Season).map((season) => ({ name: season, value: season })),
									required: true,
								},
							],
						},
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "thumbnail",
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
							name: "winged-light",
							description:
								"Set the maximum number of winged light your Skykid could possibly have in your Sky profile!",
							options: [
								{
									type: ApplicationCommandOptionType.Integer,
									name: "winged-light",
									description: "Provide the maximum number of winged light you can possibly have.",
									required: true,
									max_value: MAXIMUM_WINGED_LIGHT,
									minValue: MINIMUM_WINGED_LIGHT,
								},
							],
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
