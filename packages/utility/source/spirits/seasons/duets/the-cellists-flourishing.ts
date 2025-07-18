import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheCellistsFlourishing,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.TheCellistsFlourishingProp1,
				cost: { seasonalCandles: 16 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				cosmetic: Cosmetic.TheCellistsFlourishingProp2,
			},
			{
				cosmetic: Cosmetic.TheCellistsFlourishingCape,
				cost: { seasonalCandles: 22 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing3,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing4,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.TheCellistsFlourishingOutfit },
			{
				cosmetic: Cosmetic.TheCellistsFlourishingSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
