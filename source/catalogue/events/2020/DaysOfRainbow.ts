import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	id: EventId.DaysOfRainbow2020,
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 15),
});
