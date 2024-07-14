import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit63;
const shoeEmoji = SHOE_EMOJIS.Shoe15;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp79;

export default new SeasonalSpirit({
	name: SpiritName.ThePianistsFlourishing,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 12 }, emoji: blessing3 },
			{ name: "Prop", bit: 1 << 1, emoji: smallPlaceablePropEmoji },
			{ name: "Shoes", bit: 1 << 2, cost: { seasonalCandles: 22 }, emoji: shoeEmoji },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 5, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
