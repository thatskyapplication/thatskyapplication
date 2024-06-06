import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic } from "../../../../Utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheIsle,
	realm: RealmName.IslesOfDawn,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheIsleHair,
				cost: { ascendedCandles: 4 },
				emoji: HAIR_EMOJIS.Hair30,
			},
			{
				name: "Face accessory",
				bit: 1 << 1,
				cost: { ascendedCandles: 125 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory18,
			},
		],
	},
});
