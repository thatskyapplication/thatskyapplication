import { GuideSpirit } from "../../../../Structures/Spirits.js";
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
	name: SpiritName.DuetsGuide,
	season: SeasonName.Duets,
	offer: {
		inProgress: true,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Mask", bit: 1 << 1, cost: { candles: 65 }, emoji: MASK_EMOJIS.Mask93 },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace37 },
			{
				name: "Ultimate prop 1",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp71,
			},
			{
				name: "Ultimate cape",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape133,
			},
			{
				name: "Ultimate prop 2",
				bit: 1 << 5,
				cost: { seasonalHearts: 2 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp72,
			},
		],
	},
});
