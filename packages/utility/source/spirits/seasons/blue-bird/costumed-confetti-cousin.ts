import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CostumedConfettiCousin,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.CostumedConfettiCousinHairAccessory,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.CostumedConfettiCousinBlessing1 },
			{
				cosmetic: Cosmetic.CostumedConfettiCousinBlessing2,
				cost: { seasonalCandles: 15 },
			},
			{ cosmetic: Cosmetic.CostumedConfettiCousinMask },
			{
				cosmetic: Cosmetic.CostumedConfettiCousinRedDye,
				cost: { seasonalCandles: 19 },
			},
			{ cosmetic: Cosmetic.CostumedConfettiCousinYellowDye },
			{
				cosmetic: Cosmetic.CostumedConfettiCousinBlessing3,
				cost: { seasonalCandles: 23 },
			},
			{ cosmetic: Cosmetic.CostumedConfettiCousinOutfit },
			{
				cosmetic: Cosmetic.CostumedConfettiCousinHair,
				cost: { seasonalCandles: 25 },
			},
			{ cosmetic: Cosmetic.CostumedConfettiCousinBlessing4 },
			{
				cosmetic: Cosmetic.CostumedConfettiCousinSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
