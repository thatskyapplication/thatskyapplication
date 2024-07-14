import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit62;
const capeEmoji = CAPE_EMOJIS.Cape134;
const { SmallPlaceableProp77, SmallPlaceableProp78 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.TheCellistsFlourishing,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: "Prop 1", bit: 1 << 0, cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp77 },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 18 }, emoji: blessing3 },
			{ name: "Prop 2", bit: 1 << 3, emoji: SmallPlaceableProp78 },
			{ name: "Cape", bit: 1 << 4, cost: { seasonalCandles: 22 }, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 6, cost: { seasonalCandles: 24 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 7, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 8,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
