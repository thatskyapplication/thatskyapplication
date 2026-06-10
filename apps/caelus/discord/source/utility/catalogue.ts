import type { APISelectMenuOption, Locale } from "@discordjs/core";
import {
	type CatalogueProgress,
	type CostEntry,
	type Item,
	type ItemCost,
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

export function catalogueComplete({ owned, total }: CatalogueProgress) {
	return total > 0 && owned >= total;
}

export function partitionItemCosts(items: Iterable<Item>, data: ReadonlySet<number> = new Set()) {
	const obtained: ItemCost[] = [];
	const remaining: ItemCost[] = [];
	const seen = new Set<string>();

	for (const { cosmetics, cost } of items) {
		if (!cost) {
			continue;
		}

		const key = cosmetics.toSorted((a, b) => a - b).join(",");

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		(cosmetics.every((cosmetic) => data.has(cosmetic)) ? obtained : remaining).push(cost);
	}

	return { obtained, remaining };
}

export function resolveCostToString(cost: readonly CostEntry[]) {
	const totalCost = [];

	for (const entry of cost) {
		switch (entry.type) {
			case "money":
				totalCost.push(`$${entry.amount} `);
				break;
			case "candles":
				totalCost.push(
					resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Candle, number: entry.amount }),
				);

				break;
			case "hearts":
				totalCost.push(
					resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, number: entry.amount }),
				);

				break;
			case "ascendedCandles":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
						number: entry.amount,
					}),
				);

				break;
			case "seasonalCandles":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji:
							SeasonIdToSeasonalCandleEmoji[entry.seasonId] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle,
						number: entry.amount,
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
						number: entry.amount,
					}),
				);

				break;
			case "eventTickets":
				totalCost.push(
					resolveCurrencyEmoji({
						emoji: EventIdToEventTicketEmoji[entry.eventId] ?? MISCELLANEOUS_EMOJIS.EventTicket,
						number: entry.amount,
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
