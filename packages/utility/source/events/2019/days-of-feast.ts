import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2019,
	name: "days-of-feast",
	family: EventFamilyId.DaysOfFeast,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 3),
	offer: [
		{
			cosmetic: Cosmetic.DaysOfFeastHat,
			cost: { money: 6.99 },
		},
	],
});
