import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	SHOE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2024,
	start: skyDate(2_024, 6, 24),
	end: skyDate(2_024, 7, 7),
	eventCurrencyPerDay: 5,
	offer: [
		{
			name: "Dark Rainbow Mask",
			bit: 1 << 0,
			cost: { eventCurrency: 32 },
			emoji: MASK_EMOJIS.Mask92,
		},
		{
			name: "Colour Glam Cut",
			bit: 1 << 1,
			cost: { eventCurrency: 18 },
			emoji: HAIR_EMOJIS.Hair145,
		},
		{
			name: "Dark Rainbow Loafers",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: SHOE_EMOJIS.Shoe14,
		},
		{
			name: "Colour Bubble Machine",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp63,
		},
	],
});
