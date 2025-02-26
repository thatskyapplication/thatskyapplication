import { skyDate } from "@thatskyapplication/utility";
import type { DateTime } from "luxon";

export const SEASON_START = skyDate(2_025, 1, 20);
export const SEASON_END = skyDate(2_025, 4, 7);
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
	{
		name: "Days of Fortune",
		start: skyDate(2_025, 1, 27),
		end: skyDate(2_025, 2, 10),
	},
	{
		name: "Days of Love",
		start: skyDate(2_025, 2, 10),
		end: skyDate(2_025, 2, 24),
	},
	{
		name: "Days of Treasure",
		start: skyDate(2_025, 3, 3),
		end: skyDate(2_025, 3, 17),
	},
	{
		name: "Days of Bloom",
		start: skyDate(2_025, 3, 24),
		end: skyDate(2_025, 4, 14),
	},
] as const;

// Double treasure candles.
export const DOUBLE_TREASURE_CANDLES_DATES = [
	{ start: skyDate(2_024, 12, 9), end: skyDate(2_024, 12, 23) },
];
