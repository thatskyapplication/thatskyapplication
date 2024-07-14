import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;

export default new SeasonalSpirit({
	name: SpiritName.TheCellistsFlourishing,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			// { name: "", bit: 1 << 0 },
			// { name: "", bit: 1 << 1 },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 10 }, emoji: blessing3 },
			// { name: "", bit: 1 << 3 },
			// { name: "", bit: 1 << 4, cost: { seasonalCandles: 18 } },
			// { name: "", bit: 1 << 5 },
			// { name: "", bit: 1 << 6, cost: { seasonalCandles: 24 } },
			{ name: "Blessing 2", bit: 1 << 7, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 9 },
			{ name: "Cape", bit: 1 << 10, cost: { seasonalCandles: 32 } },
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
