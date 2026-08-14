export const HOUR_CYCLE_COOKIE_NAME = "hour_cycle" as const;
export const HOUR_CYCLE_COOKIE_MAX_AGE = 31536000 as const;
export const HOUR_CYCLE_TWELVE = "12" as const;
export const HOUR_CYCLE_TWENTY_FOUR = "24" as const;
export const HOUR_CYCLE_AUTOMATIC = "automatic" as const;

export type HourCycleValues = typeof HOUR_CYCLE_TWELVE | typeof HOUR_CYCLE_TWENTY_FOUR;

export function isHourCycleValue(value: unknown): value is HourCycleValues {
	return value === HOUR_CYCLE_TWELVE || value === HOUR_CYCLE_TWENTY_FOUR;
}

export function parseHour12(value: string | null | undefined) {
	if (value === HOUR_CYCLE_TWELVE) {
		return true;
	}

	if (value === HOUR_CYCLE_TWENTY_FOUR) {
		return false;
	}

	return undefined;
}
