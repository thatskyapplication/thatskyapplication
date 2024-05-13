import { Event } from "../../../Structures/Event.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.DaysOfNature,
	start: skyDate(2_024, 5, 27),
	end: skyDate(2_024, 6, 16),
	url: null,
	eventCurrencyPerDay: 4,
});
