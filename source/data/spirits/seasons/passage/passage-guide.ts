import { GuideSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.PassageGuide,
	seasonId: SeasonId.Passage,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.PassageGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.PassageGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.PassagePendant, emoji: NECKLACE_EMOJIS.Necklace29 },
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.PassageGuideUltimateMask,
				cost: { seasonalHearts: 2 },
				emoji: MASK_EMOJIS.Mask76,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.PassageGuideUltimateCape,
				cost: { seasonalHearts: 2 },
				emoji: CAPE_EMOJIS.Cape104,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.PassageGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Serow mask",
				cosmetic: Cosmetic.PassageGuideSerowMask,
				cost: { candles: 48 },
				emoji: MASK_EMOJIS.Mask77,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.PassageGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.PassageGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Boar mask",
				cosmetic: Cosmetic.PassageGuideBoarMask,
				cost: { candles: 44 },
				emoji: MASK_EMOJIS.Mask78,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.PassageGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.PassageGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Monkey mask",
				cosmetic: Cosmetic.PassageGuideMonkeyMask,
				cost: { candles: 46 },
				emoji: MASK_EMOJIS.Mask79,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.PassageGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.PassageGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Hacky sack",
				cosmetic: Cosmetic.PassageGuideHackySack,
				cost: { hearts: 39 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp26,
			},
			{
				name: "Racoon mask",
				cosmetic: Cosmetic.PassageGuideRacoonMask,
				cost: { candles: 52 },
				emoji: MASK_EMOJIS.Mask80,
			},
		],
	},
});
