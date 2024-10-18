import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new SeasonalSpirit({
	name: SpiritName.CompassionateCellist,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Shared memory spell",
				cosmetic: Cosmetic.CompassionateCellistSharedMemorySpell,
				emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory,
			},
			{
				name: "Face accessory",
				cosmetic: Cosmetic.CompassionateCellistFaceAccessory,
				cost: { candles: 85 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory36,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CompassionateCellistHeart,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.CompassionateCellistProp,
				cost: { candles: 200 },
				emoji: HELD_PROPS_EMOJIS.HeldProp46,
			},
		],
	},
});
