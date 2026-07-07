import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.DiviningWiseGrandparent,
	seasonId: SeasonId.BlueBird,
	area: AreaName.BlueBirdTheatre,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 1 },
					cosmetic: Cosmetic.DiviningWiseGrandparentDye1,
					cost: { seasonalCandles: 7 },
				},
				{
					translation: CosmeticCommon.BlackDye,
					cosmetic: Cosmetic.DiviningWiseGrandparentBlackDye,
					seasonPass: true,
				},
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
					translation: CosmeticCommon.BlueDye,
					cosmetic: Cosmetic.DiviningWiseGrandparentBlueDye,
					cost: { seasonalCandles: 17 },
				},
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 2 },
					cosmetic: Cosmetic.DiviningWiseGrandparentDye2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.CyanDye,
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
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.DiviningWiseGrandparentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
