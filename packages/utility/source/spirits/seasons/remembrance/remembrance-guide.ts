import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.RemembranceGuide,
	seasonId: SeasonId.Remembrance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.RemembranceGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.RemembranceGuideHeart1,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.RemembrancePendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.RemembranceGuideUltimateNeckAccessory,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.RemembranceGuideUltimateProp,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.RemembranceGuideQuest2,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideChimes,
					cost: { candles: 30 },
				},
			],
			[
				{
					cosmetic: Cosmetic.RemembranceGuideHighFive,
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.RemembranceGuideBlessing,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.RemembranceGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.RemembranceGuideHeart2,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.RemembranceGuideQuest4,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideKettle,
					cost: { candles: 50 },
				},
			],
			[
				{
					cosmetic: Cosmetic.RemembranceGuideDoubleFive,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideTrailSpell1,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.RemembranceGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.RemembranceGuideHeart3,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.RemembranceGuideQuest6,
				},
				{
					cosmetic: Cosmetic.RemembranceGuidePottedPlant,
					cost: { candles: 40 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 7 },
					cosmetic: Cosmetic.RemembranceGuideQuest7,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.RemembranceGuideHeart4,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 8 },
					cosmetic: Cosmetic.RemembranceGuideQuest8,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideCrabPlushie,
					cost: { hearts: 19 },
				},
				{
					cosmetic: Cosmetic.RemembranceGuideMantaPlushie,
					cost: { hearts: 17 },
				},
			],
			[
				{
					cosmetic: Cosmetic.RemembranceGuideFriendActionHug,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideTrailSpell2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 9 },
					cosmetic: Cosmetic.RemembranceGuideQuest9,
				},
				{
					cosmetic: Cosmetic.RemembranceGuideTrailSpell3,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 10 },
					cosmetic: Cosmetic.RemembranceGuideQuest10,
				},
			],
		],
	},
});
