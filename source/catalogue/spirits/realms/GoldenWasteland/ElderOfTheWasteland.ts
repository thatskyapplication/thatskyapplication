import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic } from "../../../../Utility/catalogue.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheWastelandHair,
				cost: { ascendedCandles: 6 },
				emoji: HAIR_EMOJIS.Hair35,
			},
		],
	},
});
