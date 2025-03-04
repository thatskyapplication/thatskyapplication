import {
	type Emoji,
	type ItemCost,
	SeasonId,
	type SeasonIds,
	resolveCurrencyEmoji,
} from "@thatskyapplication/utility";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
} from "./emojis.js";

export const NO_FRIENDSHIP_TREE_TEXT = "This spirit does not have a friendship tree." as const;
export const NO_FRIENDSHIP_TREE_YET_TEXT = "This spirit does not yet have an infographic." as const;

export const GUIDE_SPIRIT_IN_PROGRESS_TEXT =
	"This spirit's friendship tree has not been fully revealed." as const;

export const NO_EVENT_OFFER_TEXT = "There are no cosmetics for this event." as const;
export const NO_EVENT_INFOGRAPHIC_YET = "This event does not yet have an infographic." as const;

const SeasonIdToSeasonalHeartEmoji = {
	[SeasonId.Belonging]: SEASON_EMOJIS.BelongingHeart,
	[SeasonId.Rhythm]: SEASON_EMOJIS.RhythmHeart,
	[SeasonId.Enchantment]: SEASON_EMOJIS.EnchantmentHeart,
	[SeasonId.Sanctuary]: SEASON_EMOJIS.SanctuaryHeart,
	[SeasonId.Prophecy]: SEASON_EMOJIS.ProphecyHeart,
	[SeasonId.Dreams]: SEASON_EMOJIS.DreamsHeart,
	[SeasonId.Assembly]: SEASON_EMOJIS.AssemblyHeart,
	[SeasonId.LittlePrince]: SEASON_EMOJIS.LittlePrinceHeart,
	[SeasonId.Flight]: SEASON_EMOJIS.FlightHeart,
	[SeasonId.Abyss]: SEASON_EMOJIS.AbyssHeart,
	[SeasonId.Performance]: SEASON_EMOJIS.PerformanceHeart,
	[SeasonId.Shattering]: SEASON_EMOJIS.ShatteringHeart,
	[SeasonId.AURORA]: SEASON_EMOJIS.AuroraHeart,
	[SeasonId.Remembrance]: SEASON_EMOJIS.RemembranceHeart,
	[SeasonId.Passage]: SEASON_EMOJIS.PassageHeart,
	[SeasonId.Moments]: SEASON_EMOJIS.MomentsHeart,
	[SeasonId.Revival]: SEASON_EMOJIS.RevivalHeart,
	[SeasonId.NineColouredDeer]: SEASON_EMOJIS.NineColouredDeerHeart,
	[SeasonId.Nesting]: SEASON_EMOJIS.NestingHeart,
	[SeasonId.Duets]: SEASON_EMOJIS.DuetsHeart,
	[SeasonId.Moomin]: SEASON_EMOJIS.MoominHeart,
	[SeasonId.Radiance]: SEASON_EMOJIS.RadianceHeart,
} as const satisfies Readonly<
	Record<Exclude<SeasonIds, typeof SeasonId.Gratitude | typeof SeasonId.Lightseekers>, Emoji>
>;

export function resolveCostToString(cost: ItemCost) {
	const totalCost = [];

	if (cost.money) {
		totalCost.push(`$${cost.money} `);
	}

	if (cost.candles) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: cost.candles }),
		);
	}

	if (cost.hearts) {
		totalCost.push(
			resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: cost.hearts }),
		);
	}

	if (cost.ascendedCandles) {
		totalCost.push(
			resolveCurrencyEmoji({
				emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
				number: cost.ascendedCandles,
			}),
		);
	}

	if (cost.seasonalCandles) {
		for (const seasonalCandles of cost.seasonalCandles) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: SeasonIdToSeasonalCandleEmoji[seasonalCandles.seasonId],
					number: seasonalCandles.cost,
				}),
			);
		}
	}

	if (cost.seasonalHearts) {
		for (const seasonalHearts of cost.seasonalHearts) {
			const { seasonId } = seasonalHearts;

			totalCost.push(
				resolveCurrencyEmoji({
					emoji:
						seasonId !== SeasonId.Gratitude && seasonId !== SeasonId.Lightseekers
							? SeasonIdToSeasonalHeartEmoji[seasonId]
							: MISCELLANEOUS_EMOJIS.SeasonalHeart,
					number: seasonalHearts.cost,
				}),
			);
		}
	}

	if (cost.eventTickets) {
		for (const event of cost.eventTickets) {
			totalCost.push(
				resolveCurrencyEmoji({
					emoji: EventIdToEventTicketEmoji[event.eventId] ?? MISCELLANEOUS_EMOJIS.EventTicket,
					number: event.cost,
				}),
			);
		}
	}

	return totalCost;
}

export const enum CatalogueType {
	StandardSpirits = 0,
	Elders = 1,
	SeasonalSpirits = 2,
	Events = 3,
	StarterPacks = 4,
	SecretArea = 5,
	PermanentEventStore = 6,
	NestingWorkshop = 7,
}
