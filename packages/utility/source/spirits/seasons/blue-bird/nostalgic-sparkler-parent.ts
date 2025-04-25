import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.NostalgicSparklerParent,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{
				name: "Dye 1",
				cosmetic: Cosmetic.NostalgicSparklerParentDye1,
				cost: { seasonalCandles: 9 },
			},
			{ name: "Hair accessory", cosmetic: Cosmetic.NostalgicSparklerParentHairAccessory },
			{
				name: "Purple dye",
				cosmetic: Cosmetic.NostalgicSparklerParentPurpleDye,
				cost: { seasonalCandles: 13 },
			},
			{ name: "Cyan dye", cosmetic: Cosmetic.NostalgicSparklerParentCyanDye },
			{
				name: "Cape",
				cosmetic: Cosmetic.NostalgicSparklerParentCape,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Dye 2", cosmetic: Cosmetic.NostalgicSparklerParentDye2 },
			{
				name: "Dye 3",
				cosmetic: Cosmetic.NostalgicSparklerParentDye3,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Dye 4", cosmetic: Cosmetic.NostalgicSparklerParentDye4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NostalgicSparklerParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
