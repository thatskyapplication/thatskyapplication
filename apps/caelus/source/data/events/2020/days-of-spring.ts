import { skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";

export default new Event({
	id: EventId.DaysOfSpring2020,
	start: skyDate(2_020, 3, 30),
	end: skyDate(2_020, 4, 14),
});
