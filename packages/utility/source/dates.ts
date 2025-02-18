import { DateTime } from "luxon";

// Time zone.
export const TIME_ZONE = "America/Los_Angeles" as const;

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
