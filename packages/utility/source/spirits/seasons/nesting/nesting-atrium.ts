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
				cosmetic: Cosmetic.NestingAtriumProp1,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.NestingAtriumBlessing1 },
			{
				cosmetic: Cosmetic.NestingAtriumBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.NestingAtriumProp2 },
			{
				cosmetic: Cosmetic.NestingAtriumHair,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.NestingAtriumBlessing3 },
			{
				cosmetic: Cosmetic.NestingAtriumBlessing4,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.NestingAtriumProp3 },
			{
				cosmetic: Cosmetic.NestingAtriumSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
