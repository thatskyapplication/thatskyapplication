import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit51;
const hairEmoji = HAIR_EMOJIS.Hair131;
const capeEmoji = CAPE_EMOJIS.Cape114;

export default new SeasonalSpirit({
	name: SpiritName.MemoryOfALostVillage,
	season: SeasonName.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 20 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 1, emoji: capeEmoji },
			{ name: "Outfit", bit: 1 << 2, cost: { seasonalCandles: 32 }, emoji: outfitEmoji },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 38 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 5, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
