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
				cosmetic: Cosmetic.NestingLoftBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.NestingLoftProp1 },
			{
				cosmetic: Cosmetic.NestingLoftProp2,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.NestingLoftBlessing2 },
			{
				cosmetic: Cosmetic.NestingLoftBlessing3,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.NestingLoftCape },
			{
				cosmetic: Cosmetic.NestingLoftProp3,
				cost: { seasonalCandles: 36 },
			},
			{ cosmetic: Cosmetic.NestingLoftBlessing4 },
			{
				cosmetic: Cosmetic.NestingLoftSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
