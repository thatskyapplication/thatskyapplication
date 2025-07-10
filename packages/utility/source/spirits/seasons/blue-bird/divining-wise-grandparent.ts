import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.DiviningWiseGrandparent,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.DiviningWiseGrandparentDye1,
				cost: { seasonalCandles: 7 },
			},
			{ cosmetic: Cosmetic.DiviningWiseGrandparentBlackDye },
			{
				cosmetic: Cosmetic.DiviningWiseGrandparentFaceAccessory,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.DiviningWiseGrandparentBlessing },
			{
				cosmetic: Cosmetic.DiviningWiseGrandparentBlueDye,
				cost: { seasonalCandles: 17 },
			},
			{ cosmetic: Cosmetic.DiviningWiseGrandparentDye2 },
			{
				cosmetic: Cosmetic.DiviningWiseGrandparentCyanDye,
				cost: { seasonalCandles: 21 },
			},
			{ cosmetic: Cosmetic.DiviningWiseGrandparentCape },
			{
				cosmetic: Cosmetic.DiviningWiseGrandparentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
