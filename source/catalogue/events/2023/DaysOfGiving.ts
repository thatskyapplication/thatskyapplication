import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	id: EventId.DaysOfGiving2023,
	start: skyDate(2_023, 11, 20),
	end: skyDate(2_023, 11, 27),
});
