import { skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";

export default new Event({
	id: EventId.DaysOfGiving2022,
	start: skyDate(2_022, 11, 22),
	end: skyDate(2_022, 11, 29),
});
