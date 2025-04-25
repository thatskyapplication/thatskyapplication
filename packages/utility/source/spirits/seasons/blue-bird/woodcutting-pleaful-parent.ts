import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.WoodcuttingPleafulParent,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WoodcuttingPleafulParentMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing2,
				cost: { seasonalCandles: 15 },
			},
			{ name: "Shoes", cosmetic: Cosmetic.WoodcuttingPleafulParentShoes },
			{
				name: "Green dye 1",
				cosmetic: Cosmetic.WoodcuttingPleafulParentGreenDye1,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Green dye 2", cosmetic: Cosmetic.WoodcuttingPleafulParentGreenDye2 },
			{
				name: "Outfit",
				cosmetic: Cosmetic.WoodcuttingPleafulParentOutfit,
				cost: { seasonalCandles: 23 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.WoodcuttingPleafulParentBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WoodcuttingPleafulParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
