import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.ChildrensDay2021,
	name: "childrens-day",
	family: EventFamily.ChildrensDay,
	start: skyDate(2_021, 5, 3),
	end: skyDate(2_021, 5, 10),
});
