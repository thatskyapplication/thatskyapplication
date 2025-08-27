import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfRainbow2020,
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 15),
	patchNotesURL: patchNotesRoute("095"),
});
