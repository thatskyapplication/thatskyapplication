import { EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfGiving2019,
	start: skyDate(2_019, 11, 26),
	end: skyDate(2_019, 12, 4, 12),
});
