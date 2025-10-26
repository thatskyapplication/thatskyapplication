import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ThePianistsFlourishing,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ThePianistsFlourishingBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					cosmetic: Cosmetic.ThePianistsFlourishingProp,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.ThePianistsFlourishingShoes,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ThePianistsFlourishingBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ThePianistsFlourishingBlessing3,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ThePianistsFlourishingOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ThePianistsFlourishingSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
