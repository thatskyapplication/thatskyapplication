import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2026,
	name: "days-of-love",
	family: EventFamily.DaysOfLove,
	start: skyDate(2026, 2, 6),
	end: skyDate(2026, 2, 20),
});
