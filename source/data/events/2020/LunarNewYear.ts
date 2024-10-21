import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.LunarNewYear2020,
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 1, 28),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/601",
});
