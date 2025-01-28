import {
	Cosmetic,
	FriendAction,
	RealmName,
	SeasonId,
	SpiritName,
} from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
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
} from "../../../../utility/emojis.js";

const heartEmoji = MISCELLANEOUS_EMOJIS.Heart;

export default new GuideSpirit({
	name: SpiritName.AssemblyGuide,
	seasonId: SeasonId.Assembly,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Shared space spell",
				cosmetic: Cosmetic.AssemblyGuideSharedSpaceSpell,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
			},
			{
				name: "Quest 1",
				cosmetic: Cosmetic.AssemblyGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.AssemblyGuideHeart1,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.AssemblyPendant,
				emoji: NECKLACE_EMOJIS.Necklace11,
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.AssemblyGuideUltimateMask,
				cost: { seasonalHearts: 1 },
				emoji: MASK_EMOJIS.Mask44,
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.AssemblyGuideUltimateHair,
				cost: { seasonalHearts: 1 },
				emoji: HAIR_EMOJIS.Hair77,
			},
			{
				name: "Bugle",
				cosmetic: Cosmetic.AssemblyGuideBugle,
				cost: { seasonalHearts: 2 },
				emoji: HELD_PROPS_EMOJIS.HeldProp21,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AssemblyGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape52,
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.AssemblyGuideHighFive,
				emoji: FRIEND_ACTION_EMOJIS.HighFive,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.AssemblyGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Pillow",
				cosmetic: Cosmetic.AssemblyGuidePillow,
				cost: { candles: 5 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp04,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.AssemblyGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.AssemblyGuideHeart2,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.AssemblyGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.AssemblyGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Jar",
				cosmetic: Cosmetic.AssemblyGuideJar,
				cost: { candles: 8 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp03,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.AssemblyGuideQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Brazier",
				cosmetic: Cosmetic.AssemblyGuideBrazier,
				cost: { hearts: 12 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp05,
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.AssemblyGuideDoubleFive,
				emoji: FRIEND_ACTION_EMOJIS.DoubleFive,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.AssemblyGuideQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.AssemblyGuideHeart3,
				cost: { candles: 3 },
				emoji: heartEmoji,
			},
			{
				name: "Bookcase",
				cosmetic: Cosmetic.AssemblyGuideBookcase,
				cost: { candles: 30 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp06,
			},
			{
				name: "Tarpaulin",
				cosmetic: Cosmetic.AssemblyGuideTarpaulin,
				cost: { hearts: 24 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp09,
			},
		],
	},
});
