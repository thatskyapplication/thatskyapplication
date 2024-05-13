import {
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	EmbedBuilder,
	hyperlink,
	PermissionFlagsBits,
	time,
	TimestampStyles,
} from "discord.js";
import { t } from "i18next";
import {
	type ElderSpirit,
	type GuideSpirit,
	type SeasonalSpirit,
	type SeasonalSpiritVisitReturningData,
	type SeasonalSpiritVisitTravellingData,
	type StandardSpirit,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveOfferToCurrency,
} from "../../Structures/Spirits/Base.js";
import Seasonal from "../../Structures/Spirits/Seasonal/index.js";
import { SpiritTracker } from "../../Structures/Spirits/SpiritTracker.js";
import Spirits from "../../Structures/Spirits/index.js";
import { DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import { todayDate } from "../../Utility/dates.js";
import { formatEmoji } from "../../Utility/emojis.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import { SeasonName, SeasonNameToSeasonalEmoji } from "../../Utility/seasons.js";
import {
	FriendActionToEmoji,
	SpiritCallToEmoji,
	SpiritEmoteToEmoji,
	SpiritStanceToEmoji,
} from "../../Utility/spirits.js";
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
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
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

	private visitField(seasonalSpiritVisit: SeasonalSpiritVisitTravellingData | SeasonalSpiritVisitReturningData) {
		return seasonalSpiritVisit
			.reduce<string[]>((visits, date, visit) => {
				const resolvedDate = "start" in date ? date.start : date;

				visits.push(
					`${visit === "Error" ? "" : `#`}${visit}: ${time(
						resolvedDate.toUnixInteger(),
						TimestampStyles.LongDate,
					)} (${time(resolvedDate.toUnixInteger(), TimestampStyles.RelativeTime)})`,
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

		await this.searchResponse(interaction, spirit, spirit.isSeasonalSpirit() && !spirit.offer.current);
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
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) return;
		const { locale } = interaction;
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const isGuideSpirit = spirit.isGuideSpirit();
		const seasonalParsing = isSeasonalSpirit && seasonalOffer;
		const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.season : null;
		const totalCost = seasonalParsing ? spirit.totalCostSeasonal : spirit.totalCost;
		const totalOffer = totalCost ? resolveOfferToCurrency(totalCost, spiritSeason).join("") : null;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(t(`spiritNames.${spirit.name}`, { lng: locale, ns: "general" }))
			.setURL(spirit.wikiURL);

		if (spirit.realm) {
			embed.addFields({
				name: "Realm",
				value: t(`realms.${spirit.realm}`, { lng: locale, ns: "general" }),
				inline: true,
			});
		}

		if (spiritSeason) {
			embed.addFields({
				name: "Season",
				value: `${formatEmoji(SeasonNameToSeasonalEmoji[spiritSeason])}${t(`seasons.${spiritSeason}`, {
					lng: locale,
					ns: "general",
				})}`,
				inline: true,
			});
		}

		if (spirit.isStandardSpirit() || isSeasonalSpirit) {
			if (spirit.emote) {
				embed.addFields({ name: "Emote", value: formatEmoji(SpiritEmoteToEmoji[spirit.emote]), inline: true });
			}

			if (spirit.stance) {
				embed.addFields({ name: "Stance", value: formatEmoji(SpiritStanceToEmoji[spirit.stance]), inline: true });
			}

			if (spirit.call) {
				embed.addFields({ name: "Call", value: formatEmoji(SpiritCallToEmoji[spirit.call]), inline: true });
			}

			if (spirit.action) {
				embed.addFields({ name: "Action", value: formatEmoji(FriendActionToEmoji[spirit.action]), inline: true });
			}
		}

		const components = [];
		const description = [];
		const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

		if (isSeasonalSpirit) {
			const { travelling, returning } = spirit.visits;
			if (travelling.size > 0) embed.addFields({ name: "Travelling", value: this.visitField(travelling) });
			if (returning.size > 0) embed.addFields({ name: "Returning", value: this.visitField(returning) });

			if (spirit.visit(todayDate()).visited) {
				components.push(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder()
							.setCustomId(`${SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID}§${spirit.name}§${seasonalOffer}`)
							.setLabel(`${seasonalOffer ? "Current" : "Seasonal"} Friendship Tree`)
							.setStyle(ButtonStyle.Primary),
					),
				);
			} else {
				description.push(
					`⚠️ This ${
						spiritSeason === SeasonName.Shattering || spiritSeason === SeasonName.Nesting
							? "entity"
							: spiritSeason === SeasonName.Revival
							? "shop"
							: "spirit"
					} has not yet returned.`,
				);
			}
		}

		if (imageURL) {
			embed.setImage(imageURL);
		} else {
			const offer = seasonalParsing ? spirit.offer.seasonal : spirit.offer?.current;
			description.push(offer ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
		}

		if (isGuideSpirit && spirit.offer?.inProgress) embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
		if (totalOffer && totalOffer.length > 0) description.push(totalOffer);

		if (isSeasonalSpirit && spirit.marketingVideoURL) {
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
		const { locale, options } = interaction;
		const focused = options.getFocused().toUpperCase();

		await interaction.respond(
			focused === ""
				? []
				: Spirits.filter((spirit) => {
						const { name, keywords } = spirit;
						const localisedName = t(`spiritNames.${name}`, { lng: locale, ns: "general" });
						let emote = null;
						let stance = null;
						let call = null;
						let action = null;
						const isSeasonalSpirit = spirit.isSeasonalSpirit();

						if (spirit.isStandardSpirit() || isSeasonalSpirit) {
							emote = spirit.emote?.toUpperCase() ?? null;
							stance = spirit.stance?.toUpperCase() ?? null;
							call = spirit.call?.toUpperCase() ?? null;
							action = spirit.action?.toUpperCase() ?? null;
						}

						const seasonName = isSeasonalSpirit || spirit.isGuideSpirit() ? spirit.season.toUpperCase() : null;

						/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
						return (
							localisedName.toUpperCase().includes(focused) ||
							keywords.some((keyword) => keyword.toUpperCase().includes(focused)) ||
							emote?.toUpperCase().includes(focused) ||
							stance?.toUpperCase().includes(focused) ||
							call?.toUpperCase().includes(focused) ||
							action?.toUpperCase().includes(focused) ||
							seasonName?.includes(focused)
						);
						/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
				  })
						.map(({ name }) => ({ name: t(`spiritNames.${name}`, { lng: locale, ns: "general" }), value: name }))
						.slice(0, 25),
		);
	}
})();
