import { Cosmetic, GuideSpirit, SeasonId, SpiritId } from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.RadianceGuide,
	seasonId: SeasonId.Radiance,
	offer: {
		inProgress: true,
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
		],
	},
});
