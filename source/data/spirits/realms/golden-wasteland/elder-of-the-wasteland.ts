import { ElderSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import { HAIR_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
