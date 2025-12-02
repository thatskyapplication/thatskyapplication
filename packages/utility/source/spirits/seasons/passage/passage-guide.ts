import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.PassageGuide,
	seasonId: SeasonId.Passage,
	realm: RealmName.IsleOfDawn,
	offer: {
		hasInfographic: false,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.PassageGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.PassageGuideHeart1,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.PassagePendant,
					seasonPass: true,
					thirdHeight: true,
					children: [
						{
							cosmetic: Cosmetic.PassageGuideUltimateMask,
							seasonPass: true,
							cost: { seasonalHearts: 2 },
						},
						{
							cosmetic: Cosmetic.PassageGuideUltimateCape,
							seasonPass: true,
							cost: { seasonalHearts: 2 },
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.PassageGuideQuest2,
				},
				{
					cosmetic: Cosmetic.PassageGuideSerowMask,
					cost: { candles: 48 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.PassageGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.PassageGuideHeart2,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.PassageGuideBoarMask,
					cost: { candles: 44 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.PassageGuideQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.PassageGuideHeart3,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.PassageGuideMonkeyMask,
					cost: { candles: 46 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.PassageGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.PassageGuideHeart4,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.PassageGuideHackySack,
					cost: { hearts: 39 },
				},
			],
			[
				{
					cosmetic: Cosmetic.PassageGuideRacoonMask,
					cost: { candles: 52 },
				},
			],
		],
	},
});
