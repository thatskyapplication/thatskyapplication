import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritCall, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SternShepherd,
	seasonId: SeasonId.TwoEmbersPart1,
	call: SpiritCall.Manatee,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.CallManatee,
			},
			{
				translation: CosmeticCommon.MusicSheet,
				cosmetic: Cosmetic.SternShepherdMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{
				cosmetic: Cosmetic.SternShepherdHair,
			},
			{
				cosmetic: Cosmetic.SternShepherdOutfit,
				cost: { seasonalCandles: 18 },
			},
			{
				cosmetic: Cosmetic.SternShepherdYellowDye,
			},
			{
				cosmetic: Cosmetic.SternShepherdDye1,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.SternShepherdProp,
			},
			{
				cosmetic: Cosmetic.SternShepherdMask,
				cost: { seasonalCandles: 30 },
			},
			{
				cosmetic: Cosmetic.SternShepherdDye2,
			},
			{
				cosmetic: Cosmetic.SternShepherdSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
