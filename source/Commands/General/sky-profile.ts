import {
	type ApplicationCommandData,
	type Attachment,
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	type Snowflake,
	ActionRowBuilder,
	ALLOWED_EXTENSIONS,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ModalBuilder,
	StringSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
	StringSelectMenuOptionBuilder,
	UserContextMenuCommandInteraction,
} from "discord.js";
import { PlatformFlagsToString, resolvePlatformToEmoji } from "../../Structures/Platforms.js";
import Profile, { AssetType } from "../../Structures/Profile.js";
import { SeasonFlagsToString } from "../../Structures/Seasons.js";
import Spirits from "../../Structures/Spirits/index.js";
import { MAXIMUM_WINGED_LIGHT, MINIMUM_WINGED_LIGHT, SeasonToSeasonalEmoji } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis } from "../../Utility/Utility.js";
import COMMANDS, { type AutocompleteCommand } from "../index.js";

export const SKY_PROFILE_MODAL = "SKY_PROFILE_MODAL" as const;
export const SKY_PROFILE_TEXT_INPUT_DESCRIPTION = "SKY_PROFILE_DESCRIPTION" as const;
export const SKY_PROFILE_PLATFORM_CUSTOM_ID = "SKY_PROFILE_PLATFORM_CUSTOM_ID" as const;
export const SKY_PROFILE_SEASONS_CUSTOM_ID = "SKY_PROFILE_SEASONS_CUSTOM_ID" as const;
const SKY_MAXIMUM_DESCRIPTION_LENGTH = 3_000 as const;
const SKY_MAXIMUM_NAME_LENGTH = 16 as const;
const SKY_MAXIMUM_ASSET_SIZE = 5_000_000 as const;
const SKY_MINIMUM_COUNTRY_LENGTH = 2 as const;
const SKY_MAXIMUM_COUNTRY_LENGTH = 60 as const;
const SKY_MINIMUM_SPOT_LENGTH = 2 as const;
const SKY_MAXIMUM_SPOT_LENGTH = 50 as const;

export default new (class implements AutocompleteCommand {
	public readonly data = {
		name: "sky-profile",
		description: "The command related to everything about your Sky profile.",
		type: ApplicationCommandType.ChatInput,
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
								type: ApplicationCommandOptionType.Attachment,
								name: "icon",
								description: "Upload your icon.",
								required: true,
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
						name: "seasons",
						description: "Set the seasons your Skykid participated in for your Sky profile!",
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "spirit",
						description: "Set the favourite spirit of your Skykid in your Sky profile!",
						options: [
							{
								type: ApplicationCommandOptionType.String,
								name: "spirit",
								description: "What's your favourite spirit?",
								required: true,
								autocomplete: true,
							},
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "spot",
						description: "Set the favourite spot of your Skykid in your Sky profile!",
						options: [
							{
								type: ApplicationCommandOptionType.String,
								name: "spot",
								description: "Where's your favourite spot to hang out?",
								required: true,
								minLength: SKY_MINIMUM_SPOT_LENGTH,
								maxLength: SKY_MAXIMUM_SPOT_LENGTH,
							},
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "thumbnail",
						description: "Set the thumbnail of your Skykid in your Sky profile!",
						options: [
							{
								type: ApplicationCommandOptionType.Attachment,
								name: "thumbnail",
								description: "Upload your thumbnail.",
								required: true,
							},
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "winged-light",
						description: "Set the maximum number of winged light your Skykid could possibly have in your Sky profile!",
						options: [
							{
								type: ApplicationCommandOptionType.Integer,
								name: "winged-light",
								description: "Provide the maximum number of winged light you can possibly have.",
								required: true,
								maxValue: MAXIMUM_WINGED_LIGHT,
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
						name: "hide",
						description: "Ensure only you can see the response. By default, the response is shown.",
					},
				],
			},
		],
	} as const satisfies Readonly<ApplicationCommandData>;

	public id: Snowflake | null = null;

	public async autocomplete(interaction: AutocompleteInteraction) {
		// This is the same as querying a spirit, so use that instead.
		await COMMANDS.spirit.autocomplete(interaction);
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (await cannotUseCustomEmojis(interaction)) return;
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
			case "seasons":
				await this.setSeasons(interaction);
				return;
			case "spirit":
				await this.setSpirit(interaction);
				return;
			case "spot":
				await this.setSpot(interaction);
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
			.setMaxLength(SKY_MAXIMUM_DESCRIPTION_LENGTH)
			.setStyle(TextInputStyle.Paragraph);

		if (profile?.description) textInput.setValue(profile.description);
		const actionRow = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput);

		const modal = new ModalBuilder()
			.setComponents(actionRow)
			.setCustomId(SKY_PROFILE_MODAL)
			.setTitle("Set your Sky profile description!");

		await interaction.showModal(modal);
	}

	private async validateAttachment(interaction: ChatInputCommandInteraction, { size, name }: Attachment) {
		if (size > SKY_MAXIMUM_ASSET_SIZE || !ALLOWED_EXTENSIONS.some((extension) => name.endsWith(`.${extension}`))) {
			await interaction.reply({
				content: `Please upload a valid attachment! It must be less than 5 megabytes and in any of the following formats:\n${ALLOWED_EXTENSIONS.map(
					(extension) => `- .${extension}`,
				).join("\n")}`,
				ephemeral: true,
			});

			return false;
		}

		return true;
	}

	public async setIcon(interaction: ChatInputCommandInteraction) {
		const icon = interaction.options.getAttachment("icon", true);
		if (!(await this.validateAttachment(interaction, icon))) return;
		await Profile.setAsset(interaction, icon, AssetType.Icon);
	}

	public async setName(interaction: ChatInputCommandInteraction) {
		const name = interaction.options.getString("name", true);
		await Profile.set(interaction, { name });
	}

	public async setPlatform(interaction: ChatInputCommandInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const currentPlatforms = profile?.platform;

		await interaction.reply({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SKY_PROFILE_PLATFORM_CUSTOM_ID)
						.setMaxValues(Object.values(PlatformFlagsToString).length)
						.setMinValues(0)
						.setOptions(
							Object.entries(PlatformFlagsToString).map(([flag, platform]) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(currentPlatforms && currentPlatforms & Number(flag)))
									.setEmoji(resolvePlatformToEmoji(platform))
									.setLabel(platform)
									.setValue(flag),
							),
						)
						.setPlaceholder("Select the platforms you play on!"),
				),
			],
			ephemeral: true,
		});
	}

	public async setSeasons(interaction: ChatInputCommandInteraction) {
		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const currentSeasons = profile?.seasons;

		await interaction.reply({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SKY_PROFILE_SEASONS_CUSTOM_ID)
						.setMaxValues(Object.values(SeasonFlagsToString).length)
						.setMinValues(0)
						.setOptions(
							Object.entries(SeasonFlagsToString).map(([flag, season]) =>
								new StringSelectMenuOptionBuilder()
									.setDefault(Boolean(currentSeasons && currentSeasons & Number(flag)))
									.setEmoji(SeasonToSeasonalEmoji[season])
									.setLabel(season)
									.setValue(flag),
							),
						)
						.setPlaceholder("Select the seasons you participated in!"),
				),
			],
			ephemeral: true,
		});
	}

	public async setSpirit(interaction: ChatInputCommandInteraction) {
		const query = interaction.options.getString("spirit", true);
		const spirit = Spirits.find(({ name }) => name === query);

		if (!spirit) {
			await interaction.reply({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				ephemeral: true,
			});

			return;
		}

		await Profile.set(interaction, { spirit: spirit.name });
	}

	public async setSpot(interaction: ChatInputCommandInteraction) {
		const spot = interaction.options.getString("spot", true);
		await Profile.set(interaction, { spot });
	}

	public async setThumbnail(interaction: ChatInputCommandInteraction) {
		const thumbnail = interaction.options.getAttachment("thumbnail", true);
		if (!(await this.validateAttachment(interaction, thumbnail))) return;
		await Profile.setAsset(interaction, thumbnail, AssetType.Thumbnail);
	}

	public async setWingedLight(interaction: ChatInputCommandInteraction) {
		const wingedLight = interaction.options.getInteger("winged-light", true);
		await Profile.set(interaction, { winged_light: wingedLight });
	}

	public async show(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		const user = interaction.options.getUser("user");

		const hide =
			interaction instanceof UserContextMenuCommandInteraction || (interaction.options.getBoolean("hide") ?? false);

		if (user?.bot) {
			await interaction.reply({
				content: "Do bots have Sky profiles? Hm. Who knows?",
				ephemeral: hide,
			});

			return;
		}

		const userIsInvoker = user === null || user.id === interaction.user.id;
		const profile = await Profile.fetch(user?.id ?? interaction.user.id).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: `${userIsInvoker ? "You do" : `${user} does`} not have a Sky profile! Why not${
					userIsInvoker ? "" : " ask them to"
				} create one?`,
				ephemeral: true,
			});

			return;
		}

		if ((profile.seasons || profile.platform) && (await cannotUseCustomEmojis(interaction))) return;
		const { embed, unfilled } = await profile.embed(interaction);
		await interaction.reply({ embeds: [embed], ephemeral: hide });
		if (unfilled && userIsInvoker) await interaction.followUp({ content: unfilled, ephemeral: true });
	}
})();
