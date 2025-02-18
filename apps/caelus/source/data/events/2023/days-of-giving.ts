import { URL } from "node:url";
import { skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfGiving2023,
	start: skyDate(2_023, 11, 20),
	end: skyDate(2_023, 11, 27),
	patchNotesURL: String(new URL("p0230", LINK_REDIRECTOR_URL)),
});
