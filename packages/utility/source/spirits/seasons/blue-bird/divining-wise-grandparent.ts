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
		hasInfographicSeasonal: false,
		seasonal: [
			{
				name: "Dye 1",
				cosmetic: Cosmetic.DiviningWiseGrandparentDye1,
				cost: { seasonalCandles: 7 },
			},
			{ name: "Black dye", cosmetic: Cosmetic.DiviningWiseGrandparentBlackDye },
			{
				name: "Face accessory",
				cosmetic: Cosmetic.DiviningWiseGrandparentFaceAccessory,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing", cosmetic: Cosmetic.DiviningWiseGrandparentBlessing },
			{
				name: "Blue dye",
				cosmetic: Cosmetic.DiviningWiseGrandparentBlueDye,
				cost: { seasonalCandles: 17 },
			},
			{ name: "Dye 2", cosmetic: Cosmetic.DiviningWiseGrandparentDye2 },
			{
				name: "Cyan dye",
				cosmetic: Cosmetic.DiviningWiseGrandparentCyanDye,
				cost: { seasonalCandles: 21 },
			},
			{ name: "Cape", cosmetic: Cosmetic.DiviningWiseGrandparentCape },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.DiviningWiseGrandparentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
