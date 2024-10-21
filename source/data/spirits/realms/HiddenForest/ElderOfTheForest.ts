import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic } from "../../../../Utility2/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfTheForest,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfTheForestHair,
				cost: { ascendedCandles: 6 },
				emoji: HAIR_EMOJIS.Hair32,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfTheForestFaceAccessory,
				cost: { ascendedCandles: 250 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory20,
			},
		],
	},
});
