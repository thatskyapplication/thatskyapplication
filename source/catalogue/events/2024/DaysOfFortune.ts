import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.DaysOfFortune,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 14),
	url: String(new URL("daily_guides/events/days_of_fortune/2024.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
});
