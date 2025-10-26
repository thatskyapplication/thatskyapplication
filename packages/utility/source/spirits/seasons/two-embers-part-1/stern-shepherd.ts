import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SternShepherd,
	seasonId: SeasonId.TwoEmbersPart1,
	call: Cosmetic.CallManatee,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.CallManatee,
				},
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SternShepherdMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SternShepherdHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.SternShepherdOutfit,
					cost: { seasonalCandles: 18 },
				},
				{
					cosmetic: Cosmetic.SternShepherdYellowDye,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SternShepherdDye1,
					cost: { seasonalCandles: 24 },
				},
				{
					cosmetic: Cosmetic.SternShepherdProp,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SternShepherdMask,
					cost: { seasonalCandles: 30 },
				},
				{
					cosmetic: Cosmetic.SternShepherdDye2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.SternShepherdSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
