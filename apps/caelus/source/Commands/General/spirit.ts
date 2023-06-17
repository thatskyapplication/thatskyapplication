import {
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	hyperlink,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import {
	type SeasonalSpiritVisit,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveOfferToCurrency,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
} from "../../Structures/Spirits/Base.js";
import { SpiritTracker } from "../../Structures/Spirits/SpiritTracker.js";
import Spirits from "../../Structures/Spirits/index.js";
import { Season } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, resolveEmbedColor } from "../../Utility/Utility.js";
import type { AutocompleteCommand } from "../index.js";

export default new (class implements AutocompleteCommand {
	public readonly data = {
		name: "spirit",
		description: "Returns the friendship tree of a spirit.",
		type: ApplicationCommandType.ChatInput,
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
	} as const;

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

		if (spirit.totalCost && (await cannotUseCustomEmojis(interaction))) return;

		const embed = new EmbedBuilder()
			.setColor(await resolveEmbedColor(interaction.guild))
			.setTitle(spirit.name)
			.setURL(spirit.wikiURL);

		if (spirit.realm) embed.addFields({ name: "Realm", value: spirit.realm, inline: true });
		const seasonalSpirit = spirit.isSeasonalSpirit();
		if (seasonalSpirit) embed.addFields({ name: "Season", value: spirit.season, inline: true });

		if (spirit.isStandardSpirit() || seasonalSpirit) {
			if (spirit.expression) embed.addFields({ name: "Expression", value: spirit.expression, inline: true });
			if (spirit.stance) embed.addFields({ name: "Stance", value: spirit.stance, inline: true });
			if (spirit.call) embed.addFields({ name: "Call", value: spirit.call, inline: true });
		}

		const description = [];

		if (seasonalSpirit) {
			if (spirit.notVisited) {
				description.push(`⚠️ This ${spirit.season === Season.Shattering ? "entity" : "spirit"} has not yet returned.`);
			} else {
				const { travelling, returning } = spirit.visits;
				if (travelling.size > 0) embed.addFields({ name: "Travelling", value: this.visitField(travelling) });
				if (returning.size > 0) embed.addFields({ name: "Returning", value: this.visitField(returning) });
			}
		}

		if (spirit.imageURL) {
			embed.setImage(spirit.imageURL);
		} else {
			description.push(spirit.offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		if (spirit.isGuideSpirit() && spirit.inProgress) embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		const totalOffer = spirit.totalCost ? resolveOfferToCurrency(spirit.totalCost).join("") : null;
		if (totalOffer && totalOffer.length > 1) description.push(totalOffer);

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

						if (spirit.isSeasonalSpirit()) {
							expression = spirit.expression?.toUpperCase() ?? null;
							stance = spirit.stance?.toUpperCase() ?? null;
							call = spirit.call?.toUpperCase() ?? null;
						}

						const seasonName = spirit.isSeasonalSpirit() ? spirit.season.toUpperCase() : null;
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
})();
