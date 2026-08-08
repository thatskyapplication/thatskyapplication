import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSpring2020,
	name: "days-of-spring",
	family: EventFamilyId.DaysOfSpring,
	start: skyDate(2_020, 3, 30),
	end: skyDate(2_020, 4, 14),
});
