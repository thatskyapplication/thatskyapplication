import { GuideSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, SpiritName } from "../../../../Utility/spirits.js";

export default new GuideSpirit({
	name: SpiritName.MomentsGuide,
	season: SeasonName.Moments,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: "Camera", bit: 1 << 0, emoji: HELD_PROPS_EMOJIS.HeldProp38 },
			{ name: "Pendant", bit: 1 << 1, emoji: NECKLACE_EMOJIS.Necklace31 },
			{
				name: "Ultimate face accessory",
				bit: 1 << 2,
				cost: { seasonalHearts: 1 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory28,
			},
			{ name: "Ultimate camera", bit: 1 << 3, cost: { seasonalHearts: 1 }, emoji: HELD_PROPS_EMOJIS.HeldProp37 },
			{
				name: "Ultimate hair accessory",
				bit: 1 << 4,
				cost: { seasonalHearts: 2 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory27,
			},
			{ name: "Quest 1", bit: 1 << 5, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 1", bit: 1 << 6, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 2", bit: 1 << 7, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 2", bit: 1 << 8, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: FriendAction.DoubleFive, bit: 1 << 9, emoji: FRIEND_ACTION_EMOJIS.DoubleFive },
			{ name: "Quest 3", bit: 1 << 10, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 3", bit: 1 << 11, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 4", bit: 1 << 12, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 4", bit: 1 << 13, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Quest 5", bit: 1 << 14, emoji: MISCELLANEOUS_EMOJIS.Quest },
			{ name: "Heart 5", bit: 1 << 15, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
		],
	},
});
