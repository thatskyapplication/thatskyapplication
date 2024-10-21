import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2020,
	start: skyDate(2_020, 11, 23, 12),
	end: skyDate(2_020, 11, 30, 12),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/732",
});
