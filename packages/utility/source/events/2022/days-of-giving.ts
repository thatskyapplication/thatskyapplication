import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2022,
	start: skyDate(2_022, 11, 22),
	end: skyDate(2_022, 11, 29),
});
