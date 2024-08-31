import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
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
			{
				name: "Quest 1",
				cosmetic: Cosmetic.PerformanceGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Shared memory spell 1",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell1,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.PerformanceGuidePendant,
				emoji: NECKLACE_EMOJIS.Necklace19,
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.PerformanceGuideUltimateMask,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask59,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.PerformanceGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape78,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.PerformanceGuideUltimateHair,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair103,
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.PerformanceGuideHighFive,
				emoji: FRIEND_ACTION_EMOJIS.HighFive,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.PerformanceGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.PerformanceGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PerformanceGuideMask,
				cost: { candles: 42 },
				emoji: MASK_EMOJIS.Mask62,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.PerformanceGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Shared memory spell 2",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell2,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.PerformanceGuideDoubleFive,
				emoji: FRIEND_ACTION_EMOJIS.DoubleFive,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.PerformanceGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.PerformanceGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Shared memory spell 3",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell3,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.FriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.PerformanceGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.PerformanceGuideQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Shared memory spell 4",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell4,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{
				name: FriendAction.DuetDance,
				cosmetic: Cosmetic.PerformanceGuideDuetDance,
				emoji: FRIEND_ACTION_EMOJIS.DuetDance,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.PerformanceGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Flower pot",
				cosmetic: Cosmetic.PerformanceGuideFlowerPot,
				cost: { candles: 52 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp24,
			},
		],
	},
});
