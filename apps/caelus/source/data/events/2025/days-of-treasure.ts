import { EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfTreasure2025,
	start: skyDate(2_025, 3, 3),
	end: skyDate(2_025, 3, 17),
});
