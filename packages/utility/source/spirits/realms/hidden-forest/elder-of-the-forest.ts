import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../index.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheForestHair,
				cost: { ascendedCandles: 6 },
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfTheForestFaceAccessory,
				cost: { ascendedCandles: 250 },
			},
		],
	},
});
