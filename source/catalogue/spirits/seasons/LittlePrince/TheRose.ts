import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.TheRose,
	season: SeasonName.LittlePrince,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace13 },
			{
				name: "Ultimate hair",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair90,
			},
			{
				name: "Ultimate outfit",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit23,
			},
			{
				name: "Rose",
				bit: 1 << 5,
				cost: { seasonalHearts: 1 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp05,
			},
			{ name: "Quest 2", bit: 1 << 6, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 7, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 3", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 9, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 11, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 12, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", bit: 1 << 13, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 6", bit: 1 << 14, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 6", bit: 1 << 15, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 7", bit: 1 << 16, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 7", bit: 1 << 17, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Sword outfit", bit: 1 << 18, cost: { candles: 200 }, emoji: OUTFIT_EMOJIS.Outfit22 },
		],
	},
});
