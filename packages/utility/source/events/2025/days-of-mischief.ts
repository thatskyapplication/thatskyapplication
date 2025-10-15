import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2025,
	start: skyDate(2_025, 10, 27),
	end: skyDate(2_025, 11, 17),
	patchNotesURL: patchNotesRoute("31"),
});
