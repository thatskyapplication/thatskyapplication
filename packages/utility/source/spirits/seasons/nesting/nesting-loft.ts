import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NestingLoft,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NestingLoftBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Prop 1", cosmetic: Cosmetic.NestingLoftProp1 },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.NestingLoftProp2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.NestingLoftBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.NestingLoftBlessing3,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Cape", cosmetic: Cosmetic.NestingLoftCape },
			{
				name: "Prop 3",
				cosmetic: Cosmetic.NestingLoftProp3,
				cost: { seasonalCandles: 36 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.NestingLoftBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingLoftSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
