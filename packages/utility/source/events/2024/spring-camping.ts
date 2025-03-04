import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SpringCamping2024,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
	patchNotesURL: String(new URL("p0245", LINK_REDIRECTOR_URL)),
});
