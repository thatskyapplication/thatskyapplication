import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2020,
	start: skyDate(2_020, 11, 23, 12),
	end: skyDate(2_020, 11, 30, 12),
	patchNotesURL: String(new URL("p0114", LINK_REDIRECTOR_URL)),
});
