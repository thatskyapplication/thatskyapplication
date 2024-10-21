import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2022,
	start: skyDate(2_022, 11, 22),
	end: skyDate(2_022, 11, 29),
});
