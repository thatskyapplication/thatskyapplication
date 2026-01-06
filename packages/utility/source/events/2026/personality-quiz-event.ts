import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.PersonalityQuizEvent2026,
	start: skyDate(2026, 1, 9),
	// This is a guess.
	end: skyDate(2026, 1, 23),
});
