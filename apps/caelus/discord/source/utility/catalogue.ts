import { type ItemCost, resolveCurrencyEmoji, SeasonId } from "@thatskyapplication/utility";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
} from "./emojis.js";

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
			const emoji = SeasonIdToSeasonalCandleEmoji[seasonalCandles.seasonId];

			totalCost.push(
				resolveCurrencyEmoji({
					emoji: emoji ?? MISCELLANEOUS_EMOJIS.SeasonalCandle,
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
							? (SeasonIdToSeasonalHeartEmoji[seasonId] ?? MISCELLANEOUS_EMOJIS.SeasonalHeart)
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
