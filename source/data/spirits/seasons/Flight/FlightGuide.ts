import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility2/spirits.js";

export default new GuideSpirit({
	name: SpiritName.FlightGuide,
	seasonId: SeasonId.Flight,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		current: [
			{ name: "Quest 1", cosmetic: Cosmetic.FlightGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.FlightGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Pendant", cosmetic: Cosmetic.FlightPendant, emoji: NECKLACE_EMOJIS.Necklace15 },
			{
				name: "Ultimate hair accessory",
				cosmetic: Cosmetic.FlightGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory13,
			},
			{
				name: "Ultimate outfit",
				cosmetic: Cosmetic.FlightGuideUltimateOutfit,
				cost: { seasonalHearts: 2 },
				emoji: OUTFIT_EMOJIS.Outfit24,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.FlightGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.FlightGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.HighFive,
				cosmetic: Cosmetic.FlightGuideHighFive,
				emoji: FRIEND_ACTION_EMOJIS.HighFive,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.FlightGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.FlightGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.FlightGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.FlightGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.FlightGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.FlightGuideHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.Hug,
				cosmetic: Cosmetic.FlightGuideFriendActionHug,
				emoji: FRIEND_ACTION_EMOJIS.Hug,
			},
		],
	},
});
