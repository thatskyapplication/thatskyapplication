import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2022,
	start: skyDate(2_022, 7, 18),
	end: skyDate(2_022, 8, 3),
	offer: [
		{ name: "Hair accessory", bit: 1 << 0, cost: { hearts: 3 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory24 },
		{ name: "Happy Birthday Music Sheet", bit: 1 << 1, cost: { hearts: 10 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet },
		{ name: "Prop 1", bit: 1 << 2, cost: { candles: 30 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp16 },
		{ name: "Prop 2", bit: 1 << 3, cost: { candles: 20 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp26 },
		{ name: "Prop 3", bit: 1 << 4, cost: { hearts: 20 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp17 },
	],
});
