import { TIME_ZONE } from "@thatskyapplication/utility";

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

export function dateTimeLabels(
	timestamps: Iterable<number>,
	{ locale, timeZone, hour12 }: TimePreferences,
): DateTimeLabels {
	const format = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

	const labels: Record<number, string> = {};

	for (const timestamp of timestamps) {
		labels[timestamp] ??= format.format(timestamp);
	}

	return labels;
}
