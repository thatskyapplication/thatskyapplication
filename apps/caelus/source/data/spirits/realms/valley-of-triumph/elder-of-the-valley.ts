import { Cosmetic, RealmName, SpiritId } from "@thatskyapplication/utility";
import { ElderSpirit } from "../../../../models/Spirits.js";
import { HAIR_EMOJIS } from "../../../../utility/emojis.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheValley,
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
