import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ScarredSentry,
	seasonId: SeasonId.TwoEmbersPart1,
	stance: Cosmetic.StanceScarred,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.StanceScarred,
				},
			],
			[
				{
					cosmetic: Cosmetic.ScarredSentryHair1,
					cost: { seasonalCandles: 10 },
				},
				{
					cosmetic: Cosmetic.ScarredSentryHair2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ScarredSentryPurpleDye,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ScarredSentryCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ScarredSentryOutfit,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.ScarredSentryShoes,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ScarredSentryProp1,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.ScarredSentryDye,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ScarredSentryWhiteDye,
					cost: { seasonalCandles: 34 },
				},
				{
					cosmetic: Cosmetic.ScarredSentryProp2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ScarredSentrySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
