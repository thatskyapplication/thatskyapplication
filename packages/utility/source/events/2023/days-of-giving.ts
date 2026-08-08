import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2023,
	name: "days-of-giving",
	family: EventFamilyId.DaysOfGiving,
	start: skyDate(2_023, 11, 20),
	end: skyDate(2_023, 11, 27),
});
