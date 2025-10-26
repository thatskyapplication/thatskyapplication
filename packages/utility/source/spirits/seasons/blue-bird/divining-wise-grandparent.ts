import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[
				{
					cosmetic: Cosmetic.DiviningWiseGrandparentDye1,
					cost: { seasonalCandles: 7 },
				},
				{ cosmetic: Cosmetic.DiviningWiseGrandparentBlackDye, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.DiviningWiseGrandparentFaceAccessory,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.DiviningWiseGrandparentBlessing,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.DiviningWiseGrandparentBlueDye,
					cost: { seasonalCandles: 17 },
				},
				{ cosmetic: Cosmetic.DiviningWiseGrandparentDye2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.DiviningWiseGrandparentCyanDye,
					cost: { seasonalCandles: 21 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.DiviningWiseGrandparentCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.DiviningWiseGrandparentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
