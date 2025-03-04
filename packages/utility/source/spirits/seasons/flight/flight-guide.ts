import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { GuideSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.FlightGuide,
	seasonId: SeasonId.Flight,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.FlightGuideQuest1 },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.FlightGuideHeart1,
				cost: { candles: 3 },
			},
			{ name: "Pendant", cosmetic: Cosmetic.FlightPendant },
			{
				name: "Ultimate hair accessory",
				cosmetic: Cosmetic.FlightGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.FlightGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
			},
			{ name: "Quest 2", cosmetic: Cosmetic.FlightGuideQuest2 },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.FlightGuideHeart2,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.FlightGuideHighFive,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.FlightGuideQuest3 },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.FlightGuideHeart3,
				cost: { candles: 3 },
			},
			{ name: "Quest 4", cosmetic: Cosmetic.FlightGuideQuest4 },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.FlightGuideHeart4,
				cost: { candles: 3 },
			},
			{ name: "Quest 5", cosmetic: Cosmetic.FlightGuideQuest5 },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.FlightGuideHeart5,
				cost: { candles: 3 },
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.FlightGuideFriendActionHug,
			},
		],
	},
});
