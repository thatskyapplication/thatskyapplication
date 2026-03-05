import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfBloom2026,
	start: skyDate(2026, 3, 13),
	end: skyDate(2026, 4, 3),
});
