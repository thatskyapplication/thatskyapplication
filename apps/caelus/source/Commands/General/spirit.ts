import {
	type ApplicationCommandData,
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	hyperlink,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import type { SeasonalSpiritVisit } from "../../Structures/Spirits/Base.js";
import Spirits, { SpiritTracker } from "../../Structures/Spirits/index.js";
import { Emoji } from "../../Utility/Constants.js";
import { resolveCurrencyEmoji } from "../../Utility/Utility.js";
import type { AutocompleteCommand } from "../index.js";

export default class implements AutocompleteCommand {
	public readonly name = "spirit";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "search":
				await this.search(interaction);
				return;
			case "track":
				await this.track(interaction);
		}
	}

	private visitField(seasonalSpiritVisit: SeasonalSpiritVisit["travelling"] | SeasonalSpiritVisit["returning"]) {
		return seasonalSpiritVisit
			.reduce<string[]>((visits, date, visit) => {
				visits.push(
					`${visit === "Error" ? "" : `#`}${visit}: ${time(date.unix(), TimestampStyles.LongDate)} (${time(
						date.unix(),
						TimestampStyles.RelativeTime,
					)})`,
				);

				return visits;
			}, [])
			.join("\n");
	}

	public async search(interaction: ChatInputCommandInteraction) {
		const query = interaction.options.getString("query", true);
		const spirit = Spirits.find(({ name }) => name === query);

		if (!spirit) {
			await interaction.reply({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				ephemeral: true,
			});

			return;
		}

		const embed = new EmbedBuilder()
			.setColor((await interaction.guild?.members.fetchMe())?.displayColor ?? 0)
			.setFields({ name: "Realm", value: spirit.realm, inline: true })
			.setImage(spirit.imageURL)
			.setTitle(spirit.name)
			.setURL(spirit.wikiURL);

		if (spirit.isStandardSpirit()) {
			embed.addFields({ name: "Season", value: spirit.isSeasonalSpirit() ? spirit.season.name : "None", inline: true });
			if (spirit.expression) embed.addFields({ name: "Expression", value: spirit.expression, inline: true });
			if (spirit.stance) embed.addFields({ name: "Stance", value: spirit.stance, inline: true });
			if (spirit.call) embed.addFields({ name: "Call", value: spirit.call, inline: true });
		}

		const description = [];
		const seasonalSpirit = spirit.isSeasonalSpirit();

		if (seasonalSpirit) {
			if (spirit.notVisited) {
				description.push("⚠️ This spirit has not yet returned.");
			} else {
				const { travelling, returning } = spirit.visits;
				if (travelling.size > 0) embed.addFields({ name: "Travelling", value: this.visitField(travelling) });
				if (returning.size > 0) embed.addFields({ name: "Returning", value: this.visitField(returning) });
			}
		}

		if (spirit.offer && !Object.values(spirit.offer).every((amount) => amount === 0)) {
			description.push(
				`${
					spirit.offer.candles === 0
						? ""
						: resolveCurrencyEmoji(interaction, { emoji: Emoji.Candle, number: spirit.offer.candles })
				}${
					spirit.offer.hearts === 0
						? ""
						: resolveCurrencyEmoji(interaction, { emoji: Emoji.Heart, number: spirit.offer.hearts })
				}${
					spirit.offer.ascendedCandles === 0
						? ""
						: resolveCurrencyEmoji(interaction, { emoji: Emoji.AscendedCandle, number: spirit.offer.ascendedCandles })
				}`,
			);
		}

		if (seasonalSpirit && spirit.marketingVideoURL) {
			description.push(hyperlink("Promotional Video", spirit.marketingVideoURL));
		}

		if (description.length > 0) embed.setDescription(description.join("\n"));
		await interaction.reply({ embeds: [embed] });
	}

	public async track(interaction: ChatInputCommandInteraction) {
		await SpiritTracker.viewTracker(interaction);
	}

	public async autocomplete(interaction: AutocompleteInteraction) {
		const focused = interaction.options.getFocused().toUpperCase();

		await interaction.respond(
			focused === ""
				? []
				: Spirits.filter((spirit) => {
						const { name, keywords } = spirit;
						let expression = null;
						let stance = null;
						let call = null;

						if (spirit.isStandardSpirit()) {
							expression = spirit.expression?.toUpperCase() ?? null;
							stance = spirit.stance?.toUpperCase() ?? null;
							call = spirit.call?.toUpperCase() ?? null;
						}

						const seasonName = spirit.isSeasonalSpirit() ? spirit.season.name.toUpperCase() : null;
						/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
						return (
							name.toUpperCase().includes(focused) ||
							keywords.some((keyword) => keyword.toUpperCase().includes(focused)) ||
							expression?.toUpperCase().includes(focused) ||
							stance?.toUpperCase().includes(focused) ||
							call?.toUpperCase().includes(focused) ||
							seasonName?.includes(focused)
						);
						/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
				  })
						.map(({ name }) => ({ name, value: name }))
						.slice(0, 25),
		);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Returns the friendship tree of a spirit.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "search",
					description: "Reveal information about a spirit.",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "query",
							description: "The name, season, expression, stance, or call of the spirit.",
							required: true,
							autocomplete: true,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "track",
					description: "Track your spirit progress!",
				},
			],
		};
	}
}
