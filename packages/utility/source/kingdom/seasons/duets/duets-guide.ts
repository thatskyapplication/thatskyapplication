import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.DuetsGuide,
	seasonId: SeasonId.Duets,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.DuetsGuideQuest1,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DuetsGuideMask,
					cost: { candles: 65 },
				},
				{
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.DuetsPendant,
					seasonPass: true,
					children: [
						{
							translation: { key: CosmeticCommon.UltimatePropMultiple, number: 1 },
							cosmetic: Cosmetic.DuetsGuideUltimateProp1,
							cost: { seasonalHearts: 1 },
							seasonPass: true,
						},
						{
							translation: CosmeticCommon.UltimateCape,
							cosmetic: Cosmetic.DuetsGuideUltimateCape,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							translation: { key: CosmeticCommon.UltimatePropMultiple, number: 2 },
							cosmetic: Cosmetic.DuetsGuideUltimateProp2,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.DuetsGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.DuetsGuideHeart1,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.DuetsGuideQuest3,
				},
				{
					cosmetic: Cosmetic.DuetsGuideDuetBow1,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.DuetsGuideQuest4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.DuetsGuideQuest5,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.DuetsGuideHeart2,
				},
			],
		],
	},
});
