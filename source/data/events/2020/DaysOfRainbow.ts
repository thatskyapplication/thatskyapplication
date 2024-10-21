import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfRainbow2020,
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 15),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/677",
});
