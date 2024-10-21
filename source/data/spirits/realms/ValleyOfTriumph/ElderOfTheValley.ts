import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{
				name: "Hair 1",
				cosmetic: Cosmetic.ElderOfTheValleyHair1,
				cost: { ascendedCandles: 5 },
				emoji: HAIR_EMOJIS.Hair33,
			},
			{
				name: "Hair 2",
				cosmetic: Cosmetic.ElderOfTheValleyHair2,
				cost: { ascendedCandles: 6 },
				emoji: HAIR_EMOJIS.Hair34,
			},
		],
	},
});
