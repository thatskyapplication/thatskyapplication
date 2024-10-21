import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2021,
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/857",
});
