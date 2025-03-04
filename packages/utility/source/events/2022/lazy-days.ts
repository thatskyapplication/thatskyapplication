import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.LazyDays2022,
	start: skyDate(2_022, 9, 26),
	end: skyDate(2_022, 10, 17),
	patchNotesURL: String(new URL("p0185", LINK_REDIRECTOR_URL)),
});
