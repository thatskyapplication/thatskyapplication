import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2020,
	name: "days-of-nature",
	family: EventFamily.DaysOfNature,
	start: skyDate(2_020, 4, 20, 12),
	end: skyDate(2_020, 4, 27, 12),
	offer: [
		{
			cosmetic: Cosmetic.EarthCape,
			cost: { money: 4.99 },
		},
	],
});
