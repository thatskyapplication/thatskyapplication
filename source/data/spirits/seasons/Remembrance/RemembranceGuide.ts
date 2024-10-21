import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility2/spirits.js";

export default new GuideSpirit({
	name: SpiritName.RemembranceGuide,
	seasonId: SeasonId.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.RemembranceGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.RemembranceGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.RemembrancePendant, emoji: NECKLACE_EMOJIS.Necklace25 },
			{
				name: "Ultimate neck accessory",
				cosmetic: Cosmetic.RemembranceGuideUltimateNeckAccessory,
				cost: { seasonalHearts: 2 },
				emoji: NECKLACE_EMOJIS.Necklace27,
			},
			{
				name: "Ultimate prop",
				cosmetic: Cosmetic.RemembranceGuideUltimateProp,
				cost: { seasonalHearts: 2 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp30,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.RemembranceGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Chimes",
				cosmetic: Cosmetic.RemembranceGuideChimes,
				cost: { candles: 30 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp22,
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.RemembranceGuideHighFive,
				emoji: FRIEND_ACTION_EMOJIS.HighFive,
			},
			{
				name: "Shared space spell 1",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell1,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.RemembranceGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.RemembranceGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.RemembranceGuideQuest4,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Kettle",
				cosmetic: Cosmetic.RemembranceGuideKettle,
				cost: { candles: 50 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp29,
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.RemembranceGuideDoubleFive,
				emoji: FRIEND_ACTION_EMOJIS.DoubleFive,
			},
			{
				name: "Shared space spell 2",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell2,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.RemembranceGuideQuest5,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.RemembranceGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.RemembranceGuideQuest6,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Potted plant",
				cosmetic: Cosmetic.RemembranceGuidePottedPlant,
				cost: { candles: 40 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp28,
			},
			{
				name: "Quest 7",
				cosmetic: Cosmetic.RemembranceGuideQuest7,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.RemembranceGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Quest 8",
				cosmetic: Cosmetic.RemembranceGuideQuest8,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Crab plushie",
				cosmetic: Cosmetic.RemembranceGuideCrabPlushie,
				cost: { hearts: 19 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp23,
			},
			{
				name: "Manta plushie",
				cosmetic: Cosmetic.RemembranceGuideMantaPlushie,
				cost: { hearts: 17 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp24,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.RemembranceGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
			{
				name: "Shared space spell 3",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell3,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
			},
			{
				name: "Quest 9",
				cosmetic: Cosmetic.RemembranceGuideQuest9,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Shared space spell 4",
				cosmetic: Cosmetic.RemembranceGuideSharedSpaceSpell4,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedSpace,
			},
			{
				name: "Quest 10",
				cosmetic: Cosmetic.RemembranceGuideQuest10,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
		],
	},
});
