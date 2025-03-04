import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSpring2020,
	start: skyDate(2_020, 3, 30),
	end: skyDate(2_020, 4, 14),
});
