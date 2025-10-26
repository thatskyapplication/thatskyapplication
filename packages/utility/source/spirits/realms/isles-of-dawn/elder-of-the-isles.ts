import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheIsle,
	realm: RealmName.IslesOfDawn,
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
					cosmetic: Cosmetic.ElderOfTheIsleFaceAccessory,
					cost: { ascendedCandles: 125 },
				},
			],
		],
	},
});
