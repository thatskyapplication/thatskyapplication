import {
	Cosmetic,
	FriendAction,
	GuideSpirit,
	RealmName,
	SeasonId,
	SpiritId,
} from "@thatskyapplication/utility";

export default new GuideSpirit({
	id: SpiritId.PerformanceGuide,
	seasonId: SeasonId.Performance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{
				name: "Quest 1",
				cosmetic: Cosmetic.PerformanceGuideQuest1,
			},
			{
				name: "Shared memory spell 1",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell1,
			},
			{
				name: "Pendant",
				cosmetic: Cosmetic.PerformanceGuidePendant,
			},
			{
				name: "Ultimate mask",
				cosmetic: Cosmetic.PerformanceGuideUltimateMask,
				cost: { seasonalHearts: 1 },
			},
			{
				name: "Ultimate cape",
				cosmetic: Cosmetic.PerformanceGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate hair",
				cosmetic: Cosmetic.PerformanceGuideUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.PerformanceGuideHighFive,
			},
			{
				name: "Heart 1",
				cosmetic: Cosmetic.PerformanceGuideHeart1,
				cost: { candles: 3 },
			},
			{
				name: "Quest 2",
				cosmetic: Cosmetic.PerformanceGuideQuest2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.PerformanceGuideMask,
				cost: { candles: 42 },
			},
			{
				name: "Quest 3",
				cosmetic: Cosmetic.PerformanceGuideQuest3,
			},
			{
				name: "Shared memory spell 2",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell2,
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.PerformanceGuideDoubleFive,
			},
			{
				name: "Heart 2",
				cosmetic: Cosmetic.PerformanceGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: "Quest 4",
				cosmetic: Cosmetic.PerformanceGuideQuest4,
			},
			{
				name: "Shared memory spell 3",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell3,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.FriendActionHug,
			},
			{
				name: "Heart 3",
				cosmetic: Cosmetic.PerformanceGuideHeart3,
				cost: { candles: 3 },
			},
			{
				name: "Quest 5",
				cosmetic: Cosmetic.PerformanceGuideQuest5,
			},
			{
				name: "Shared memory spell 4",
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell4,
			},
			{
				name: FriendAction.DuetDance,
				cosmetic: Cosmetic.PerformanceGuideDuetDance,
			},
			{
				name: "Heart 4",
				cosmetic: Cosmetic.PerformanceGuideHeart4,
				cost: { candles: 3 },
			},
			{
				name: "Flower pot",
				cosmetic: Cosmetic.PerformanceGuideFlowerPot,
				cost: { candles: 52 },
			},
		],
	},
});
