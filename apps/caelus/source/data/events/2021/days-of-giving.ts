import { URL } from "node:url";
import { EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfGiving2021,
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
	patchNotesURL: String(new URL("0155", LINK_REDIRECTOR_URL)),
});
