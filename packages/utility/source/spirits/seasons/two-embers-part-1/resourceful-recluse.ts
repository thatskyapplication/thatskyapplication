import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ResourcefulRecluse,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{
				cosmetic: Cosmetic.ResourcefulRecluseMask,
				cost: { seasonalCandles: 12 },
			},
			{
				translation: CosmeticCommon.Blessing,
				cosmetic: Cosmetic.ResourcefulRecluseBlessing,
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseDye1,
				cost: { seasonalCandles: 18 },
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseOutfit,
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseProp1,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseBlackDye,
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseDye2,
				cost: { seasonalCandles: 30 },
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseProp2,
			},
			{
				cosmetic: Cosmetic.ResourcefulRecluseSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
