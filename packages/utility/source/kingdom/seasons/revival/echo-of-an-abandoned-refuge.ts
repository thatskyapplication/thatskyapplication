import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.EchoOfAnAbandonedRefuge,
	seasonId: SeasonId.Revival,
	area: AreaName.AviaryVillage,
	offer: {
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing1,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeShoes,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeMusicSheet,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing3,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeHairAccessory,
					cost: { seasonalCandles: 42 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeShoes,
					cost: { candles: 31 },
				},
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeCape,
					cost: { candles: 68 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeHairAccessory,
					cost: { candles: 43 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing2,
					cost: { candles: 5 },
				},
			],
		],
	},
	visits: {
		returning: [13],
	},
});
