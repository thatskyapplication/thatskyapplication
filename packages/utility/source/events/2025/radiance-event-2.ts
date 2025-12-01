import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.RadianceEvent22025,
	start: skyDate(2025, 12, 2),
	end: skyDate(2025, 12, 12),
});
