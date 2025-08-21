import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAHomecoming2025,
	start: skyDate(2_025, 6, 9),
	end: skyDate(2_025, 6, 23),
	patchNotesURL: patchNotesRoute("p0295"),
});
