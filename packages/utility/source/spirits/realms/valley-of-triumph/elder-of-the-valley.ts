import { Cosmetic } from "../../../cosmetics.js";
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
					cosmetic: Cosmetic.ElderOfTheValleyHair1,
					cost: { ascendedCandles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ElderOfTheValleyHair2,
					cost: { ascendedCandles: 6 },
				},
			],
		],
	},
});
