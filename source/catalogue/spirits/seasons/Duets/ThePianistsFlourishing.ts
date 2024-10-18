import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
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
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThePianistsFlourishingBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing3,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ThePianistsFlourishingProp,
				emoji: smallPlaceablePropEmoji,
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.ThePianistsFlourishingShoes,
				cost: { seasonalCandles: 22 },
				emoji: shoeEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThePianistsFlourishingBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThePianistsFlourishingBlessing3,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.ThePianistsFlourishingOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThePianistsFlourishingSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
