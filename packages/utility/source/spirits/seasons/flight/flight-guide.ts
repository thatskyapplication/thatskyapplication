import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.FlightGuide,
	seasonId: SeasonId.Flight,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 1 },
				cosmetic: Cosmetic.FlightGuideQuest1,
			},
			{
				cosmetic: Cosmetic.FlightGuideHeart1,
				cost: { candles: 3 },
			},
			{ cosmetic: Cosmetic.FlightPendant },
			{
				cosmetic: Cosmetic.FlightGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				cosmetic: Cosmetic.FlightGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 2 },
				cosmetic: Cosmetic.FlightGuideQuest2,
			},
			{
				cosmetic: Cosmetic.FlightGuideHeart2,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.FlightGuideHighFive,
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 3 },
				cosmetic: Cosmetic.FlightGuideQuest3,
			},
			{
				cosmetic: Cosmetic.FlightGuideHeart3,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 4 },
				cosmetic: Cosmetic.FlightGuideQuest4,
			},
			{
				cosmetic: Cosmetic.FlightGuideHeart4,
				cost: { candles: 3 },
			},
			{
				translation: { key: CosmeticCommon.QuestMultiple, number: 5 },
				cosmetic: Cosmetic.FlightGuideQuest5,
			},
			{
				cosmetic: Cosmetic.FlightGuideHeart5,
				cost: { candles: 3 },
			},
			{
				cosmetic: Cosmetic.FlightGuideFriendActionHug,
			},
		],
	},
});
