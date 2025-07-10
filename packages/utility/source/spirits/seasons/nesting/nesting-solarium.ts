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
				cosmetic: Cosmetic.NestingSolariumBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.NestingSolariumProp1 },
			{
				cosmetic: Cosmetic.NestingSolariumProp2,
				cost: { seasonalCandles: 22 },
			},
			{ cosmetic: Cosmetic.NestingSolariumBlessing2 },
			{
				cosmetic: Cosmetic.NestingSolariumBlessing3,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.NestingSolariumProp3 },
			{
				cosmetic: Cosmetic.NestingSolariumProp4,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.NestingSolariumBlessing4 },
			{
				cosmetic: Cosmetic.NestingSolariumSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
