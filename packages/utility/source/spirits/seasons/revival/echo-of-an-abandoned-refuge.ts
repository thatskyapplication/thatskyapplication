import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.EchoOfAnAbandonedRefuge,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing1,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.EchoOfAnAbandonedRefugeShoes },
			{
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeMusicSheet,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing2 },
			{
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing3,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.EchoOfAnAbandonedRefugeCape },
			{
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeHairAccessory,
				cost: { seasonalCandles: 42 },
			},
			{ cosmetic: Cosmetic.EchoOfAnAbandonedRefugeBlessing4 },
			{
				cosmetic: Cosmetic.EchoOfAnAbandonedRefugeSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
