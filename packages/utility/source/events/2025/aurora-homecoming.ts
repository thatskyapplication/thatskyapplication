import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAHomecoming2025,
	start: skyDate(2_025, 6, 9),
	end: skyDate(2_025, 6, 23),
	patchNotesURL: String(new URL("p0295", LINK_REDIRECTOR_URL)),
});
