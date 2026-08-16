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

	for (const unit of ["year", "month", "week", "day", "hour", "minute", "second"] as const) {
		const value = duration.total({ unit, relativeTo: now });

		if (Math.abs(value) >= 1 || unit === "second") {
			return formatter.format(Math.round(value), unit);
		}
	}

	throw new Error("Could not format relative time.");
}
