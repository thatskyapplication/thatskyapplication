import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { ElderSpirit } from "../../../models/spirits.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{
				name: "Hair 1",
				cosmetic: Cosmetic.ElderOfTheValleyHair1,
				cost: { ascendedCandles: 5 },
			},
			{
				name: "Hair 2",
				cosmetic: Cosmetic.ElderOfTheValleyHair2,
				cost: { ascendedCandles: 6 },
			},
		],
	},
});
