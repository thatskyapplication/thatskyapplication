import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{
					cosmetic: Cosmetic.ElderOfThePrairieHair,
					cost: { ascendedCandles: 3 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ElderOfThePrairieFaceAccessory,
					cost: { ascendedCandles: 75 },
				},
			],
		],
	},
});
