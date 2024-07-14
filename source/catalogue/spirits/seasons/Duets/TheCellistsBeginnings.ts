import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;

export default new SeasonalSpirit({
	name: SpiritName.TheCellistsBeginnings,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: "Hair", bit: 1 << 0, cost: { seasonalCandles: 20 } },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: "Conch wall poster", bit: 1 << 3 },
			{ name: "Outfit", bit: 1 << 4, cost: { seasonalCandles: 32 } },
			{ name: "Blessing 4", bit: 1 << 5, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
