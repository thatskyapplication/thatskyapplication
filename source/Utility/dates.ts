import { DateTime } from "luxon";

// Time zone.
export const TIME_ZONE = "America/Los_Angeles" as const;

// Double Seasonal Light.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_023, 11, 20);
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_023, 11, 26);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days + 1;

// Aviary's Firework Festival show.
export const AVIARY_FIREWORK_FESTIVAL_FIRST_SHOW_START_DATE = skyDate(2_023, 12, 12);
export const AVIARY_FIREWORK_FESTIVAL_LAST_SHOW_END_DATE = skyDate(2_023, 12, 17, 20);

// Miscellaneous.
export const INITIAL_TRAVELLING_SPIRIT_SEEK = skyDate(2_023, 5, 25); // #88 Grateful Shell Collector.
export const INITIAL_TREASURE_CANDLE_REALM_SEEK = skyDate(2_023, 9, 29); // Daylight Prairie.

export function todayDate() {
	return DateTime.now().setZone(TIME_ZONE).startOf("day");
}

export function skyDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number) {
	return DateTime.fromObject({ year, month, day, hour, minute, second }, { zone: TIME_ZONE });
}

export function isDuring(start: DateTime, end: DateTime, date = todayDate()) {
	return date >= start && date <= end;
}
