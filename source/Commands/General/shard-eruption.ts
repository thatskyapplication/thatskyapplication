import {
	type ChatInputCommandInteraction,
	type Locale,
	type MessageComponentInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	EmbedBuilder,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { DateTime } from "luxon";
import { DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import {
	chatInputApplicationCommandMention,
	dateString,
	resolveShardEruptionEmoji,
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../../Utility/Utility.js";
import { TIME_ZONE, todayDate } from "../../Utility/dates.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import type { ChatInputCommand } from "../index.js";

export const SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID =
	"SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID" as const;

export const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS = [
	"SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID",
	"SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID",
] as const;

const SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH = SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.length;

const MAXIMUM_OPTION_NUMBER = 25 as const;
const DATE_FORMAT_STRING = "d LLLL" as const;

function generateShardEruptionSelectMenuOptions(date: DateTime, indexStart: number, offset: number, locale: Locale) {
	const options = [];
	const maximumIndex = MAXIMUM_OPTION_NUMBER + indexStart;

	for (let index = indexStart; index < maximumIndex; index++) {
		const shardNow = shardEruption(index + offset);

		const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
			.setLabel(dateString(date.plus({ days: index }), locale))
			.setValue(String(index + offset));

		if (shardNow) {
			stringSelectMenuOption.setEmoji(resolveShardEruptionEmoji(shardNow.strong));
		} else {
			stringSelectMenuOption.setDescription("No shard eruption.");
		}

		options.push(stringSelectMenuOption);
	}

	return options;
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "shard-eruption",
		description: "View the shard eruption schedule.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "browse",
				description: "Browse the shard eruptions.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "today",
				description: "View the shard eruption today.",
			},
		],
	} as const;

	public id: Snowflake | null = null;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "browse":
				await this.browse(interaction);
				return;
			case "today":
				await this.today(interaction);
		}
	}

	private async hasExpired(interaction: ChatInputCommandInteraction | MessageComponentInteraction) {
		const today = todayDate();
		const fromMessageComponent = interaction.isMessageComponent();

		if (fromMessageComponent) {
			const { message } = interaction;
			const expiresAt = DateTime.fromMillis(message.createdTimestamp, { zone: TIME_ZONE }).endOf("day");

			if (today > expiresAt) {
				const hasEmbeds = message.embeds.length > 0;

				const expiryMessage = `This command has expired. Run ${
					this.id
						? chatInputApplicationCommandMention(this.id, this.data.name, this.data.options[hasEmbeds ? 1 : 0].name)
						: "it"
				} again!`;

				if (hasEmbeds) {
					await interaction.update({ components: [] });

					await interaction.followUp({
						content: expiryMessage,
						ephemeral: true,
					});
				} else {
					await interaction.update({
						components: [],
						content: expiryMessage,
					});
				}

				return true;
			}
		}

		return false;
	}

	public async today(
		interaction: ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction,
		offset = 0,
	) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		if (await this.hasExpired(interaction)) return;
		const { locale } = interaction;
		const shardYesterday = shardEruption(offset - 1);
		const shardToday = shardEruption(offset);
		const shard = shardEruption();
		const shardTomorrow = shardEruption(offset + 1);

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(dateString(todayDate().plus({ days: offset }), locale));

		const buttonYesterday = new ButtonBuilder()
			.setCustomId(`${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`)
			.setLabel("Back")
			.setStyle(ButtonStyle.Primary);

		const button = new ButtonBuilder()
			.setCustomId(SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID)
			.setDisabled(offset === 0)
			.setLabel("Today")
			.setStyle(ButtonStyle.Success);

		const buttonTomorrow = new ButtonBuilder()
			.setCustomId(`${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`)
			.setLabel("Next")
			.setStyle(ButtonStyle.Primary);

		if (shardYesterday) buttonYesterday.setEmoji(resolveShardEruptionEmoji(shardYesterday.strong));

		if (shardToday) {
			embed
				.setFields(
					{
						name: "Information",
						value: shardEruptionInformationString(shardToday, false, locale),
						inline: true,
					},
					{
						name: "Timestamps",
						value: shardEruptionTimestampsString(shardToday),
						inline: true,
					},
				)
				.setImage(String(shardToday.url));
		} else {
			embed.setDescription(`There are no shard eruptions ${offset === 0 ? "today" : "on this day"}.`);
		}

		if (shard) button.setEmoji(resolveShardEruptionEmoji(shard.strong));
		if (shardTomorrow) buttonTomorrow.setEmoji(resolveShardEruptionEmoji(shardTomorrow.strong));

		const response = {
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					buttonYesterday,
					button,
					buttonTomorrow,
					new ButtonBuilder()
						.setCustomId(`${SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID}§${offset}`)
						.setEmoji("🌐")
						.setLabel("Browse")
						.setStyle(ButtonStyle.Secondary),
				),
			],
			embeds: [embed],
		};

		if (interaction.isMessageComponent()) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public async browse(interaction: ButtonInteraction | ChatInputCommandInteraction, offset = 0) {
		if (await this.hasExpired(interaction)) return;
		const { locale } = interaction;
		const shardToday = todayDate().plus({ days: offset });

		const response = {
			components: [
				...SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.map((customId, index) => {
					const currentIndex = MAXIMUM_OPTION_NUMBER * index;

					return new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
						new StringSelectMenuBuilder()
							.setCustomId(customId)
							.setMaxValues(1)
							.setMinValues(1)
							.setPlaceholder(
								`${shardToday.plus({ days: currentIndex }).toFormat(DATE_FORMAT_STRING)} - ${shardToday
									.plus({ days: MAXIMUM_OPTION_NUMBER * (index + 1) - 1 })
									.toFormat(DATE_FORMAT_STRING)}`,
							)
							.setOptions(generateShardEruptionSelectMenuOptions(shardToday, currentIndex, offset, locale)),
					);
				}),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(
							`${SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID}§${
								offset - MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
							}`,
						)
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID)
						.setDisabled(offset === 0)
						.setLabel("Today")
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(
							`${SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID}§${
								offset + MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
							}`,
						)
						.setLabel("Next")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [],
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}
})();
