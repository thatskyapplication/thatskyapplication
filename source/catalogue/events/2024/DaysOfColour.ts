import { Event } from "../../../Structures/Event.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { EVENT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	name: EventName.DaysOfColour,
	start: skyDate(2_024, 6, 24),
	end: skyDate(2_024, 7, 7),
	url: null,
	eventCurrencyPerDay: 5,
	eventCurrencyEmoji: EVENT_EMOJIS.Colour,
});
