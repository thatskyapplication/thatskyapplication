import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId, SpiritStance } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ScarredSentry,
	seasonId: SeasonId.TwoEmbersPart1,
	stance: SpiritStance.Scarred,
	offer: {
		hasInfographicSeasonal: false,
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.StanceScarred,
			},
			{
				cosmetic: Cosmetic.ScarredSentryHair1,
				cost: { seasonalCandles: 10 },
			},
			{
				cosmetic: Cosmetic.ScarredSentryHair2,
			},
			{
				cosmetic: Cosmetic.ScarredSentryPurpleDye,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.ScarredSentryCape,
			},
			{
				cosmetic: Cosmetic.ScarredSentryOutfit,
				cost: { seasonalCandles: 22 },
			},
			{
				cosmetic: Cosmetic.ScarredSentryShoes,
			},
			{
				cosmetic: Cosmetic.ScarredSentryProp1,
				cost: { seasonalCandles: 28 },
			},
			{
				cosmetic: Cosmetic.ScarredSentryDye,
			},
			{
				cosmetic: Cosmetic.ScarredSentryWhiteDye,
				cost: { seasonalCandles: 34 },
			},
			{
				cosmetic: Cosmetic.ScarredSentryProp2,
			},
			{
				cosmetic: Cosmetic.ScarredSentrySeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
