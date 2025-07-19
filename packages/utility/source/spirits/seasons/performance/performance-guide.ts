import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.PerformanceGuide,
	seasonId: SeasonId.Performance,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.PerformanceGuideQuest1,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell1,
			},
			{
				cosmetic: Cosmetic.PerformanceGuidePendant,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideUltimateMask,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.PerformanceGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.PerformanceGuideUltimateHair,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.PerformanceGuideHighFive,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
				cosmetic: Cosmetic.PerformanceGuideHeart1,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.PerformanceGuideQuest2,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideMask,
				cost: { candles: 42 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.PerformanceGuideQuest3,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell2,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideDoubleFive,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
				cosmetic: Cosmetic.PerformanceGuideHeart2,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.PerformanceGuideQuest4,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell3,
			},
			{
				cosmetic: Cosmetic.FriendActionHug,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
				cosmetic: Cosmetic.PerformanceGuideHeart3,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.PerformanceGuideQuest5,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell4,
			},
			{
				cosmetic: Cosmetic.PerformanceGuideDuetDance,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
				cosmetic: Cosmetic.PerformanceGuideHeart4,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.PerformanceGuideFlowerPot,
				cost: { candles: 52 },
			},
		],
	},
});
