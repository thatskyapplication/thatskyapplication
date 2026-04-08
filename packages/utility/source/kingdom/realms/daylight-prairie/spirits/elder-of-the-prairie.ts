import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { ElderSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { RealmName } from "../../../geography.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ElderOfThePrairieHair,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.FaceAccessory,
					cosmetic: Cosmetic.ElderOfThePrairieFaceAccessory,
					cost: { ascendedCandles: 75 },
				},
			],
		],
	},
});
