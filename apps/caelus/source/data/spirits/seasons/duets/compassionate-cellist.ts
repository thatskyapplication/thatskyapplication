import { SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

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
