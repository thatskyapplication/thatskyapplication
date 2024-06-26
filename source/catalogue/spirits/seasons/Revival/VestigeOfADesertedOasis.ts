import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const shoeEmoji = SHOE_EMOJIS.Shoe09;
const hairEmoji = HAIR_EMOJIS.Hair130;
const capeEmoji = CAPE_EMOJIS.Cape111;

export default new SeasonalSpirit({
	name: SpiritName.VestigeOfADesertedOasis,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Hair", bit: 1 << 0, cost: { seasonalCandles: 16 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 3, emoji: capeEmoji },
			{ name: "Shoes", bit: 1 << 4, cost: { seasonalCandles: 38 }, emoji: shoeEmoji },
			{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
