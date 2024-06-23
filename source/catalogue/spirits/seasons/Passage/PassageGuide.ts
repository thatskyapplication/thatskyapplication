import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.PassageGuide,
	season: SeasonName.Passage,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace29 },
			{ name: "Ultimate mask", bit: 1 << 3, cost: { seasonalHearts: 2 }, emoji: MASK_EMOJIS.Mask76 },
			{ name: "Ultimate cape", bit: 1 << 4, cost: { seasonalHearts: 2 }, emoji: CAPE_EMOJIS.Cape104 },
			{ name: "Quest 2", bit: 1 << 5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Serow mask", bit: 1 << 6, cost: { candles: 48 }, emoji: MASK_EMOJIS.Mask77 },
			{ name: "Quest 3", bit: 1 << 7, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 8, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Boar mask", bit: 1 << 9, cost: { candles: 44 }, emoji: MASK_EMOJIS.Mask78 },
			{ name: "Quest 4", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 11, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Monkey mask", bit: 1 << 12, cost: { candles: 46 }, emoji: MASK_EMOJIS.Mask79 },
			{ name: "Quest 5", bit: 1 << 13, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 14, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Hacky sack",
				bit: 1 << 15,
				cost: { hearts: 39 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp26,
			},
			{ name: "Racoon mask", bit: 1 << 16, cost: { candles: 52 }, emoji: MASK_EMOJIS.Mask80 },
		],
	},
});
