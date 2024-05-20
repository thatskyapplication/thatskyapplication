import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfGiving2019,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 3, 12),
	url: null,
});
