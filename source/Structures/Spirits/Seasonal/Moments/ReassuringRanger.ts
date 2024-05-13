/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const action = FriendAction.SideHug;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask81;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory27;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory25;
const capeEmoji = CAPE_EMOJIS.Cape110;

export default new SeasonalSpirit({
	name: SpiritName.ReassuringRanger,
	season: SeasonName.Moments,
	action,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing3 })
			.set(1 << 3, { item: "Face accessory", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 26 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: "Blessing 3", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 7, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { item: "Hair accessory", cost: { seasonalCandles: 36 }, emoji: hairAccessoryEmoji })
			.set(1 << 9, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
