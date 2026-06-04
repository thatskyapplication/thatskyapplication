import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2026,
	name: "sky-anniversary",
	start: skyDate(2026, 7, 3),
	// Not yet announced.
	end: skyDate(2026, 7, 25),
});
