import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NestingSolarium,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NestingSolariumBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Prop 1", cosmetic: Cosmetic.NestingSolariumProp1 },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.NestingSolariumProp2,
				cost: { seasonalCandles: 22 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.NestingSolariumBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.NestingSolariumBlessing3,
				cost: { seasonalCandles: 30 },
			},
			{ name: "Prop 3", cosmetic: Cosmetic.NestingSolariumProp3 },
			{
				name: "Prop 4",
				cosmetic: Cosmetic.NestingSolariumProp4,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.NestingSolariumBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingSolariumSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
