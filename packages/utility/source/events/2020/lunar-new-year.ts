import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.LunarNewYear2020,
	name: "lunar-new-year",
	family: EventFamily.DaysOfFortune,
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 1, 28),
});
