import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NestingAtrium,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.NestingAtriumProp1,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NestingAtriumBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NestingAtriumBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Prop 2", cosmetic: Cosmetic.NestingAtriumProp2 },
			{
				name: "Hair",
				cosmetic: Cosmetic.NestingAtriumHair,
				cost: { seasonalCandles: 24 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NestingAtriumBlessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NestingAtriumBlessing4,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Prop 3", cosmetic: Cosmetic.NestingAtriumProp3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingAtriumSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
