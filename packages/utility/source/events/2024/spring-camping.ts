import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SpringCamping2024,
	name: "spring-camping",
	family: EventFamilyId.SpringCamping,
	start: skyDate(2_024, 3, 4),
	end: skyDate(2_024, 3, 11),
});
