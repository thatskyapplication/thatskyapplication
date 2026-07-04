import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfSunlight2026,
	name: "days-of-sunlight",
	start: skyDate(2026, 7, 31),
	end: skyDate(2026, 8, 21),
});
