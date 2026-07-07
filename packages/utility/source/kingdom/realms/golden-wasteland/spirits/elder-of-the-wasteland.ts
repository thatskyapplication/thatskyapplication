import { Cosmetic, CosmeticCommon } from "../../../../cosmetics.js";
import { ElderSpirit } from "../../../../models/spirits.js";
import { SpiritId } from "../../../../utility/spirits.js";
import { AreaName, RealmName } from "../../../geography.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	area: AreaName.ThePassage,
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
