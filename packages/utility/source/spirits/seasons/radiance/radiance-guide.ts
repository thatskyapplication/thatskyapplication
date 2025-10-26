import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RadianceGuide,
	seasonId: SeasonId.Radiance,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceGuideHeart1,
				},
				{
					cosmetic: Cosmetic.RadiancePendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.RadianceGuideUltimateCape,
							cost: { seasonalHearts: 1 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.RadianceGuideUltimateMask,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceGuideRedDye,
				},
				{
					cosmetic: Cosmetic.RadianceGuideYellowDye,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceGuideHeart2,
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceGuideGreenDye,
				},
				{
					cosmetic: Cosmetic.RadianceGuideCyanDye,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.RadianceGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.RadianceGuideHeart3,
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceGuideBlueDye,
				},
				{
					cosmetic: Cosmetic.RadianceGuidePurpleDye,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.RadianceGuideQuest4,
				},
				{
					cosmetic: Cosmetic.RadianceGuideWhiteDye,
				},
				{
					cosmetic: Cosmetic.RadianceGuideBlackDye,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.RadianceGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.RadianceGuideHeart4,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.RadianceGuideCape,
					cost: { hearts: 12 },
				},
			],
		],
	},
});
