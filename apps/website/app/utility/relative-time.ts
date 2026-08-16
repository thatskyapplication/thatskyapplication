export function formatRelativeTime(
	timestamp: number,
	nowTimestamp: number,
	locale: string,
	timeZone: string,
) {
	const date = Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO(timeZone);
	const now = Temporal.Instant.fromEpochMilliseconds(nowTimestamp).toZonedDateTimeISO(timeZone);
	const duration = date.since(now);
	const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

	for (const unit of ["year", "month", "week", "day", "hour", "minute"] as const) {
		const value = duration.total({ unit, relativeTo: now });

		if (Math.abs(value) >= 1) {
			return formatter.format(Math.trunc(value), unit);
		}
	}

	return formatter.format(
		Math.trunc(duration.total({ unit: "second", relativeTo: now })),
		"second",
	);
}
