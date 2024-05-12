/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTION_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, SeasonalSpirit } from "../../Base.js";

const action = FriendAction.CradleCarry;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const actionEmoji = FRIEND_ACTION_EMOJIS.CradleCarry;
const maskEmoji = MASK_EMOJIS.Mask87;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory36;
const capeEmoji = CAPE_EMOJIS.Cape123;

export default new SeasonalSpirit({
	name: SpiritName.FeudalLord,
	season: SeasonName.NineColoredDeer,
	action,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 6 }, emoji: blessing3 })
			.set(1 << 3, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 18 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 7, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { item: "Music sheet", cost: { seasonalCandles: 32 }, emoji: musicSheet })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, {
				item: "Seasonal heart",
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColoredDeerHeart,
			}),
	},
});
