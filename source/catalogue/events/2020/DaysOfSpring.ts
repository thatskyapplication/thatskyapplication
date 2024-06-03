import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSpring2020,
	start: skyDate(2_020, 3, 30),
	end: skyDate(2_020, 4, 13),
});
