import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheValley,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: "Hair 1", bit: 1 << 0, cost: { ascendedCandles: 5 }, emoji: HAIR_EMOJIS.Hair33 },
			{ name: "Hair 2", bit: 1 << 1, cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair34 },
		],
	},
});
