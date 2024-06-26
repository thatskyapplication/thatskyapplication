import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfBloom2024,
	start: skyDate(2_024, 3, 25),
	end: skyDate(2_024, 4, 14),
	eventCurrencyInfographicURL: [
		{
			date: skyDate(2_024, 3, 25),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_1.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 1),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_2.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 8),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_1.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 9),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_2.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 10),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_3.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 11),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_4.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 12),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_5.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 13),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_6.webp", CDN_URL)),
		},
		{
			date: skyDate(2_024, 4, 14),
			url: String(new URL("events/2024/days_of_bloom/event_currency/week_3/day_7.webp", CDN_URL)),
		},
	],
	eventCurrencyPerDay: 5,
	offer: [
		{ name: "Hair 1", bit: 1 << 0, cost: { hearts: 25 }, emoji: HAIR_EMOJIS.Hair141 },
		{ name: "Hair 2", bit: 1 << 1, cost: { eventCurrency: 24 }, emoji: HAIR_EMOJIS.Hair140 },
		{ name: "Cape", bit: 1 << 2, cost: { eventCurrency: 48 }, emoji: CAPE_EMOJIS.Cape128 },
		{
			name: "Bloom Lilypad Umbrella",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp42,
		},
	],
});
