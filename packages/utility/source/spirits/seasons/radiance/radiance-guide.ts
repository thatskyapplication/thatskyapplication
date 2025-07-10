import { Cosmetic } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RadianceGuide,
	seasonId: SeasonId.Radiance,
	offer: {
		current: [
			{
				cosmetic: Cosmetic.RadianceGuideQuest1,
			},
			{
				cosmetic: Cosmetic.RadianceGuideHeart1,
			},
			{
				cosmetic: Cosmetic.RadiancePendant,
			},
			{
				cosmetic: Cosmetic.RadianceGuideUltimateCape,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.RadianceGuideUltimateMask,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.RadianceGuideRedDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideYellowDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideQuest2,
			},
			{
				cosmetic: Cosmetic.RadianceGuideHeart2,
			},
			{
				cosmetic: Cosmetic.RadianceGuideGreenDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideCyanDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideQuest3,
			},
			{
				cosmetic: Cosmetic.RadianceGuideHeart3,
			},
			{
				cosmetic: Cosmetic.RadianceGuideBlueDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuidePurpleDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideQuest4,
			},
			{
				cosmetic: Cosmetic.RadianceGuideWhiteDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideBlackDye,
			},
			{
				cosmetic: Cosmetic.RadianceGuideQuest5,
			},
			{
				cosmetic: Cosmetic.RadianceGuideHeart4,
			},
			{
				cosmetic: Cosmetic.RadianceGuideCape,
				cost: { hearts: 12 },
			},
		],
	},
});
