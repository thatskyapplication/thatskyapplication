import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2022,
	start: skyDate(2_022, 11, 22),
	end: skyDate(2_022, 11, 29),
});
