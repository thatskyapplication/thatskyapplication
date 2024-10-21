import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

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
				cosmetic: Cosmetic.ElderOfTheIsleFaceAccessory,
				cost: { ascendedCandles: 125 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory18,
			},
		],
	},
});
