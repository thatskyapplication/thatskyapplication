import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.CompassionateCellist,
	seasonId: SeasonId.Duets,
	area: AreaName.AviaryVillage,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.CompassionateCellistBlessing,
				},
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.CompassionateCellistFaceAccessory,
					cost: { candles: 85 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.CompassionateCellistHeart,
				},
			],
			[
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.CompassionateCellistProp,
					cost: { candles: 200 },
				},
			],
		],
	},
});
