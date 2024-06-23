import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, SHOE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2023,
	start: skyDate(2_023, 9, 11),
	end: skyDate(2_023, 9, 24),
	eventCurrencyPerDay: 6,
	offer: [
		{ name: "Sunlight Pink Beach Towel Cape", bit: 1 << 0, cost: { eventCurrency: 16 }, emoji: CAPE_EMOJIS.Cape108 },
		{ name: "Sunlight Yellow Beach Towel Cape", bit: 1 << 1, cost: { eventCurrency: 18 }, emoji: CAPE_EMOJIS.Cape109 },
		{ name: "Sunlight Blue Beach Towel Cape", bit: 1 << 2, cost: { eventCurrency: 23 }, emoji: CAPE_EMOJIS.Cape110 },
		{ name: "Sunlight Chunky Sandals", bit: 1 << 3, cost: { money: 9.99 }, emoji: SHOE_EMOJIS.Shoe06 },
		{
			name: "Sunlight Surfboard",
			bit: 1 << 4,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp32,
		},
	],
});
