import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.LunarNewYear2020,
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 1, 28),
	patchNotesURL: String(new URL("p080", LINK_REDIRECTOR_URL)),
});
