import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.PerformanceGuide,
	season: SeasonName.Performance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Quest 1", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Shared memory spell 1", bit: 1 << 1, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory },
			{ name: "Pendant", bit: 1 << 2, emoji: NECKLACE_EMOJIS.Necklace19 },
			{
				name: "Ultimate mask",
				bit: 1 << 3,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask59,
			},
			{
				name: "Ultimate cape",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape78,
			},
			{
				name: "Ultimate hair",
				bit: 1 << 5,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair103,
			},
			{ name: FriendAction.HighFive, bit: 1 << 6, emoji: FRIEND_ACTION_EMOJIS.HighFive },
			{ name: "Heart 1", bit: 1 << 7, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 2", bit: 1 << 8, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Mask", bit: 1 << 9, cost: { candles: 42 }, emoji: MASK_EMOJIS.Mask62 },
			{ name: "Quest 3", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Shared memory spell 2",
				bit: 1 << 11,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{ name: FriendAction.DoubleFive, bit: 1 << 12, emoji: FRIEND_ACTION_EMOJIS.DoubleFive },
			{ name: "Heart 2", bit: 1 << 13, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 14, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Shared memory spell 3",
				bit: 1 << 15,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{ name: FriendAction.Hug, bit: 1 << 16, emoji: FRIEND_ACTION_EMOJIS.Hug },
			{ name: "Heart 3", bit: 1 << 17, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 18, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Shared memory spell 4",
				bit: 1 << 19,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{ name: FriendAction.DuetDance, bit: 1 << 20, emoji: FRIEND_ACTION_EMOJIS.DuetDance },
			{ name: "Heart 4", bit: 1 << 21, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Flower pot",
				bit: 1 << 22,
				cost: { candles: 52 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp24,
			},
		],
	},
});
