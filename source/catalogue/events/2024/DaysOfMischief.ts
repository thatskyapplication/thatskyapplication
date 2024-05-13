import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { EVENT_EMOJIS } from "../../../Utility/emojis.js";
import { EventName } from "../../../Utility/events.js";

export default new Event({
	name: EventName.DaysOfMischief,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 12),
	url: String(new URL("daily_guides/events/days_of_mischief/2023.webp", CDN_URL)),
	eventCurrencyPerDay: 6,
	eventCurrencyEmoji: EVENT_EMOJIS.Mischief,
});
