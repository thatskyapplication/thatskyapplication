import { URL } from "node:url";
import type { DateTime } from "luxon";
import { CDN_URL } from "../Utility/Constants.js";
import { skyDate } from "../Utility/dates.js";
import { type EventEmojis, EVENT_EMOJIS } from "../Utility/emojis.js";

export const enum EventName {
	DaysOfMischief = "Days of Mischief",
	AviarysFireworkFestival = "Aviary's Firework Festival",
	DaysOfFeast = "Days of Feast",
	DaysOfFortune = "Days of Fortune",
	DaysOfLove = "Days of Love",
	DaysOfBloom = "Days of Bloom",
	SkyXCinnamorollPopUpCafe = "Sky x Cinnamoroll Pop-Up Cafe",
}

// const EVENT_ROTATION_LETTER = ["A", "C", "B"] as const;

interface EventData {
	name: EventName;
	start: DateTime;
	end: DateTime;
	eventCurrencyEnd?: DateTime;
	url: string | EventDataURL[] | null;
	eventCurrencyPerDay: number;
	eventCurrencyEmoji: EventEmojis;
}

interface EventDataURL {
	date: DateTime;
	url: string;
}

class Event {
	public readonly name: EventName;

	public readonly start: DateTime;

	public readonly end: DateTime;

	public readonly eventCurrencyEnd: DateTime;

	public readonly url: string | EventDataURL[] | null;

	public readonly eventCurrencyPerDay: number;

	public readonly eventCurrencyEmoji: EventEmojis;

	public constructor(data: EventData) {
		this.name = data.name;
		this.start = data.start;
		this.end = data.end;
		this.eventCurrencyEnd = data.eventCurrencyEnd ?? data.end;
		this.url = data.url;
		this.eventCurrencyPerDay = data.eventCurrencyPerDay;
		this.eventCurrencyEmoji = data.eventCurrencyEmoji;
	}

	public daysText(date: DateTime) {
		const { end, start, name } = this;
		const daysLeftInEvent = end.diff(date, "days").days;
		const daysUntilStart = start.diff(date, "days").days;

		return daysUntilStart <= 0 && daysLeftInEvent >= 0
			? daysLeftInEvent === 0
				? `${name} ends today.`
				: `${daysLeftInEvent === 1 ? `${daysLeftInEvent} day` : `${daysLeftInEvent} days`} left in ${name}.`
			: daysUntilStart > 0
			? daysUntilStart === 1
				? `${name} starts tomorrow.`
				: `${name} starts in ${daysUntilStart} days.`
			: daysLeftInEvent === -1
			? `${name} ended ${Math.abs(daysLeftInEvent)} day ago.`
			: `${name} ended ${Math.abs(daysLeftInEvent)} days ago.`;
	}

	public rotation(/* date: DateTime */) {
		return null;
		// return EVENT_ROTATION_LETTER[date.diff(this.start, "day").days % 3]!;
	}
}

const EVENTS = [
	new Event({
		name: EventName.DaysOfMischief,
		start: skyDate(2_023, 10, 23),
		end: skyDate(2_023, 11, 12),
		url: String(new URL("daily_guides/events/days_of_mischief/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 6,
		eventCurrencyEmoji: EVENT_EMOJIS.Mischief,
	}),
	new Event({
		name: EventName.AviarysFireworkFestival,
		start: skyDate(2_023, 11, 27),
		end: skyDate(2_023, 12, 17),
		eventCurrencyEnd: skyDate(2_023, 12, 11),
		url: String(new URL("daily_guides/events/aviarys_firework_festival/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: EVENT_EMOJIS.AviarysFireworkFestival,
	}),
	new Event({
		name: EventName.DaysOfFeast,
		start: skyDate(2_023, 12, 18),
		end: skyDate(2_024, 1, 7),
		url: String(new URL("daily_guides/events/days_of_feast/2023.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: EVENT_EMOJIS.Feast,
	}),
	new Event({
		name: EventName.DaysOfFortune,
		start: skyDate(2_024, 1, 29),
		end: skyDate(2_024, 2, 14),
		url: String(new URL("daily_guides/events/days_of_fortune/2024.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: EVENT_EMOJIS.Fortune,
	}),
	new Event({
		name: EventName.DaysOfLove,
		start: skyDate(2_024, 2, 12),
		end: skyDate(2_024, 2, 25),
		url: String(new URL("daily_guides/events/days_of_love/2024.webp", CDN_URL)),
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: EVENT_EMOJIS.Love,
	}),
	new Event({
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
		],
		eventCurrencyPerDay: 5,
		eventCurrencyEmoji: EVENT_EMOJIS.Bloom,
	}),
	new Event({
		name: EventName.SkyXCinnamorollPopUpCafe,
		start: skyDate(2_024, 4, 27),
		end: skyDate(2_024, 5, 18),
		url: null,
		eventCurrencyPerDay: 5,
		// @ts-expect-error Not yet created.
		eventCurrencyEmoji: null,
	}),
] as const satisfies Readonly<Event[]>;

export function resolveEvents(date: DateTime) {
	return EVENTS.filter(({ start, end }) => date >= start && date <= end) ?? null;
}

export function plannedEvents(date: DateTime) {
	return EVENTS.filter(({ end }) => date <= end);
}
