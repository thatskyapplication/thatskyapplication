import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2023,
	start: skyDate(2_023, 11, 20),
	end: skyDate(2_023, 11, 27),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1239",
});
