import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2026,
	name: "days-of-mischief",
	family: EventFamilyId.DaysOfMischief,
	start: skyDate(2026, 10, 23),
	end: skyDate(2026, 11, 13),
});
