import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2021,
	start: skyDate(2_021, 3, 22),
	end: skyDate(2_021, 4, 4),
	offer: [
		{ name: "Hair", bit: 1 << 0, cost: { hearts: 20 }, emoji: HAIR_EMOJIS.Hair76 },
		{ name: "Cape", bit: 1 << 1, cost: { candles: 70 }, emoji: CAPE_EMOJIS.Cape51 },
		{
			name: "Pink Bloom Teaset",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp04,
		},
	],
});
