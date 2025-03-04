import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheCellistsFlourishing,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.TheCellistsFlourishingProp1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheCellistsFlourishingBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.TheCellistsFlourishingProp2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TheCellistsFlourishingCape,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TheCellistsFlourishingBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing4,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.TheCellistsFlourishingOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheCellistsFlourishingSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
