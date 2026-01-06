import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.TournamentOfTriumph2026,
	start: skyDate(2026, 1, 30),
	end: skyDate(2026, 2, 13),
});
