import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.AURORAHomecoming2025,
	name: "aurora-homecoming",
	family: EventFamilyId.AURORAHomecoming,
	start: skyDate(2_025, 6, 9),
	end: skyDate(2_025, 6, 23),
});
