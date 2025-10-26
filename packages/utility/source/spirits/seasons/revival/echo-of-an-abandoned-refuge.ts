import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.EchoOfAnAbandonedRefuge,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
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
					translation: CosmeticCommon.MusicSheet,
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
	},
});
