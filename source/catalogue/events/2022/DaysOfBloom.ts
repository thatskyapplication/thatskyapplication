import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2022,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 10),
	offer: [
		{ name: "Purple Bloom Cape", bit: 1 << 0, cost: { candles: 105 }, emoji: CAPE_EMOJIS.Cape76 },
		{
			name: "Purple Bloom Teaset",
			bit: 1 << 1,
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp23,
		},
	],
});
