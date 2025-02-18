import { URL } from "node:url";
import { skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.SpringCamping2024,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
	patchNotesURL: String(new URL("p0245", LINK_REDIRECTOR_URL)),
});
