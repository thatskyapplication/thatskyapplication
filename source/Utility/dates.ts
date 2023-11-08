import { skyDate } from "./Utility.js";

// Double Seasonal Light.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_023, 11, 20);
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_023, 11, 26);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days + 1;

// Season of Revival.
export const SEASON_START_DATE = skyDate(2_023, 10, 16);
export const SEASON_END_DATE = skyDate(2_023, 12, 31);
export const SEASON_DURATION = SEASON_END_DATE.diff(SEASON_START_DATE, "days").days + 1;

// Days of Mischief.
export const EVENT_START_DATE = skyDate(2_023, 10, 23);
export const EVENT_END_DATE = skyDate(2_023, 11, 12);

// Miscellaneous.
export const INITIAL_TRAVELLING_SPIRIT_SEEK = skyDate(2_023, 5, 25); // #88 Grateful Shell Collector.
export const INITIAL_TREASURE_CANDLE_REALM_SEEK = skyDate(2_023, 9, 29); // Daylight Prairie.
