import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2025,
	name: "days-of-giving",
	start: skyDate(2_025, 11, 17),
	end: skyDate(2_025, 12, 1),
});
