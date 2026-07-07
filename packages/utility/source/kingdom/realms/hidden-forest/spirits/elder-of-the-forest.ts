import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { ElderSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { AreaName, RealmName } from "../../../geography.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	area: AreaName.ThePassage,
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
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ElderOfTheForestFaceAccessory,
					cost: { ascendedCandles: 250 },
				},
			],
		],
	},
});
