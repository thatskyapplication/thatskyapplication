import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAHomecoming2025,
	name: "aurora-homecoming",
	start: skyDate(2_025, 6, 9),
	end: skyDate(2_025, 6, 23),
});
