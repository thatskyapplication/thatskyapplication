import type { APISelectMenuOption, Locale } from "@discordjs/core";
import { t } from "i18next";
import type { Item } from "@thatskyapplication/utility";
import { CosmeticToEmoji, MISCELLANEOUS_EMOJIS } from "./emojis.js";

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
