import { URL } from "node:url";
import { EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfGiving2024,
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
