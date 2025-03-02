import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.AssemblyGuide,
	seasonId: SeasonId.Assembly,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{
				name: "Shared space spell",
				cosmetic: Cosmetic.AssemblyGuideSharedSpaceSpell,
			},
			{
				name: "Quest 1",
				cosmetic: Cosmetic.AssemblyGuideQuest1,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.AssemblyGuideHeart1,
				cost: { candles: 3 },
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.AssemblyPendant,
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.AssemblyGuideUltimateMask,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.AssemblyGuideUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Bugle",
				cosmetic: Cosmetic.AssemblyGuideBugle,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.AssemblyGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.AssemblyGuideHighFive,
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.AssemblyGuideQuest2,
			},
			{
				name: "Pillow",
				cosmetic: Cosmetic.AssemblyGuidePillow,
				cost: { candles: 5 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.AssemblyGuideQuest3,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.AssemblyGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.AssemblyGuideFriendActionHug,
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.AssemblyGuideQuest4,
			},
			{
				name: "Jar",
				cosmetic: Cosmetic.AssemblyGuideJar,
				cost: { candles: 8 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.AssemblyGuideQuest5,
			},
			{
				name: "Brazier",
				cosmetic: Cosmetic.AssemblyGuideBrazier,
				cost: { hearts: 12 },
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.AssemblyGuideDoubleFive,
			},
			{
				name: "Quest 6",
				cosmetic: Cosmetic.AssemblyGuideQuest6,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.AssemblyGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Bookcase",
				cosmetic: Cosmetic.AssemblyGuideBookcase,
				cost: { candles: 30 },
			},
			{
				name: "Tarpaulin",
				cosmetic: Cosmetic.AssemblyGuideTarpaulin,
				cost: { hearts: 24 },
			},
		],
	},
});
