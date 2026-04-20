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
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.RadiancePendant,
					seasonPass: true,
					children: [
						{
							translation: CosmeticCommon.UltimateCape,
							cosmetic: Cosmetic.RadianceGuideUltimateCape,
							cost: { seasonalHearts: 1 },
							seasonPass: true,
						},
						{
							translation: CosmeticCommon.UltimateMask,
							cosmetic: Cosmetic.RadianceGuideUltimateMask,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{ translation: CosmeticCommon.RedDye, cosmetic: Cosmetic.RadianceGuideRedDye },
				{ translation: CosmeticCommon.YellowDye, cosmetic: Cosmetic.RadianceGuideYellowDye },
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
				{ translation: CosmeticCommon.GreenDye, cosmetic: Cosmetic.RadianceGuideGreenDye },
				{ translation: CosmeticCommon.CyanDye, cosmetic: Cosmetic.RadianceGuideCyanDye },
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
				{ translation: CosmeticCommon.BlueDye, cosmetic: Cosmetic.RadianceGuideBlueDye },
				{ translation: CosmeticCommon.PurpleDye, cosmetic: Cosmetic.RadianceGuidePurpleDye },
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.RadianceGuideQuest4,
				},
				{ translation: CosmeticCommon.WhiteDye, cosmetic: Cosmetic.RadianceGuideWhiteDye },
				{ translation: CosmeticCommon.BlackDye, cosmetic: Cosmetic.RadianceGuideBlackDye },
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
