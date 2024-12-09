import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2021,
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
	patchNotesURL: String(new URL("0155", LINK_REDIRECTOR_URL)),
});
