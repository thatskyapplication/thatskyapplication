import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.SideHug;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask81;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory27;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory25;
const capeEmoji = CAPE_EMOJIS.Cape107;

export default new SeasonalSpirit({
	name: SpiritName.ReassuringRanger,
	season: SeasonName.Moments,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: `${action} 2`, bit: 1 << 1, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
			{ name: "Face accessory", bit: 1 << 3, emoji: faceAccessoryEmoji },
			{ name: "Mask", bit: 1 << 4, cost: { seasonalCandles: 26 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 6, cost: { seasonalCandles: 30 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
			{
				name: "Hair accessory",
				bit: 1 << 8,
				cost: { seasonalCandles: 36 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", bit: 1 << 9, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
