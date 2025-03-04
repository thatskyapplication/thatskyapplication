import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CompassionateCellist,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Shared memory spell",
				cosmetic: Cosmetic.CompassionateCellistSharedMemorySpell,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.CompassionateCellistFaceAccessory,
				cost: { candles: 85 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CompassionateCellistHeart,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.CompassionateCellistProp,
				cost: { candles: 200 },
			},
		],
	},
});
