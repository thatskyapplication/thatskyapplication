import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NestingSolarium,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.NestingSolariumBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{ cosmetic: Cosmetic.NestingSolariumProp1, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.NestingSolariumProp2,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.NestingSolariumBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.NestingSolariumBlessing3,
					cost: { seasonalCandles: 30 },
				},
				{ cosmetic: Cosmetic.NestingSolariumProp3, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.NestingSolariumProp4,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.NestingSolariumBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.NestingSolariumSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
