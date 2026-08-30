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
