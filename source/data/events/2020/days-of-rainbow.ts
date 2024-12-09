import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfRainbow2020,
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 15),
	patchNotesURL: String(new URL("p095", LINK_REDIRECTOR_URL)),
});
