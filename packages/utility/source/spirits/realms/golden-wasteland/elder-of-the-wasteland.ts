import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ElderOfTheWastelandHair,
					cost: { ascendedCandles: 6 },
				},
			],
		],
	},
});
