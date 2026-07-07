import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { ElderSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { AreaName, RealmName } from "../../../geography.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheIsle,
	realm: RealmName.IsleOfDawn,
	area: AreaName.ThePassage,
	offer: {
		current: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ElderOfTheIsleHair,
					cost: { ascendedCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ElderOfTheIsleFaceAccessory,
					cost: { ascendedCandles: 125 },
				},
			],
		],
	},
});
