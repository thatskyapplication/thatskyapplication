import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const shoeEmoji = SHOE_EMOJIS.Shoe11;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory31;
const capeEmoji = CAPE_EMOJIS.Cape113;

export default new SeasonalSpirit({
	name: SpiritName.RemnantOfAForgottenHaven,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 24 }, emoji: blessing3 },
			{ name: "Shoes", bit: 1 << 1, emoji: shoeEmoji },
			{ name: "Cape", bit: 1 << 2, cost: { seasonalCandles: 32 }, emoji: capeEmoji },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 40 }, emoji: blessing3 },
			{ name: "Hair accessory", bit: 1 << 5, emoji: hairAccessoryEmoji },
			{ name: "Seasonal heart", bit: 1 << 6, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RevivalHeart },
		],
	},
});
