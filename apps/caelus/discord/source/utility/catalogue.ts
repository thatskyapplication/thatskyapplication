import type { APISelectMenuOption, Locale } from "@discordjs/core";
import { t } from "i18next";
import { type Item, itemName } from "@thatskyapplication/utility";
import { itemEmoji } from "./emojis.js";

export function itemToSelectMenuOption(
	item: Item,
	data: ReadonlySet<number> | undefined,
	locale: Locale,
) {
	const option: APISelectMenuOption = {
		default: item.cosmetics.every((cosmetic) => data?.has(cosmetic)),
		label: itemName(item, t, locale),
		value: JSON.stringify(item.cosmetics),
	};

	const emoji = itemEmoji(item);

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
	Loyalty = 8,
}
