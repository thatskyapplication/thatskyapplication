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
				name: "Quest 1",
				cosmetic: Cosmetic.RadianceGuideQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.RadianceGuideHeart1,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.RadiancePendant,
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.RadianceGuideUltimateCape,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.RadianceGuideUltimateMask,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Red dye",
				cosmetic: Cosmetic.RadianceGuideRedDye,
			},
			{
				name: "Yellow dye",
				cosmetic: Cosmetic.RadianceGuideYellowDye,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.RadianceGuideQuest2,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.RadianceGuideHeart2,
			},
			{
				name: "Green dye",
				cosmetic: Cosmetic.RadianceGuideGreenDye,
			},
			{
				name: "Cyan dye",
				cosmetic: Cosmetic.RadianceGuideCyanDye,
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.RadianceGuideQuest3,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.RadianceGuideHeart3,
			},
			{
				name: "Blue dye",
				cosmetic: Cosmetic.RadianceGuideBlueDye,
			},
			{
				name: "Purple dye",
				cosmetic: Cosmetic.RadianceGuidePurpleDye,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.RadianceGuideQuest4,
			},
			{
				name: "White dye",
				cosmetic: Cosmetic.RadianceGuideWhiteDye,
			},
			{
				name: "Black dye",
				cosmetic: Cosmetic.RadianceGuideBlackDye,
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.RadianceGuideQuest5,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.RadianceGuideHeart4,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.RadianceGuideCape,
				cost: { hearts: 12 },
			},
		],
	},
});
