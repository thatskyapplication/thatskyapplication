import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	formatEmoji,
	time,
	TimestampStyles,
} from "discord.js";
import { DEFAULT_EMBED_COLOUR, Emoji } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, dateString, resolveCurrencyEmoji, shardEruption } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "shard-eruption",
		description: "View the shard eruption schedule.",
		type: ApplicationCommandType.ChatInput,
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (await cannotUseCustomEmojis(interaction)) return;
		const shard = shardEruption();
		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setTitle(dateString());

		if (shard) {
			const { realm, map, dangerous, reward, timestamps, url } = shard;

			embed
				.setFields(
					{
						name: "Information",
						value: `${realm} (${map})\nDangerous ${formatEmoji(dangerous ? Emoji.Yes : Emoji.No, true)}\n${
							reward === 200
								? `200 ${formatEmoji(Emoji.Light)}`
								: resolveCurrencyEmoji({ emoji: Emoji.AscendedCandle, number: reward })
						}`,
						inline: true,
					},
					// {
					// 	name: "Location",
					// 	value: `${realm} (${map})`,
					// 	inline: true,
					// },
					// {
					// 	name: "Dangerous",
					// 	value: formatEmoji(dangerous ? Emoji.Yes : Emoji.No, true),
					// 	inline: true,
					// },
					// {
					// 	name: "Reward",
					// 	value:
					// 		reward === 200
					// 			? `200 ${formatEmoji(Emoji.Light)}`
					// 			: resolveCurrencyEmoji({ emoji: Emoji.AscendedCandle, number: reward }),
					// 	inline: true,
					// },
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
				// .setFooter({
				// 	text: shard.dangerous ? "Dangerous shard eruption" : "Regular shard eruption.",
				// 	iconURL: "https://cdn.discordapp.com/emojis/1111792367104708699.gif?size=96&quality=lossless",
				// })
				.setImage(String(url));
		} else {
			embed.setDescription("There are no shard eruptions today.");
		}

		await interaction.reply({ embeds: [embed] });
	}
})();
