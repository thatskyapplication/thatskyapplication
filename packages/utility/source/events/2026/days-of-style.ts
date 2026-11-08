import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfStyle2026,
	name: "days-of-style",
	family: EventFamilyId.DaysOfStyle,
	start: skyDate(2026, 11, 27),
	// End date not yet revealed.
	end: skyDate(2026, 12, 11),
});
