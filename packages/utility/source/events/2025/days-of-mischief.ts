import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2025,
	start: skyDate(2_025, 10, 27),
	// Assuming 2 weeks after since this is not yet announced.
	end: skyDate(2025, 11, 11),
});
