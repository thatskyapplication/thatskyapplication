import { URL } from "node:url";
import { DateTime } from "luxon";
import { CDN_URL } from "./Constants.js";

// Time zone.
export const TIME_ZONE = "America/Los_Angeles" as const;

// Double Seasonal Light.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_023, 11, 20);
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_023, 11, 26);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days + 1;

const EVENT_ROTATION_LETTER = ["B", "C", "A"] as const;

export function todayDate() {
	return DateTime.now().setZone(TIME_ZONE).startOf("day");
}

export function skyDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number) {
	return DateTime.fromObject({ year, month, day, hour, minute, second }, { zone: TIME_ZONE });
}

export function isDuring(start: DateTime, end: DateTime, date = todayDate()) {
	return date >= start && date <= end;
}

interface Event {
	name: string;
	start: DateTime;
	end: DateTime;
	rotation(today: DateTime): (typeof EVENT_ROTATION_LETTER)[number];
	url: string | null;
}

const EVENTS = [
	{
		name: "Days of Mischief",
		start: skyDate(2_023, 10, 23),
		end: skyDate(2_023, 11, 12),
		rotation(today = todayDate()) {
			return EVENT_ROTATION_LETTER[today.diff(this.start, "day").days % 3]!;
		},
		url: String(new URL("daily_guides/events/days_of_mischief/2023.webp", CDN_URL)),
	},
	{
		name: "Aviary Fireworks Festival",
		start: skyDate(2_023, 11, 27),
		end: skyDate(2_023, 12, 11),
		rotation(today = todayDate()) {
			return EVENT_ROTATION_LETTER[today.diff(this.start, "day").days % 3]!;
		},
		url: null,
	},
] as const satisfies Readonly<Event[]>;

export function currentEvent(date: DateTime) {
	return EVENTS.find(({ start, end }) => date >= start && date <= end) ?? null;
}

// Miscellaneous.
export const INITIAL_TRAVELLING_SPIRIT_SEEK = skyDate(2_023, 5, 25); // #88 Grateful Shell Collector.
export const INITIAL_TREASURE_CANDLE_REALM_SEEK = skyDate(2_023, 9, 29); // Daylight Prairie.
