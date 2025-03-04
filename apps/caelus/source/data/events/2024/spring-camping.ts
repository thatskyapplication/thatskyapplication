import { URL } from "node:url";
import { EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.SpringCamping2024,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
	patchNotesURL: String(new URL("p0245", LINK_REDIRECTOR_URL)),
});
