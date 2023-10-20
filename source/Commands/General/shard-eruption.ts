import type { Dayjs } from "dayjs";
import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	formatEmoji,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR, Emoji } from "../../Utility/Constants.js";
import {
	cannotUseCustomEmojis,
	chatInputApplicationCommandMention,
	dateString,
	dayjsDate,
	resolveCurrencyEmoji,
	resolveShardEruptionEmoji,
	shardEruption,
	todayDate,
} from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export const SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID" as const;
export const SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID = "SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID" as const;
const MAXIMUM_OPTION_NUMBER = 25 as const;
const DATE_FORMAT_STRING = "D MMMM";

function generateShardEruptionSelectMenuOptions(date: Dayjs, offset: number) {
	const options = [];
	const maximumIndex = MAXIMUM_OPTION_NUMBER + offset;

	for (let index = offset; index < maximumIndex; index++) {
		const shardNow = shardEruption(index);

		const stringSelectMenuOption = new StringSelectMenuOptionBuilder()
			.setLabel(dateString(date.add(index, "days")))
			.setValue(String(index));

		if (shardNow) {
			stringSelectMenuOption.setEmoji(resolveShardEruptionEmoji(shardNow.dangerous));
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
				name: "today",
				description: "View the shard eruption today.",
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "view",
				description: "View a... view... of the shard eruptions.",
			},
		],
	} as const;

	public id: Snowflake | null = null;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "today":
				await this.today(interaction);
				return;
			case "view":
				await this.view(interaction);
		}
	}

	public async today(
		interaction: ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction,
		offset = 0,
	) {
		if (await cannotUseCustomEmojis(interaction, { components: [] })) return;
		const today = todayDate();
		const fromMessageComponent = interaction.isMessageComponent();

		if (fromMessageComponent) {
			const { message } = interaction;
			const expiresAt = dayjsDate(message.createdTimestamp).add(1, "day").startOf("day");

			if (today.isSame(expiresAt) || today.isAfter(expiresAt)) {
				const expiryMessage = `This command has expired. Run ${
					this.id ? chatInputApplicationCommandMention(this.id, this.data.name, this.data.options[1].name) : "it"
				} again!`;

				if (message.embeds.length > 0) {
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

				return;
			}
		}

		const shardYesterday = shardEruption(offset - 1);
		const shardToday = shardEruption(offset);
		const shard = shardEruption();
		const shardTomorrow = shardEruption(offset + 1);
		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setTitle(dateString(today.add(offset, "days")));

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

		if (shardYesterday) buttonYesterday.setEmoji(resolveShardEruptionEmoji(shardYesterday.dangerous));

		if (shardToday) {
			const { realm, map, dangerous, reward, timestamps, url } = shardToday;
			const emoji = resolveShardEruptionEmoji(dangerous);

			embed
				.setFields(
					{
						name: "Information",
						value: `${formatEmoji(emoji)} ${realm} (${map})\n${
							reward === 200
								? `200 ${formatEmoji(Emoji.Light)}`
								: resolveCurrencyEmoji({ emoji: Emoji.AscendedCandle, number: reward })
						}`,
						inline: true,
					},
					{
						name: "Timestamps",
						value: timestamps
							.map(
								({ start, end }) =>
									`${time(start.unix(), TimestampStyles.LongTime)} - ${time(end.unix(), TimestampStyles.LongTime)}`,
							)
							.join("\n"),
						inline: true,
					},
				)
				.setImage(String(url));
		} else {
			embed.setDescription(`There are no shard eruptions ${offset === 0 ? "today" : "on this day"}.`);
		}

		if (shard) button.setEmoji(resolveShardEruptionEmoji(shard.dangerous));
		if (shardTomorrow) buttonTomorrow.setEmoji(resolveShardEruptionEmoji(shardTomorrow.dangerous));

		const response = {
			components: [new ActionRowBuilder<ButtonBuilder>().setComponents(buttonYesterday, button, buttonTomorrow)],
			embeds: [embed],
		};

		if (fromMessageComponent) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}

	public async view(interaction: ChatInputCommandInteraction) {
		const today = todayDate();

		await interaction.reply({
			components: [
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SHARD_ERUPTION_BROWSE_1_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setPlaceholder(
							`${today.format(DATE_FORMAT_STRING)} - ${today
								.add(MAXIMUM_OPTION_NUMBER - 1, "days")
								.format(DATE_FORMAT_STRING)}`,
						)
						.setOptions(generateShardEruptionSelectMenuOptions(today, 0)),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SHARD_ERUPTION_BROWSE_2_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setPlaceholder(
							`${today.add(MAXIMUM_OPTION_NUMBER, "days").format(DATE_FORMAT_STRING)} - ${today
								.add(MAXIMUM_OPTION_NUMBER * 2 - 1, "days")
								.format(DATE_FORMAT_STRING)}`,
						)
						.setOptions(generateShardEruptionSelectMenuOptions(today, MAXIMUM_OPTION_NUMBER)),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SHARD_ERUPTION_BROWSE_3_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setPlaceholder(
							`${today.add(MAXIMUM_OPTION_NUMBER * 2, "days").format(DATE_FORMAT_STRING)} - ${today
								.add(MAXIMUM_OPTION_NUMBER * 3 - 1, "days")
								.format(DATE_FORMAT_STRING)}`,
						)
						.setOptions(generateShardEruptionSelectMenuOptions(today, MAXIMUM_OPTION_NUMBER * 2)),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SHARD_ERUPTION_BROWSE_4_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setPlaceholder(
							`${today.add(MAXIMUM_OPTION_NUMBER * 3, "days").format(DATE_FORMAT_STRING)} - ${today
								.add(MAXIMUM_OPTION_NUMBER * 4 - 1, "days")
								.format(DATE_FORMAT_STRING)}`,
						)
						.setOptions(generateShardEruptionSelectMenuOptions(today, MAXIMUM_OPTION_NUMBER * 3)),
				),
			],
		});
	}
})();
