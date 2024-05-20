import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 16 }, emoji: blessing3 })
			.set(1 << 3, { name: "Face accessory", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 4, { name: "Mask", cost: { seasonalCandles: 26 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: "Blessing 3", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 7, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { name: "Hair accessory", cost: { seasonalCandles: 36 }, emoji: hairAccessoryEmoji })
			.set(1 << 9, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
