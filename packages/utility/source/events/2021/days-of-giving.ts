import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfGiving2021,
	name: "days-of-giving",
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
	patchNotesURL: patchNotesRoute("0155"),
});
