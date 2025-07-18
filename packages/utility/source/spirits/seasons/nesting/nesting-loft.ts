import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.NestingLoftBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.NestingLoftProp1 },
			{
				cosmetic: Cosmetic.NestingLoftProp2,
				cost: { seasonalCandles: 20 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.NestingLoftBlessing2,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.NestingLoftBlessing3,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.NestingLoftCape },
			{
				cosmetic: Cosmetic.NestingLoftProp3,
				cost: { seasonalCandles: 36 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.NestingLoftBlessing4,
			},
			{
				cosmetic: Cosmetic.NestingLoftSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
