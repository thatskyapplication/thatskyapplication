import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SpringCamping2024,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
	patchNotesURL: patchNotesRoute("0245"),
});
