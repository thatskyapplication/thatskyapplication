import { Collection } from "@discordjs/collection";
import { DateTime } from "luxon";
import type { HeartsExtra } from "../models/Heart.js";

// Time zone.
export const TIME_ZONE = "America/Los_Angeles" as const;

// Double treasure candles.
export const DOUBLE_TREASURE_CANDLES_DATES = new Collection<
	number,
	{ start: DateTime; end: DateTime }
>().set(1, {
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
});

// Double Seasonal Light.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_024, 12, 9);
/**
 * @remarks The end date is exclusive.
 */
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_024, 12, 23);

export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE_MARKDOWN =
	`<t:${DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE.toUnixInteger()}:d>` as const;

export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE_MARKDOWN =
	`<t:${DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.toUnixInteger()}:d>` as const;

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days +
	1;

// Extra hearts.
export const HEART_EXTRA_DATES = new Collection<number, HeartsExtra>().set(1, {
	start: skyDate(2_024, 12, 9),
	end: skyDate(2_024, 12, 23),
	count: 1,
});

// Miscellaneous.
export const INITIAL_TRAVELLING_SPIRIT_SEEK = skyDate(2_023, 5, 25); // #88 Grateful Shell Collector.
export const INITIAL_TREASURE_CANDLES_SEEK = skyDate(2025, 1, 1); // 01/01/2025 failed and is thus the first day of the cycle.

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
