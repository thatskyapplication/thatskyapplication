import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2023,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 7, 30),
	offer: [
		{ name: "Hair accessory", bit: 1 << 0, cost: { eventCurrency: 8 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory28 },
		{
			name: "Anniversary Sonorous Seashell",
			bit: 1 << 1,
			cost: { eventCurrency: 46 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp29,
		},
		{
			name: "Anniversary Party Lights",
			bit: 1 << 2,
			cost: { eventCurrency: 46 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp33,
		},
		{
			name: "Anniversary Plush",
			bit: 1 << 3,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp30,
		},
	],
});
