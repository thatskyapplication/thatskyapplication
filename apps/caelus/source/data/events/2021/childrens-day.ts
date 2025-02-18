import { skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";

export default new Event({
	id: EventId.ChildrensDay2021,
	start: skyDate(2_021, 5, 3),
	end: skyDate(2_021, 5, 10),
});
