import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SummerCamping2026,
	name: "summer-camping",
	family: EventFamily.SummerCamping,
	start: skyDate(2026, 8, 28),
	end: skyDate(2026, 9, 11),
});
