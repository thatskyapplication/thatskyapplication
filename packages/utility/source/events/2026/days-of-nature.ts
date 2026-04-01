import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfNature2026,
	name: "days-of-nature",
	start: skyDate(2026, 4, 10),
	end: skyDate(2026, 4, 24),
});
