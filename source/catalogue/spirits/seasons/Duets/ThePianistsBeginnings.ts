import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit61;
const hairEmoji = HAIR_EMOJIS.Hair147;
const { SmallPlaceableProp74, SmallPlaceableProp75 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.ThePianistsBeginnings,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Prop 1", bit: 1 << 1, emoji: SmallPlaceableProp74 },
			{ name: "Hair", bit: 1 << 2, cost: { seasonalCandles: 20 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 24 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 5, emoji: outfitEmoji },
			{ name: "Prop 2", bit: 1 << 6, cost: { seasonalCandles: 30 }, emoji: SmallPlaceableProp75 },
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
