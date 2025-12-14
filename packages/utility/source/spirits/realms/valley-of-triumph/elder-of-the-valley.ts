import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ElderOfTheValleyBlessing1,
					cost: { ascendedCandles: 2 },
				},
				{
					cosmetic: Cosmetic.ElderOfTheValleyHair1,
					cost: { ascendedCandles: 5 },
				},
				{
					cosmetic: Cosmetic.ElderOfTheValleyHair2,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ElderOfTheValleyBlessing2,
					cost: { ascendedCandles: 2 },
				},
			],
		],
	},
});
