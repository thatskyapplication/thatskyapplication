import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummer2021,
	start: skyDate(2_021, 8, 12),
	end: skyDate(2_021, 8, 25),
	offer: [
		{
			name: "Prop",
			bit: 1 << 0,
			cost: { hearts: 16 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13,
		},
		{
			name: "Hair accessory",
			bit: 1 << 1,
			cost: { candles: 44 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory07,
		},
		{
			name: "Days of Summer Umbrella",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp23,
		},
		{
			name: "Days of Summer Shell Hair Pin",
			bit: 1 << 3,
			cost: { money: 0.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory08,
		},
	],
});
