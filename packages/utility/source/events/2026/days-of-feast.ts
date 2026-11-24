import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2026,
	name: "days-of-feast",
	family: EventFamilyId.DaysOfFeast,
	start: skyDate(2026, 12, 18),
	end: skyDate(2027, 1, 8),
});
