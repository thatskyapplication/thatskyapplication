export const TIME_ZONE = "America/Los_Angeles" as const;

export function skyNow() {
	return Temporal.Instant.fromEpochMilliseconds(Date.now()).toZonedDateTimeISO(TIME_ZONE);
}

export function skyToday() {
	return skyNow().startOfDay();
}

export function skyDate(
	year: number,
	month: number,
	day: number,
	hour?: number,
	minute?: number,
	second?: number,
) {
	return Temporal.ZonedDateTime.from({
		timeZone: TIME_ZONE,
		year,
		month,
		day,
		hour,
		minute,
		second,
	});
}

export function isDuring(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	date: Temporal.ZonedDateTime,
) {
	return (
		Temporal.ZonedDateTime.compare(date, start) >= 0 &&
		Temporal.ZonedDateTime.compare(date, end) <= 0
	);
}

export function isActive(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	date: Temporal.ZonedDateTime,
) {
	return (
		Temporal.ZonedDateTime.compare(date, start) >= 0 &&
		Temporal.ZonedDateTime.compare(date, end) < 0
	);
}

export function epochSeconds(date: Temporal.ZonedDateTime) {
	return Math.floor(date.epochMilliseconds / 1_000);
}
