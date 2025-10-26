import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TenderToymaker,
	seasonId: SeasonId.TwoEmbersPart1,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.TenderToymakerBlessing,
					cost: { seasonalCandles: 8 },
				},
				{
					cosmetic: Cosmetic.TenderToymakerProp1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TenderToymakerProp2,
					cost: { seasonalCandles: 14 },
				},
				{
					cosmetic: Cosmetic.TenderToymakerDye1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TenderToymakerGreenDye,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TenderToymakerOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TenderToymakerHair,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.TenderToymakerDye2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TenderToymakerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
