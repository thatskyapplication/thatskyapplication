import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfLove2026,
	name: "days-of-love",
	family: EventFamilyId.DaysOfLove,
	start: skyDate(2026, 2, 6),
	end: skyDate(2026, 2, 20),
});
