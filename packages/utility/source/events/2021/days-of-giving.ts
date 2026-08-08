import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2021,
	name: "days-of-giving",
	family: EventFamilyId.DaysOfGiving,
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
});
