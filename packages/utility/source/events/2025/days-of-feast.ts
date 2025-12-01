import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfFeast2025,
	start: skyDate(2025, 12, 12),
	end: skyDate(2026, 1, 2),
});
