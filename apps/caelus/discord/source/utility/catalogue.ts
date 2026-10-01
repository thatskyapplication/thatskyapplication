import {
	type APISelectMenuOption,
	type APITextDisplayComponent,
	ComponentType,
	type Locale,
} from "@discordjs/core";
import { t } from "i18next";
import {
	type CostEntry,
	formatEmoji,
	type Item,
	resolveCurrencyEmoji,
	SeasonId,
	sumCosts,
} from "@thatskyapplication/utility";
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

export function nestingWorkshopPropsTextDisplay(
	heading: string,
	items: readonly Item[],
	locale: Locale,
	data?: ReadonlySet<number>,
): APITextDisplayComponent {
	const lines = items.map(({ cosmeticDisplay, cosmetics, cost, translation }) => {
		const emoji = CosmeticToEmoji[cosmeticDisplay];

		const prop = emoji
			? formatEmoji(emoji)
			: t(translation.key, { lng: locale, ns: "general", number: translation.number });

		const line = `${prop} ${resolveCostToString(sumCosts(cost ? [cost] : []), locale).join("")}`;

		return cosmetics.every((cosmetic) => data?.has(cosmetic))
			? `${line} ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`
			: line;
	});

	return { type: ComponentType.TextDisplay, content: `### ${heading}\n\n${lines.join("\n")}` };
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
