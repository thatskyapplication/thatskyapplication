import {
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	hyperlink,
	time,
	TimestampStyles,
} from "discord.js";
import {
	type ElderSpirit,
	type GuideSpirit,
	type SeasonalSpirit,
	type SeasonalSpiritVisit,
	type StandardSpirit,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveOfferToCurrency,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
} from "../../Structures/Spirits/Base.js";
import Seasonal from "../../Structures/Spirits/Seasonal/index.js";
import { SpiritTracker } from "../../Structures/Spirits/SpiritTracker.js";
import Spirits from "../../Structures/Spirits/index.js";
import { Season } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, resolveEmbedColor } from "../../Utility/Utility.js";
import type { AutocompleteCommand } from "../index.js";

export const SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID = "SPIRIT_VIEW_SEASONAL_BUTTON_CUSTOM_ID" as const;

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

		await this.searchResponse(interaction, spirit, spirit.isSeasonalSpirit() && !spirit.visited);
	}

	public async parseSpiritSwitch(interaction: ButtonInteraction) {
		const { customId } = interaction;
		const data = customId.split("§");
		const name = data[1]!;
		const seasonalOffer = data[2] === "true";
		const spirit = Seasonal.find((spirit) => spirit.name === name);

		if (!spirit) {
			await interaction.reply({
				content: "Woah, it seems we have not encountered that spirit yet. How strange!",
				ephemeral: true,
			});

			return;
		}

		await this.searchResponse(interaction, spirit, !seasonalOffer);
	}

	public async searchResponse(
		interaction: ButtonInteraction | ChatInputCommandInteraction,
		spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
		seasonalOffer = false,
	) {
		const seasonalSpirit = spirit.isSeasonalSpirit();
		const seasonalParsing = seasonalSpirit && seasonalOffer;
		const totalCost = seasonalParsing ? spirit.totalCostSeasonal : spirit.totalCost;
		if (totalCost && (await cannotUseCustomEmojis(interaction))) return;

		const embed = new EmbedBuilder()
			.setColor(await resolveEmbedColor(interaction.guild))
			.setTitle(spirit.name)
			.setURL(spirit.wikiURL);

		if (spirit.realm) embed.addFields({ name: "Realm", value: spirit.realm, inline: true });
		if (seasonalSpirit) embed.addFields({ name: "Season", value: spirit.season, inline: true });

		if (spirit.isStandardSpirit() || seasonalSpirit) {
			if (spirit.expression) embed.addFields({ name: "Expression", value: spirit.expression, inline: true });
			if (spirit.stance) embed.addFields({ name: "Stance", value: spirit.stance, inline: true });
			if (spirit.call) embed.addFields({ name: "Call", value: spirit.call, inline: true });
		}

		const components = [];
		const description = [];
		const totalOffer = totalCost ? resolveOfferToCurrency(totalCost).join("") : null;
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

		if (seasonalSpirit) {
			const { travelling, returning } = spirit.visits;
			if (travelling.size > 0) embed.addFields({ name: "Travelling", value: this.visitField(travelling) });
			if (returning.size > 0) embed.addFields({ name: "Returning", value: this.visitField(returning) });

			if (spirit.visited) {
				components.push(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder()
							.setCustomId(`${SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID}§${spirit.name}§${seasonalOffer}`)
							.setLabel(`${seasonalOffer ? "Current" : "Seasonal"} Friendship Tree`)
							.setStyle(ButtonStyle.Primary),
					),
				);
			} else {
				description.push(`⚠️ This ${spirit.season === Season.Shattering ? "entity" : "spirit"} has not yet returned.`);
			}
		}

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			const offer = seasonalParsing ? spirit.offer.seasonal : spirit.offer.current;
			description.push(offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		if (spirit.isGuideSpirit() && spirit.offer.inProgress) embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		if (totalOffer && totalOffer.length > 1) description.push(totalOffer);

		if (seasonalSpirit && spirit.marketingVideoURL) {
			description.push(hyperlink("Promotional Video", spirit.marketingVideoURL));
		}

		if (description.length > 0) embed.setDescription(description.join("\n"));

		if (interaction instanceof ButtonInteraction) {
			await interaction.update({ components, embeds: [embed] });
		} else {
			await interaction.reply({ components, embeds: [embed] });
		}
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
