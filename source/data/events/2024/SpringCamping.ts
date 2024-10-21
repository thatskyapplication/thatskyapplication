import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.SpringCamping2024,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1278",
});
