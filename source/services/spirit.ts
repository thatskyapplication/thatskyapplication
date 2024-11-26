import { t } from "i18next";
import { spirits } from "../data/spirits/index.js";
import { resolveSeasonalSpirit } from "../data/spirits/seasons/index.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	SeasonalSpiritVisitReturningData,
	SeasonalSpiritVisitTravellingData,
	StandardSpirit,
} from "../models/Spirits.js";
import {
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	SeasonId,
	SeasonIdToSeasonalEmoji,
	resolveCostToString,
} from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import { skyNow } from "../utility/dates.js";
import {
	FriendActionToEmoji,
	SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID,
	SpiritCallToEmoji,
	SpiritEmoteToEmoji,
	SpiritStanceToEmoji,
} from "../utility/spirits.js";

export async function searchAutocomplete(interaction: AutocompleteInteraction) {
	const { locale, options } = interaction;
	const focused = options.getFocused().toUpperCase();

	await interaction.respond(
		focused === ""
			? []
			: spirits()
					.filter((spirit) => {
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

						const seasonName =
							isSeasonalSpirit || spirit.isGuideSpirit()
								? t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" }).toUpperCase()
								: null;

						return (
							localisedName.toUpperCase().includes(focused) ||
							keywords.some((keyword) => keyword.toUpperCase().includes(focused)) ||
							emote?.toUpperCase().includes(focused) ||
							stance?.toUpperCase().includes(focused) ||
							call?.toUpperCase().includes(focused) ||
							action?.toUpperCase().includes(focused) ||
							seasonName?.includes(focused)
						);
					})
					.map(({ name }) => ({
						name: t(`spiritNames.${name}`, { lng: locale, ns: "general" }),
						value: name,
					}))
					.slice(0, 25),
	);
}

export async function search(interaction: ChatInputCommandInteraction) {
	const query = interaction.options.getString("query", true);
	const spirit = spirits().find(({ name }) => name === query);

	if (!spirit) {
		await interaction.reply({
			content: "Woah, it seems we have not encountered that spirit yet. How strange!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await searchResponse(
		interaction,
		spirit,
		spirit.isSeasonalSpirit() && spirit.current.length === 0,
	);
}

export async function parseSpiritSwitch(interaction: ButtonInteraction) {
	const { customId } = interaction;
	const data = customId.split("§");
	const name = data[1]!;
	const seasonalOffer = data[2] === "true";
	const spirit = resolveSeasonalSpirit(name);

	if (!spirit) {
		await interaction.reply({
			content: "Woah, it seems we have not encountered that spirit yet. How strange!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await searchResponse(interaction, spirit, !seasonalOffer);
}

function visitField(
	seasonalSpiritVisit: SeasonalSpiritVisitTravellingData | SeasonalSpiritVisitReturningData,
	error: boolean,
) {
	return seasonalSpiritVisit
		.reduce<string[]>((visits, date, visit) => {
			const resolvedDate = "start" in date ? date.start : date;
			const prefix = error ? "Error" : `#${visit}`;

			visits.push(
				`${prefix}: ${resolvedDate.toFormat("dd/LL/yyyy")} (${time(resolvedDate.toUnixInteger(), TimestampStyles.RelativeTime)})`,
			);

			return visits;
		}, [])
		.join("\n");
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
async function searchResponse(
	interaction: ButtonInteraction | ChatInputCommandInteraction,
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	seasonalOffer = false,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const { locale } = interaction;
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const seasonalParsing = isSeasonalSpirit && seasonalOffer;
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const totalCost = seasonalParsing ? spirit.totalCostSeasonal : spirit.totalCost;
	const totalOffer = totalCost ? resolveCostToString(totalCost).join("") : null;

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

	if (spiritSeason !== null) {
		embed.addFields({
			name: "Season",
			value: `${formatEmoji(SeasonIdToSeasonalEmoji[spiritSeason])}${t(`seasons.${spiritSeason}`, {
				lng: locale,
				ns: "general",
			})}`,
			inline: true,
		});
	}

	if (spirit.isStandardSpirit() || isSeasonalSpirit) {
		if (spirit.emote) {
			embed.addFields({
				name: "Emote",
				value: formatEmoji(SpiritEmoteToEmoji[spirit.emote]),
				inline: true,
			});
		}

		if (spirit.stance) {
			embed.addFields({
				name: "Stance",
				value: formatEmoji(SpiritStanceToEmoji[spirit.stance]),
				inline: true,
			});
		}

		if (spirit.call) {
			embed.addFields({
				name: "Call",
				value: formatEmoji(SpiritCallToEmoji[spirit.call]),
				inline: true,
			});
		}

		if (spirit.action) {
			embed.addFields({
				name: "Action",
				value: formatEmoji(FriendActionToEmoji[spirit.action]),
				inline: true,
			});
		}
	}

	const components = [];
	const description = [];
	const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

	if (isSeasonalSpirit) {
		const { travelling, travellingErrors, returning } = spirit.visits;
		const travellingFieldValue = [];

		if (travelling.size > 0) {
			travellingFieldValue.push(visitField(travelling, false));
		}

		if (travellingErrors.size > 0) {
			travellingFieldValue.push(visitField(travellingErrors, true));
		}

		if (travellingFieldValue.length > 0) {
			embed.addFields({ name: "Travelling", value: travellingFieldValue.join("\n") });
		}

		if (returning.size > 0) {
			embed.addFields({ name: "Returning", value: visitField(returning, false) });
		}

		if (spirit.visit(skyNow()).visited) {
			components.push(
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(
							`${SPIRIT_SEASONAL_FRIENDSHIP_TREE_BUTTON_CUSTOM_ID}§${spirit.name}§${seasonalOffer}`,
						)
						.setLabel(`${seasonalOffer ? "Current" : "Seasonal"} Friendship Tree`)
						.setStyle(ButtonStyle.Primary),
				),
			);
		} else {
			description.push(
				`⚠️ This ${
					spiritSeason === SeasonId.Shattering || spiritSeason === SeasonId.Nesting
						? "entity"
						: spiritSeason === SeasonId.Revival
							? "shop"
							: "spirit"
				} has not yet returned.`,
			);
		}
	}

	if (totalOffer && totalOffer.length > 0) {
		description.push(totalOffer);
	}

	if (imageURL) {
		embed.setImage(imageURL);
	} else {
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;
		description.push(offer.length > 0 ? NO_FRIENDSHIP_TREE_YET_TEXT : NO_FRIENDSHIP_TREE_TEXT);
	}

	if (isGuideSpirit && spirit.inProgress) {
		embed.setFooter({ text: GUIDE_SPIRIT_IN_PROGRESS_TEXT });
	}

	if (isSeasonalSpirit && spirit.marketingVideoURL) {
		description.push(hyperlink("Promotional Video", spirit.marketingVideoURL));
	}

	if (description.length > 0) {
		embed.setDescription(description.join("\n"));
	}

	if (interaction instanceof ButtonInteraction) {
		await interaction.update({ components, embeds: [embed] });
	} else {
		await interaction.reply({ components, embeds: [embed] });
	}
}
