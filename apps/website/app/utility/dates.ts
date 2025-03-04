import { skyDate } from "@thatskyapplication/utility";

export const INITIAL_TREASURE_CANDLES_SEEK = skyDate(2025, 1, 1); // 01/01/2025 failed and is thus the first day of the cycle.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_025, 3, 17);
/**
 * @remarks The end date is exclusive.
 */
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_025, 3, 24);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days +
	1;

// Double treasure candles.
export const DOUBLE_TREASURE_CANDLES_DATES = [
	{ start: skyDate(2_024, 12, 9), end: skyDate(2_024, 12, 23) },
	{ start: skyDate(2_025, 3, 17), end: skyDate(2_025, 3, 24) },
];
