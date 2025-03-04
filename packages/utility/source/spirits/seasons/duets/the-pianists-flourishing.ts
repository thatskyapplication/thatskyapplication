import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ThePianistsFlourishing,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThePianistsFlourishingBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.ThePianistsFlourishingProp,
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.ThePianistsFlourishingShoes,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThePianistsFlourishingBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThePianistsFlourishingBlessing3,
				cost: { seasonalCandles: 26 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.ThePianistsFlourishingOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThePianistsFlourishingSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
