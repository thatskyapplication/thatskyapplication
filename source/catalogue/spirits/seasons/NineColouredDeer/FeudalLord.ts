import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.CradleCarry;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask87;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory36;
const capeEmoji = CAPE_EMOJIS.Cape123;

export default new SeasonalSpirit({
	name: SpiritName.FeudalLord,
	season: SeasonName.NineColouredDeer,
	action,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: `${action} 2`, bit: 1 << 1, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: blessing3 },
			{ name: "Hair accessory", bit: 1 << 3, emoji: hairAccessoryEmoji },
			{ name: "Mask", bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 6, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
			{ name: "Music sheet", bit: 1 << 8, cost: { seasonalCandles: 32 }, emoji: musicSheet },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
