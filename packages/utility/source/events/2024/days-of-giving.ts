import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2024,
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
	patchNotesURL: patchNotesRoute("p0275"),
});
