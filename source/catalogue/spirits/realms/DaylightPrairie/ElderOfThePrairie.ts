import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: "Hair", bit: 1 << 0, cost: { ascendedCandles: 3 }, emoji: HAIR_EMOJIS.Hair31 },
			{
				name: "Face accessory",
				bit: 1 << 1,
				cost: { ascendedCandles: 75 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory19,
			},
		],
	},
});
