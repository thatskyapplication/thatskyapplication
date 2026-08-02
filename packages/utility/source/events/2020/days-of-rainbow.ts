import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfRainbow2020,
	name: "days-of-rainbow",
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 15),
});
