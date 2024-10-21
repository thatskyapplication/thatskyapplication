import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2019,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 4, 12),
});
