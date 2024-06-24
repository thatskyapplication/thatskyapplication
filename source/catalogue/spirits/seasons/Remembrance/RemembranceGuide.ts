import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RemembranceGuide,
	season: SeasonName.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace25 },
			{ name: "Ultimate neck accessory", bit: 1 << 3, cost: { seasonalHearts: 2 }, emoji: NECKLACE_EMOJIS.Necklace27 },
			{
				name: "Ultimate prop",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp30,
			},
			{ name: "Quest 2", bit: 1 << 5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Chimes", bit: 1 << 6, cost: { candles: 30 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp22 },
			{ name: FriendAction.HighFive, bit: 1 << 7, emoji: FRIEND_ACTION_EMOJIS.HighFive },
			{ name: "Shared space spell 1", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace },
			{ name: "Quest 3", bit: 1 << 9, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 11, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Kettle", bit: 1 << 12, cost: { candles: 50 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp29 },
			{ name: FriendAction.DoubleFive, bit: 1 << 13, emoji: FRIEND_ACTION_EMOJIS.DoubleFive },
			{ name: "Shared space spell 2", bit: 1 << 14, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace },
			{ name: "Quest 5", bit: 1 << 15, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 16, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 6", bit: 1 << 17, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Potted plant",
				bit: 1 << 18,
				cost: { candles: 40 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp28,
			},
			{ name: "Quest 7", bit: 1 << 19, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 20, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 8", bit: 1 << 21, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Crab plushie",
				bit: 1 << 22,
				cost: { hearts: 19 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp23,
			},
			{
				name: "Manta plushie",
				bit: 1 << 23,
				cost: { hearts: 17 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp24,
			},
			{ name: FriendAction.Hug, bit: 1 << 24, emoji: FRIEND_ACTION_EMOJIS.Hug },
			{ name: "Shared space spell 3", bit: 1 << 25, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace },
			{ name: "Quest 9", bit: 1 << 26, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Shared space spell 4", bit: 1 << 27, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace },
			{ name: "Quest 10", bit: 1 << 28, emoji: MISCELLANEOUS_EMOJIS.Quest },
		],
	},
});
