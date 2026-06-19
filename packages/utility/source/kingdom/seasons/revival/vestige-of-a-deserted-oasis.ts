import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.VestigeOfADesertedOasis,
	seasonId: SeasonId.Revival,
	offer: {
		seasonal: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.VestigeOfADesertedOasisHair,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing2,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.VestigeOfADesertedOasisCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.VestigeOfADesertedOasisShoes,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.VestigeOfADesertedOasisSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.VestigeOfADesertedOasisBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.VestigeOfADesertedOasisHair,
					cost: { candles: 40 },
				},
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.VestigeOfADesertedOasisSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.VestigeOfADesertedOasisWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.VestigeOfADesertedOasisShoes,
					cost: { candles: 22 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.VestigeOfADesertedOasisCape,
					cost: { candles: 61 },
				},
			],
		],
	},
	visits: {
		returning: [13],
	},
});
