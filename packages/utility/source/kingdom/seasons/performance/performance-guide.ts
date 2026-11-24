import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new GuideSpirit({
	id: SpiritId.PerformanceGuide,
	seasonId: SeasonId.Performance,
	area: AreaName.VillageTheatre,
	friendshipTrees: {
		seasonal: {
			friendshipTree: [
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideQuest1,
					},
					{
						translation: { key: CosmeticCommon.SharedMemorySpellMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell1,
					},
					{
						translation: CosmeticCommon.Pendant,
						cosmetic: Cosmetic.PerformanceGuidePendant,
						seasonPass: true,
						children: [
							{
								translation: CosmeticCommon.UltimateMask,
								cosmetic: Cosmetic.PerformanceGuideUltimateMask,
								cost: { seasonalHearts: 1 },
								seasonPass: true,
							},
							{
								translation: CosmeticCommon.UltimateCape,
								cosmetic: Cosmetic.PerformanceGuideUltimateCape,
								cost: { seasonalHearts: 2 },
								seasonPass: true,
							},
							{
								translation: CosmeticCommon.UltimateHair,
								cosmetic: Cosmetic.PerformanceGuideUltimateHair,
								cost: { seasonalHearts: 1 },
								seasonPass: true,
							},
						],
					},
				],
				[
					{ translation: CosmeticCommon.HighFive, cosmetic: Cosmetic.PerformanceGuideHighFive },
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideHeart1,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideQuest2,
					},
					{
						translation: CosmeticCommon.Mask,
						cosmetic: Cosmetic.PerformanceGuideMask,
						cost: { candles: 42 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideQuest3,
					},
					{
						translation: { key: CosmeticCommon.SharedMemorySpellMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell2,
					},
				],
				[
					{ translation: CosmeticCommon.DoubleFive, cosmetic: Cosmetic.PerformanceGuideDoubleFive },
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideHeart2,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
						cosmetic: Cosmetic.PerformanceGuideQuest4,
					},
					{
						translation: { key: CosmeticCommon.SharedMemorySpellMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell3,
					},
				],
				[
					{ translation: CosmeticCommon.Hug, cosmetic: Cosmetic.FriendActionHug },
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideHeart3,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
						cosmetic: Cosmetic.PerformanceGuideQuest5,
					},
					{
						translation: { key: CosmeticCommon.SharedMemorySpellMultiple, number: 4 },
						cosmetic: Cosmetic.PerformanceGuideSharedMemorySpell4,
					},
				],
				[
					{
						cosmetic: Cosmetic.PerformanceGuideDuetDance,
					},
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
						cosmetic: Cosmetic.PerformanceGuideHeart4,
					},
				],
				[
					{
						cosmetic: Cosmetic.PerformanceGuideFlowerPot,
						cost: { candles: 52 },
					},
				],
			],
		},
		postSeason: {
			friendshipTree: [
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideQuest1,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideQuest2,
					},
					{ translation: CosmeticCommon.HighFive, cosmetic: Cosmetic.PerformanceGuideHighFive },
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideBlessing4,
					},
				],
				[
					null,
					null,
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
						cosmetic: Cosmetic.PerformanceGuideHeart1,
						cost: { candles: 3 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideQuest3,
					},
					{ translation: CosmeticCommon.DoubleFive, cosmetic: Cosmetic.PerformanceGuideDoubleFive },
					{
						translation: CosmeticCommon.Mask,
						cosmetic: Cosmetic.PerformanceGuideMask,
						cost: { candles: 42 },
					},
				],
				[
					null,
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideHeart2,
						cost: { candles: 3 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.PerformanceGuideBlessing2,
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
						cosmetic: Cosmetic.PerformanceGuideQuest4,
					},
					{ translation: CosmeticCommon.Hug, cosmetic: Cosmetic.FriendActionHug },
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideBlessing3,
					},
				],
				[
					null,
					null,
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
						cosmetic: Cosmetic.PerformanceGuideHeart3,
						cost: { candles: 3 },
					},
				],
				[
					{
						translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
						cosmetic: Cosmetic.PerformanceGuideQuest5,
					},
					{
						cosmetic: Cosmetic.PerformanceGuideDuetDance,
					},
					{
						cosmetic: Cosmetic.PerformanceGuideFlowerPot,
						cost: { candles: 52 },
					},
				],
				[
					null,
					{
						translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
						cosmetic: Cosmetic.PerformanceGuideHeart4,
						cost: { candles: 3 },
					},
					{ translation: CosmeticCommon.TrailSpell, cosmetic: Cosmetic.PerformanceGuideTrailSpell },
				],
			],
		},
	},
});
