import { Cosmetic, RealmName, SpiritId } from "@thatskyapplication/utility";
import { ElderSpirit } from "../../../../models/Spirits.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../utility/emojis.js";

export default new ElderSpirit({
	id: SpiritId.ElderOfTheForest,
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
