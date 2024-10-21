import { Event } from "../../../Structures/Event.js";
import { EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";

export default new Event({
	id: EventId.ChildrensDay2021,
	start: skyDate(2_021, 5, 3),
	end: skyDate(2_021, 5, 10),
});
