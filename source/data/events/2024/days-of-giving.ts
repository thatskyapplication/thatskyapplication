import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2024,
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1362",
});
