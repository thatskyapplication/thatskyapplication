import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.SanctuaryGuide,
	seasonId: SeasonId.Sanctuary,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.SanctuaryGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.SanctuaryGuideHeart1,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.SanctuaryPendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.SanctuaryHandpan,
							cost: { seasonalHearts: 3 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.SanctuaryGuideMantaCape,
							cost: { seasonalHearts: 3 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.SanctuaryGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.SanctuaryGuideHeart2,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.SanctuaryGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.SanctuaryGuideHeart3,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.SanctuaryGuideQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.SanctuaryGuideHeart4,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.SanctuaryGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
					cosmetic: Cosmetic.SanctuaryGuideHeart5,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.SanctuaryGuideQuest6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 6 },
					cosmetic: Cosmetic.SanctuaryGuideHeart6,
					cost: { candles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SanctuaryGuideFriendActionHug,
				},
			],
		],
	},
});
