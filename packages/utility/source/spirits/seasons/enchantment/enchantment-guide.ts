import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.EnchantmentGuide,
	seasonId: SeasonId.Enchantment,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographic: false,
		current: [
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
					cosmetic: Cosmetic.EnchantmentGuideQuest1,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 1 },
					cosmetic: Cosmetic.EnchantmentGuideHeart1,
					cost: { candles: 3 },
				},
				{
					cosmetic: Cosmetic.EnchantmentPendant,
					seasonPass: true,
					children: [
						{
							cosmetic: Cosmetic.EnchantmentUltimateFaceAccessory,
							cost: { seasonalHearts: 2 },
							seasonPass: true,
						},
						{
							cosmetic: Cosmetic.EnchantmentTurban,
							cost: { seasonalHearts: 4 },
							seasonPass: true,
						},
					],
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
					cosmetic: Cosmetic.EnchantmentGuideQuest2,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 2 },
					cosmetic: Cosmetic.EnchantmentGuideHeart2,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
					cosmetic: Cosmetic.EnchantmentGuideQuest3,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 3 },
					cosmetic: Cosmetic.EnchantmentGuideHeart3,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
					cosmetic: Cosmetic.EnchantmentGuideQuest4,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 4 },
					cosmetic: Cosmetic.EnchantmentGuideHeart4,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
					cosmetic: Cosmetic.EnchantmentGuideQuest5,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 5 },
					cosmetic: Cosmetic.EnchantmentGuideHeart5,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.QuestMultiple, number: 6 },
					cosmetic: Cosmetic.EnchantmentGuideQuest6,
				},
				{
					translation: { key: CosmeticCommon.HeartMultiple, number: 6 },
					cosmetic: Cosmetic.EnchantmentGuideHeart6,
					cost: { candles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EnchantmentGuideHug,
				},
			],
		],
	},
});
