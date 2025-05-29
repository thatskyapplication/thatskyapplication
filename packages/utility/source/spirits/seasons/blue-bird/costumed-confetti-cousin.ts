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
		hasInfographicSeasonal: false,
		seasonal: [
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.CostumedConfettiCousinHairAccessory,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.CostumedConfettiCousinBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CostumedConfettiCousinBlessing2,
				cost: { seasonalCandles: 15 },
			},
			{ name: "Mask", cosmetic: Cosmetic.CostumedConfettiCousinMask },
			{
				name: "Red dye",
				cosmetic: Cosmetic.CostumedConfettiCousinRedDye,
				cost: { seasonalCandles: 19 },
			},
			{ name: "Yellow dye", cosmetic: Cosmetic.CostumedConfettiCousinYellowDye },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.CostumedConfettiCousinBlessing3,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.CostumedConfettiCousinOutfit },
			{
				name: "Hair",
				cosmetic: Cosmetic.CostumedConfettiCousinHair,
				cost: { seasonalCandles: 25 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.CostumedConfettiCousinBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CostumedConfettiCousinSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
