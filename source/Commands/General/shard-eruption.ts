import {
	ButtonInteraction,
	type ChatInputCommandInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	formatEmoji,
	time,
	TimestampStyles,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR, Emoji } from "../../Utility/Constants.js";
import {
	cannotUseCustomEmojis,
	dateString,
	resolveCurrencyEmoji,
	shardEruption,
	todayDate,
} from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export const SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID" as const;
export const SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID = "SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID" as const;

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
		],
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "today":
				await this.today(interaction);
		}
	}

	public async today(interaction: ButtonInteraction | ChatInputCommandInteraction, offset = 0) {
		if (await cannotUseCustomEmojis(interaction)) return;
		const shard = shardEruption(offset);

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(dateString(todayDate().add(offset, "days")));

		if (shard) {
			const { realm, map, dangerous, reward, timestamps, url } = shard;

			embed
				.setFields(
					{
						name: "Information",
						value: `${formatEmoji(dangerous ? Emoji.ShardStrong : Emoji.ShardRegular)} ${realm} (${map})\n${
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

		const response = {
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(`${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`)
						.setLabel("Back")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID)
						.setDisabled(offset === 0)
						.setLabel("Today")
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(`${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`)
						.setLabel("Next")
						.setStyle(ButtonStyle.Primary),
				),
			],
			embeds: [embed],
		};

		if (interaction instanceof ButtonInteraction) {
			await interaction.update(response);
		} else {
			await interaction.reply(response);
		}
	}
})();
