import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ElderOfTheForestHair,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ElderOfTheForestFaceAccessory,
					cost: { ascendedCandles: 250 },
				},
			],
		],
	},
});
