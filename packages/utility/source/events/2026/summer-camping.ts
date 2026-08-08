import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SummerCamping2026,
	name: "summer-camping",
	family: EventFamilyId.SummerCamping,
	start: skyDate(2026, 8, 28),
	end: skyDate(2026, 9, 11),
});
