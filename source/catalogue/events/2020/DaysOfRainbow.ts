import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfRainbow2020,
	start: skyDate(2_020, 6, 10),
	end: skyDate(2_020, 6, 14),
});
