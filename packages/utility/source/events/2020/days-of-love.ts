import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2020,
	name: "days-of-love",
	family: EventFamily.DaysOfLove,
	start: skyDate(2_020, 2, 12, 12),
	end: skyDate(2_020, 2, 19, 12),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfLoveSwing,
			cost: { money: 19.99 },
		},
	],
});
