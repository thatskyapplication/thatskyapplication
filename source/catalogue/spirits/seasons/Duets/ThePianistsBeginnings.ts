import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;

export default new SeasonalSpirit({
	name: SpiritName.ThePianistsBeginnings,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Piano keys wall poster", bit: 1 << 1 },
			{ name: "Hair", bit: 1 << 2, cost: { seasonalCandles: 20 } },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 24 } },
			{ name: "Outfit", bit: 1 << 5, emoji: blessing3 },
			{ name: "Small blue rug", bit: 1 << 6, cost: { seasonalCandles: 30 } },
			{ name: "Blessing 4", bit: 1 << 7, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 8,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
