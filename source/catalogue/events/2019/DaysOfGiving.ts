import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2019,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 3, 12),
});
