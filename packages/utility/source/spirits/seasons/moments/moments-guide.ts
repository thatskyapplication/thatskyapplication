import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.MomentsGuide,
	seasonId: SeasonId.Moments,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{
				cosmetic: Cosmetic.MomentsGuideCamera,
			},
			{ cosmetic: Cosmetic.MomentsPendant },
			{
				cosmetic: Cosmetic.MomentsGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.MomentsGuideUltimateCamera,
				cost: { seasonalHearts: 1 },
			},
			{
				cosmetic: Cosmetic.MomentsGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.MomentsGuideQuest1,
			},
			{
				cosmetic: Cosmetic.MomentsGuideHeart1,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.MomentsGuideQuest2,
			},
			{
				cosmetic: Cosmetic.MomentsGuideHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.MomentsGuideDoubleFive,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.MomentsGuideQuest3,
			},
			{
				cosmetic: Cosmetic.MomentsGuideHeart3,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.MomentsGuideQuest4,
			},
			{
				cosmetic: Cosmetic.MomentsGuideHeart4,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.MomentsGuideQuest5,
			},
			{
				cosmetic: Cosmetic.MomentsGuideHeart5,
				cost: { candles: 3 },
			},
		],
	},
});
