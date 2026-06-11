import type { APISelectMenuOption, Locale } from "@discordjs/core";
import {
	type CostEntry,
	type Item,
	resolveCurrencyEmoji,
	SeasonId,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import {
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalHeartEmoji,
} from "./emojis.js";

export function resolveCostToString(cost: readonly CostEntry[], locale: Locale) {
	const totalCost = [];

	for (const entry of cost) {
		const number = entry.amount.toLocaleString(locale);

		switch (entry.type) {
			case "money":
				totalCost.push(`$${entry.amount.toLocaleString(locale, { minimumFractionDigits: 2 })} `);

				break;
			case "candles":
				totalCost.push(
					resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, amount: number }),
				);
				break;
			case "hearts":
				totalCost.push(resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, amount: number }));
				break;
			case "ascendedCandles":
				totalCost.push(
					resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.AscendedCandle, amount: number }),
				);

				break;
			case "seasonalCandles":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji:
							SeasonIdToSeasonalCandleEmoji[entry.seasonId] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle,
						amount: number,
					}),
				);

				break;
			case "seasonalHearts":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji:
							entry.seasonId === SeasonId.Gratitude || entry.seasonId === SeasonId.Lightseekers
								? MISCELLANEOUS_EMOJIS.SeasonalHeart
								: (SeasonIdToSeasonalHeartEmoji[entry.seasonId] ??
									MISCELLANEOUS_EMOJIS.SeasonalHeart),
						amount: number,
					}),
				);

				break;
			case "eventTickets":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji: EventIdToEventTicketEmoji[entry.eventId] ?? MISCELLANEOUS_EMOJIS.EventTicket,
						amount: number,
					}),
				);

				break;
		}
	}

	return totalCost;
}

export function itemToSelectMenuOption(
	{ translation, cosmetics, cosmeticDisplay, regularHeart }: Item,
	data: ReadonlySet<number> | undefined,
	locale: Locale,
) {
	const option: APISelectMenuOption = {
		default: cosmetics.every((cosmetic) => data?.has(cosmetic)),
		label: t(translation.key, {
			lng: locale,
			ns: "general",
			number: translation.number,
		}),
		value: JSON.stringify(cosmetics),
	};

	const emoji = regularHeart ? MISCELLANEOUS_EMOJIS.Heart : CosmeticToEmoji[cosmeticDisplay];

	if (emoji) {
		option.emoji = emoji;
	}

	return option;
}

export const enum CatalogueType {
	StandardSpirits = 0,
	Elders = 1,
	SeasonalSpirits = 2,
	Events = 3,
	StarterPacks = 4,
	SecretArea = 5,
	ClothingShop = 6,
	NestingWorkshop = 7,
}
