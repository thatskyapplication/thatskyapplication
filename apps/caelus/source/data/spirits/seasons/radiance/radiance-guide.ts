import { Cosmetic, SeasonId, SpiritId } from "@thatskyapplication/utility";
import { GuideSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../utility/emojis.js";

export default new GuideSpirit({
	id: SpiritId.RadianceGuide,
	seasonId: SeasonId.Radiance,
	offer: {
		inProgress: true,
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.RadianceGuideQuest1,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.RadianceGuideHeart1,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.RadiancePendant,
				emoji: NECKLACE_EMOJIS.Necklace46,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.RadianceGuideUltimateCape,
				emoji: CAPE_EMOJIS.Cape141,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.RadianceGuideUltimateMask,
				emoji: MASK_EMOJIS.Mask94,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Red dye",
				cosmetic: Cosmetic.RadianceGuideRedDye,
				emoji: MISCELLANEOUS_EMOJIS.DyeRed,
			},
			{
				name: "Yellow dye",
				cosmetic: Cosmetic.RadianceGuideYellowDye,
				emoji: MISCELLANEOUS_EMOJIS.DyeYellow,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.RadianceGuideQuest2,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.RadianceGuideHeart2,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Green dye",
				cosmetic: Cosmetic.RadianceGuideGreenDye,
				emoji: MISCELLANEOUS_EMOJIS.DyeGreen,
			},
			{
				name: "Cyan dye",
				cosmetic: Cosmetic.RadianceGuideCyanDye,
				emoji: MISCELLANEOUS_EMOJIS.DyeCyan,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.RadianceGuideQuest3,
				emoji: MISCELLANEOUS_EMOJIS.Quest,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.RadianceGuideHeart3,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blue dye",
				cosmetic: Cosmetic.RadianceGuideBlueDye,
				emoji: MISCELLANEOUS_EMOJIS.DyeBlue,
			},
			{
				name: "Purple dye",
				cosmetic: Cosmetic.RadianceGuidePurpleDye,
				emoji: MISCELLANEOUS_EMOJIS.DyePurple,
			},
		],
	},
});
