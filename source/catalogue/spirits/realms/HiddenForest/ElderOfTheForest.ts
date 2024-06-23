import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: "Hair", bit: 1 << 0, cost: { ascendedCandles: 6 }, emoji: HAIR_EMOJIS.Hair32 },
			{
				name: "Face accessory",
				bit: 1 << 1,
				cost: { ascendedCandles: 250 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory20,
			},
		],
	},
});
