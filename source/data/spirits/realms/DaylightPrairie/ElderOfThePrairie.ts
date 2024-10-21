import { ElderSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { FACE_ACCESSORY_EMOJIS, HAIR_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

export default new ElderSpirit({
	name: SpiritName.ElderOfThePrairie,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{
				name: "Hair",
				cosmetic: Cosmetic.ElderOfThePrairieHair,
				cost: { ascendedCandles: 3 },
				emoji: HAIR_EMOJIS.Hair31,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.ElderOfThePrairieFaceAccessory,
				cost: { ascendedCandles: 75 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory19,
			},
		],
	},
});
