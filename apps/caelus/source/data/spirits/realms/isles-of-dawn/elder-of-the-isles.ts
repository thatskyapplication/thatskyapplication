import { RealmName } from "@thatskyapplication/utility";
import { SpiritName } from "@thatskyapplication/utility";
import { ElderSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../utility/emojis.js";

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
