import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility2/spirits.js";

export default new GuideSpirit({
	name: SpiritName.MomentsGuide,
	seasonId: SeasonId.Moments,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{
				name: "Camera",
				cosmetic: Cosmetic.MomentsGuideCamera,
				emoji: HELD_PROPS_EMOJIS.HeldProp38,
			},
			{ name: "Pendant", cosmetic: Cosmetic.MomentsPendant, emoji: NECKLACE_EMOJIS.Necklace31 },
			{
				name: "Ultimate face accessory",
				cosmetic: Cosmetic.MomentsGuideUltimateFaceAccessory,
				cost: { seasonalHearts: 1 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory28,
			},
			{
				name: "Ultimate camera",
				cosmetic: Cosmetic.MomentsGuideUltimateCamera,
				cost: { seasonalHearts: 1 },
				emoji: HELD_PROPS_EMOJIS.HeldProp37,
			},
			{
				name: "Ultimate hair accessory",
				cosmetic: Cosmetic.MomentsGuideUltimateHairAccessory,
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory27,
			},
			{ name: "Quest 1", cosmetic: Cosmetic.MomentsGuideQuest1, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 1",
				cosmetic: Cosmetic.MomentsGuideHeart1,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 2", cosmetic: Cosmetic.MomentsGuideQuest2, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 2",
				cosmetic: Cosmetic.MomentsGuideHeart2,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: FriendAction.DoubleFive,
				cosmetic: Cosmetic.MomentsGuideDoubleFive,
				emoji: FRIEND_ACTION_EMOJIS.DoubleFive,
			},
			{ name: "Quest 3", cosmetic: Cosmetic.MomentsGuideQuest3, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 3",
				cosmetic: Cosmetic.MomentsGuideHeart3,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 4", cosmetic: Cosmetic.MomentsGuideQuest4, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 4",
				cosmetic: Cosmetic.MomentsGuideHeart4,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{ name: "Quest 5", cosmetic: Cosmetic.MomentsGuideQuest5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{
				name: "Heart 5",
				cosmetic: Cosmetic.MomentsGuideHeart5,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
		],
	},
});
