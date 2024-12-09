import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2024,
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
