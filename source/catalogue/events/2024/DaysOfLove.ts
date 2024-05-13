import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.DaysOfLove,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 25),
	url: String(new URL("daily_guides/events/days_of_love/2024.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
});
