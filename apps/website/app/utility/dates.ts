import { DateTime } from "luxon";

export const TIME_ZONE = "America/Los_Angeles" as const;
export const SEASON_START = skyDate(2_024, 10, 14);
export const SEASON_END = skyDate(2_024, 12, 30);
export const NEXT_SEASON_START: DateTime | null = null;
export const NEXT_SEASON_END: DateTime | null = null;
export const INITIAL_TREASURE_CANDLES_SEEK = skyDate(2025, 1, 1); // 01/01/2025 failed and is thus the first day of the cycle.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_024, 12, 9);
/**
 * @remarks The end date is exclusive.
 */
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_024, 12, 23);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days +
	1;

export const EVENT_DATES = [
	{ name: "Days of Music", start: skyDate(2_024, 11, 25), end: skyDate(2_024, 12, 12) },
	{ name: "Days of Giving", start: skyDate(2_024, 12, 9), end: skyDate(2_024, 12, 23) },
	{
		name: "Sky × Alice's Wonderland Cafe",
		start: skyDate(2_024, 12, 23),
		end: skyDate(2_025, 1, 13),
	},
] as const;

// Double treasure candles.
export const DOUBLE_TREASURE_CANDLES_DATES = [
	{ start: skyDate(2_024, 12, 9), end: skyDate(2_024, 12, 23) },
];

export function skyNow() {
	return DateTime.now().setZone(TIME_ZONE);
}

export function skyToday() {
	return skyNow().startOf("day");
}

export function skyDate(
	year: number,
	month: number,
	day: number,
	hour?: number,
	minute?: number,
	second?: number,
) {
	return DateTime.fromObject({ year, month, day, hour, minute, second }, { zone: TIME_ZONE });
}

export function isDuring(start: DateTime, end: DateTime, date: DateTime) {
	return date >= start && date <= end;
}
