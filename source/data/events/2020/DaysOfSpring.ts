import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";

export default new Event({
	id: EventId.DaysOfSpring2020,
	start: skyDate(2_020, 3, 30),
	end: skyDate(2_020, 4, 14),
});
