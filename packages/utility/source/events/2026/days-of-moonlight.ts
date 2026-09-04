import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMoonlight2026,
	name: "days-of-moonlight",
	family: EventFamilyId.DaysOfMoonlight,
	start: skyDate(2026, 9, 19),
	end: skyDate(2026, 10, 10),
});
