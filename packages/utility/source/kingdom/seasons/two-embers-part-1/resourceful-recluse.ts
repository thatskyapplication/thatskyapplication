import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ResourcefulRecluse,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ResourcefulRecluseMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.ResourcefulRecluseBlessing,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 1 },
					cosmetic: Cosmetic.ResourcefulRecluseDye1,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ResourcefulRecluseOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 1 },
					cosmetic: Cosmetic.ResourcefulRecluseProp1,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.BlackDye,
					cosmetic: Cosmetic.ResourcefulRecluseBlackDye,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 2 },
					cosmetic: Cosmetic.ResourcefulRecluseDye2,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.PropMultiple, number: 2 },
					cosmetic: Cosmetic.ResourcefulRecluseProp2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ResourcefulRecluseSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
