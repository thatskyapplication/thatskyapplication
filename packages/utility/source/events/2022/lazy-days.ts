import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.LazyDays2022,
	name: "lazy-days",
	family: EventFamilyId.LazyDays,
	start: skyDate(2_022, 9, 26),
	end: skyDate(2_022, 10, 17),
});
