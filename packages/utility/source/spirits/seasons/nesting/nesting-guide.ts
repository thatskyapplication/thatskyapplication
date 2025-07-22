import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.NestingGuide,
	seasonId: SeasonId.Nesting,
	offer: {
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.NestingGuideQuest1,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
				cosmetic: Cosmetic.NestingGuideHeart1,
			},
			{ cosmetic: Cosmetic.NestingPendant },
			{
				cosmetic: Cosmetic.NestingGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.NestingGuideUltimateProp,
				cost: { seasonalHearts: 2 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.NestingGuideQuest2,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
				cosmetic: Cosmetic.NestingGuideHeart2,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.NestingGuideQuest3,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
				cosmetic: Cosmetic.NestingGuideHeart3,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.NestingGuideQuest4,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
				cosmetic: Cosmetic.NestingGuideHeart4,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.NestingGuideQuest5,
			},
			{
				translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
				cosmetic: Cosmetic.NestingGuideHeart5,
			},
		],
	},
});
