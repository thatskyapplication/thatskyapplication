import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2026,
	start: skyDate(2026, 2, 6),
	// Double-check this (unannounced).
	end: skyDate(2026, 2, 24),
});
