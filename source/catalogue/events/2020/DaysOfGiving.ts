import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2020,
	start: skyDate(2_020, 11, 23, 12),
	end: skyDate(2_020, 11, 30, 12),
});
