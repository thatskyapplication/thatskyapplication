import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2019,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 4, 12),
});
