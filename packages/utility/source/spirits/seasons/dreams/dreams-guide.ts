import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.DreamsGuide,
	seasonId: SeasonId.Dreams,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.DreamsGuideQuest1,
			},
			{
				cosmetic: Cosmetic.DreamsGuideHeart1,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.DreamsGuidePhoenixMask,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.DreamsGuideUltimateCape,
				cost: { seasonalHearts: 2 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.DreamsGuideQuest2,
			},
			{
				cosmetic: Cosmetic.DreamsGuideHeart2,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.DreamsGuideQuest3,
			},
			{
				cosmetic: Cosmetic.DreamsGuideHeart3,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.DreamsGuideQuest4,
			},
			{
				cosmetic: Cosmetic.DreamsGuideHeart4,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.DreamsGuideQuest5,
			},
			{
				cosmetic: Cosmetic.DreamsGuideHeart5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.DreamsGuideFriendActionHug,
			},
		],
	},
});
