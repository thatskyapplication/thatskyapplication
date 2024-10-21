import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2023,
	start: skyDate(2_023, 11, 20),
	end: skyDate(2_023, 11, 27),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1239",
});
