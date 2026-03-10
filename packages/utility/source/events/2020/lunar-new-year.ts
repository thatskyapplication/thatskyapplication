import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.LunarNewYear2020,
	name: "lunar-new-year",
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 1, 28),
	patchNotesURL: patchNotesRoute("080"),
});
