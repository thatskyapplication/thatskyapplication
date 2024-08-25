import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;

export default new GuideSpirit({
	name: SpiritName.AssemblyGuide,
	season: SeasonName.Assembly,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Shared space spell", bit: 1 << 22, emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace },
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 1, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace11 },
			{
				name: "Ultimate mask",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask44,
			},
			{
				name: "Ultimate hair",
				bit: 1 << 4,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair77,
			},
			{
				name: "Bugle",
				bit: 1 << 5,
				cost: { seasonalHearts: 2 },
				emoji: HELD_PROPS_EMOJIS.HeldProp21,
			},
			{
				name: "Ultimate cape",
				bit: 1 << 6,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape52,
			},
			{ name: FriendAction.HighFive, bit: 1 << 7, emoji: FRIEND_ACTION_EMOJIS.HighFive },
			{ name: "Quest 2", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Pillow",
				bit: 1 << 9,
				cost: { candles: 5 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp04,
			},
			{ name: "Quest 3", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 11, cost: { candles: 3 }, emoji: heartEmoji },
			{ name: FriendAction.Hug, bit: 1 << 12, emoji: FRIEND_ACTION_EMOJIS.Hug },
			{ name: "Quest 4", bit: 1 << 13, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Jar",
				bit: 1 << 14,
				cost: { candles: 8 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp03,
			},
			{ name: "Quest 5", bit: 1 << 15, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Brazier",
				bit: 1 << 16,
				cost: { hearts: 12 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp05,
			},
			{ name: FriendAction.DoubleFive, bit: 1 << 17, emoji: FRIEND_ACTION_EMOJIS.DoubleFive },
			{ name: "Quest 6", bit: 1 << 18, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 19, cost: { candles: 3 }, emoji: heartEmoji },
			{
				name: "Bookcase",
				bit: 1 << 20,
				cost: { candles: 30 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp06,
			},
			{
				name: "Tarpaulin",
				bit: 1 << 21,
				cost: { hearts: 24 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp09,
			},
		],
	},
});
