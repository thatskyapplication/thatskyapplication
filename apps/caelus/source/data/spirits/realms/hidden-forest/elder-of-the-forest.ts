import { RealmName } from "@thatskyapplication/utility";
import { ElderSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
