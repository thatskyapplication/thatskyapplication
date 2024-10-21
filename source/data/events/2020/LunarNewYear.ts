import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";

export default new Event({
	id: EventId.LunarNewYear2020,
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 1, 28),
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/601",
});
