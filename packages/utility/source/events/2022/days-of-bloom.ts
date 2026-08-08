import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2022,
	name: "days-of-bloom",
	family: EventFamily.DaysOfBloom,
	start: skyDate(2_022, 3, 28),
	end: skyDate(2_022, 4, 11),
	offer: [
		{
			cosmetic: Cosmetic.PurpleBloomCape,
			cost: { candles: 105 },
		},
		{
			cosmetic: Cosmetic.PurpleBloomTeaset,
			cost: { money: 19.99 },
		},
	],
});
