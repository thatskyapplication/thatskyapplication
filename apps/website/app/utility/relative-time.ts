export function formatRelativeTime(
	timestamp: number,
	nowTimestamp: number,
	locale: string,
	timeZone: string,
) {
	const date = Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO(timeZone);
	const now = Temporal.Instant.fromEpochMilliseconds(nowTimestamp).toZonedDateTimeISO(timeZone);
	const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

	const calendarDuration = date
		.toPlainDateTime()
		.since(now.toPlainDateTime(), { largestUnit: "year" });

	const relativeTo = now.toPlainDate();

	for (const unit of ["year", "month", "week", "day"] as const) {
		const value = calendarDuration.total({ unit, relativeTo });

		if (Math.abs(value) >= 1) {
			return formatter.format(Math.trunc(value), unit);
		}
	}

	const exactDuration = date.since(now);

	for (const unit of ["hour", "minute"] as const) {
		const value = exactDuration.total(unit);

		if (Math.abs(value) >= 1) {
			return formatter.format(Math.trunc(value), unit);
		}
	}

	return formatter.format(Math.trunc(exactDuration.total("second")), "second");
}
