import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NestingNook,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.NestingNookProp1,
				cost: { seasonalCandles: 16 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.NestingNookBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.NestingNookBlessing2,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.NestingNookProp2 },
			{
				cosmetic: Cosmetic.NestingNookProp3,
				cost: { seasonalCandles: 26 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.NestingNookBlessing3,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.NestingNookBlessing4,
				cost: { seasonalCandles: 30 },
			},
			{
				cosmetic: Cosmetic.NestingNookHairAccessory,
			},
			{
				cosmetic: Cosmetic.NestingNookSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
