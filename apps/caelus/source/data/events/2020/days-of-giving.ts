import { URL } from "node:url";
import { EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfGiving2020,
	start: skyDate(2_020, 11, 23, 12),
	end: skyDate(2_020, 11, 30, 12),
	patchNotesURL: String(new URL("p0114", LINK_REDIRECTOR_URL)),
});
