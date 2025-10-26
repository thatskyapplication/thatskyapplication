import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NostalgicSparklerParent,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
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
					cosmetic: Cosmetic.NostalgicSparklerParentPurpleDye,
					cost: { seasonalCandles: 13 },
				},
				{ cosmetic: Cosmetic.NostalgicSparklerParentCyanDye, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.NostalgicSparklerParentCape,
					cost: { seasonalCandles: 20 },
				},
				{ cosmetic: Cosmetic.NostalgicSparklerParentDye2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.NostalgicSparklerParentDye3,
					cost: { seasonalCandles: 23 },
				},
				{ cosmetic: Cosmetic.NostalgicSparklerParentDye4, seasonPass: true },
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
