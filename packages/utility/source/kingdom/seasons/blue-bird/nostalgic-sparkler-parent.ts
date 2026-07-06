import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.NostalgicSparklerParent,
	seasonId: SeasonId.BlueBird,
	area: AreaName.BlueBirdTheatre,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 1 },
					cosmetic: Cosmetic.NostalgicSparklerParentDye1,
					cost: { seasonalCandles: 9 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.NostalgicSparklerParentHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.PurpleDye,
					cosmetic: Cosmetic.NostalgicSparklerParentPurpleDye,
					cost: { seasonalCandles: 13 },
				},
				{
					translation: CosmeticCommon.CyanDye,
					cosmetic: Cosmetic.NostalgicSparklerParentCyanDye,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.NostalgicSparklerParentCape,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 2 },
					cosmetic: Cosmetic.NostalgicSparklerParentDye2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 3 },
					cosmetic: Cosmetic.NostalgicSparklerParentDye3,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: { key: CosmeticCommon.DyeMultiple, number: 4 },
					cosmetic: Cosmetic.NostalgicSparklerParentDye4,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.NostalgicSparklerParentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
