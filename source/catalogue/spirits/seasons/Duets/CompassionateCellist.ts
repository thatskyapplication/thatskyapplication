import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

export default new SeasonalSpirit({
	name: SpiritName.CompassionateCellist,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Shared memory spell", bit: 1 << 0, emoji: MISCELLANEOUS_EMOJIS.SpellSharedMemory },
			{
				name: "Face accessory",
				bit: 1 << 1,
				cost: { candles: 85 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory36,
			},
			{ name: "Heart", bit: 1 << 2, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Prop",
				bit: 1 << 3,
				cost: { candles: 200 },
				emoji: HELD_PROPS_EMOJIS.HeldProp46,
			},
		],
	},
});
