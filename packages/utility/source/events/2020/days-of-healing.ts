import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfHealing2020,
	name: "days-of-healing",
	family: EventFamily.DaysOfHealing,
	start: skyDate(2_020, 5, 18, 12),
	end: skyDate(2_020, 6, 22, 12),
	offer: [
		{
			cosmetic: Cosmetic.HealingHairAccessory,
			cost: { money: 19.99 },
		},
	],
});
