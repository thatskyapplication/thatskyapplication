import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2019,
	name: "days-of-giving",
	family: EventFamilyId.DaysOfGiving,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 4, 12),
});
