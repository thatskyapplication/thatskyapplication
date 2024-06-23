import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheWasteland,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [{ name: "Hair", bit: 1 << 0, cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair35 }],
	},
});
