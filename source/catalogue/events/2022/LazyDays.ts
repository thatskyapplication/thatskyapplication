import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.LazyDays2022,
	start: skyDate(2_022, 9, 26),
	end: skyDate(2_022, 10, 16),
});
