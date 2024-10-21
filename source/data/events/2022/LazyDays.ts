import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.LazyDays2022,
	start: skyDate(2_022, 9, 26),
	end: skyDate(2_022, 10, 17),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/938",
});
