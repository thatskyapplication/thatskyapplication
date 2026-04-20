import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { RealmName } from "../../geography.js";

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
					translation: CosmeticCommon.Pendant,
					cosmetic: Cosmetic.RemembrancePendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.RemembranceGuideUltimateNeckAccessory,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							translation: CosmeticCommon.UltimateProp,
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
				{ translation: CosmeticCommon.HighFive, cosmetic: Cosmetic.RemembranceGuideHighFive },
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
				{ translation: CosmeticCommon.DoubleFive, cosmetic: Cosmetic.RemembranceGuideDoubleFive },
				{
					translation: { key: CosmeticCommon.TrailSpellMultiple, number: 1 },
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
				{ translation: CosmeticCommon.Hug, cosmetic: Cosmetic.RemembranceGuideFriendActionHug },
				{
					translation: { key: CosmeticCommon.TrailSpellMultiple, number: 2 },
					cosmetic: Cosmetic.RemembranceGuideTrailSpell2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 9 },
					cosmetic: Cosmetic.RemembranceGuideQuest9,
				},
				{
					translation: { key: CosmeticCommon.TrailSpellMultiple, number: 3 },
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
