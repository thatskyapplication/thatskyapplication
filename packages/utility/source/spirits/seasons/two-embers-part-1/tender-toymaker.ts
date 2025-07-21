import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TenderToymaker,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographicSeasonal: false,
		hasInfographic: false,
		seasonal: [
			{
				translation: CosmeticCommon.Blessing,
				cosmetic: Cosmetic.TenderToymakerBlessing,
				cost: { seasonalCandles: 8 },
			},
			{
				cosmetic: Cosmetic.TenderToymakerProp1,
			},
			{
				cosmetic: Cosmetic.TenderToymakerProp2,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.TenderToymakerDye1,
			},
			{
				cosmetic: Cosmetic.TenderToymakerGreenDye,
				cost: { seasonalCandles: 22 },
			},
			{
				cosmetic: Cosmetic.TenderToymakerOutfit,
			},
			{
				cosmetic: Cosmetic.TenderToymakerHair,
				cost: { seasonalCandles: 28 },
			},
			{
				cosmetic: Cosmetic.TenderToymakerDye2,
			},
			{
				cosmetic: Cosmetic.TenderToymakerSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
