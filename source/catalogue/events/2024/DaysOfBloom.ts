import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.DaysOfBloom,
	start: skyDate(2_024, 3, 25),
	end: skyDate(2_024, 4, 14),
	url: [
		{
			date: skyDate(2_024, 3, 25),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/1.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 1),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/2.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 8),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/1.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 9),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/2.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 10),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/3.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 11),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/4.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 12),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/5.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 13),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/6.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 14),
			url: String(new URL("daily_guides/events/days_of_bloom/2024/week_3/7.webp", CDN_URL)),
		},
	],
	eventCurrencyPerDay: 5,
});
