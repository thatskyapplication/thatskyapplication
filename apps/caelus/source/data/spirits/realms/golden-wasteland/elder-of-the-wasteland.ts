import { Cosmetic, RealmName, SpiritName } from "@thatskyapplication/utility";
import { ElderSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS } from "../../../../utility/emojis.js";

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
