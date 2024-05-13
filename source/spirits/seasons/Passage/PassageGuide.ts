/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, GuideSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritName } from "../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.PassageGuide,
	season: SeasonName.Passage,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Quest 1", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 1, { item: "Heart 1", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 2, { item: "Pendant", cost: null, emoji: NECKLACE_EMOJIS.Necklace29 })
			.set(1 << 3, { item: "Ultimate mask", cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask76 })
			.set(1 << 4, { item: "Ultimate cape", cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape107 })
			.set(1 << 5, { item: "Quest 2", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 6, { item: "Serow mask", cost: { candles: 48 }, emoji: MASK_EMOJIS.Mask77 })
			.set(1 << 7, { item: "Quest 3", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 8, { item: "Heart 2", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 9, { item: "Boar mask", cost: { candles: 44 }, emoji: MASK_EMOJIS.Mask78 })
			.set(1 << 10, { item: "Quest 4", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 11, { item: "Heart 3", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 12, { item: "Monkey mask", cost: { candles: 46 }, emoji: MASK_EMOJIS.Mask79 })
			.set(1 << 13, { item: "Quest 5", cost: null, emoji: MISCELLANEOUS_EMOJIS.Quest })
			.set(1 << 14, { item: "Heart 4", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 15, {
				item: "Hacky sack",
				cost: { hearts: 39 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp26,
			})
			.set(1 << 16, { item: "Racoon mask", cost: { candles: 52 }, emoji: MASK_EMOJIS.Mask80 }),
	},
});
