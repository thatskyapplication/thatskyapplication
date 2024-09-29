import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfGiving2021,
	start: skyDate(2_021, 11, 23),
	end: skyDate(2_021, 11, 30),
});
