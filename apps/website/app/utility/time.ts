import { epochSeconds, maintenancePeriodsOn, TIME_ZONE } from "@thatskyapplication/utility";

export interface TimePreferences {
	locale: string;
	timeZone: string;
	hour12: boolean | undefined;
}

export type DateTimeLabels = Readonly<Record<number, string>>;

export function formatClockTimes(timestamp: number, { locale, timeZone, hour12 }: TimePreferences) {
	return {
		localTime: new Intl.DateTimeFormat(locale, {
			hour: "2-digit",
			minute: "2-digit",
			timeZone,
			timeZoneName: "short",
			hour12,
		}).format(timestamp),
		skyTime: new Intl.DateTimeFormat(locale, {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: TIME_ZONE,
			timeZoneName: "short",
			hour12,
		}).format(timestamp),
	};
}

export function maintenanceBannerLabels(
	date: Temporal.ZonedDateTime,
	{ locale, timeZone, hour12 }: TimePreferences,
) {
	const timeFormat = new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 });

	return maintenancePeriodsOn(date).map(({ end, start }) => ({
		end: timeFormat.format(end.epochMilliseconds),
		key: start.epochMilliseconds,
		start: timeFormat.format(start.epochMilliseconds),
	}));
}

export function shardEruptionTimestampLabels(
	timestamps: readonly { end: Temporal.ZonedDateTime; start: Temporal.ZonedDateTime }[],
	{ locale, timeZone, hour12 }: TimePreferences,
) {
	const timeFormat = new Intl.DateTimeFormat(locale, {
		timeZone,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12,
	});

	const label = (date: Temporal.ZonedDateTime) => ({
		format: timeFormat.format(date.epochMilliseconds),
		unix: epochSeconds(date),
	});

	return timestamps.map(({ end, start }) => ({ end: label(end), start: label(start) }));
}

export function dateTimeFormatter({ locale, timeZone, hour12 }: TimePreferences) {
	return new Intl.DateTimeFormat(locale, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZone,
		hour12,
	});
}

export function dateTimeLabels(
	timestamps: Iterable<number>,
	preferences: TimePreferences,
): DateTimeLabels {
	const format = dateTimeFormatter(preferences);

	const labels: Record<number, string> = {};

	for (const timestamp of timestamps) {
		labels[timestamp] ??= format.format(timestamp);
	}

	return labels;
}
