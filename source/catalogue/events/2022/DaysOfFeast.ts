import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2022,
	start: skyDate(2_022, 12, 19),
	end: skyDate(2_023, 1, 8),
	offer: [
		{ name: "Prop", bit: 1 << 0, cost: { candles: 120 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp27 },
		{ name: "Feast Goggles", bit: 1 << 1, cost: { candles: 50 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory22 },
		{
			name: "Tournament Skyball Set",
			bit: 1 << 2,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp21,
		},
		{ name: "Cosy Hermit Cape", bit: 1 << 3, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape97 },
	],
});
