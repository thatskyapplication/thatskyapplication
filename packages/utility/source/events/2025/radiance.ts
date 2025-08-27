import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.RadianceEvent2025,
	start: skyDate(2_025, 10, 13),
	end: skyDate(2_025, 10, 27),
	patchNotesURL: patchNotesRoute("0305"),
});
