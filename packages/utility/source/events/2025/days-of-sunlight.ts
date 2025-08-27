import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSunlight2025,
	start: skyDate(2_025, 9, 1),
	end: skyDate(2_025, 9, 22),
});
