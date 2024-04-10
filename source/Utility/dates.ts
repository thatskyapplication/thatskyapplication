import { Locale } from "discord.js";
import { DateTime } from "luxon";

// Time zone.
export const TIME_ZONE = "America/Los_Angeles" as const;

// Double Seasonal Light.
export const DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE = skyDate(2_024, 3, 11);
export const DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE = skyDate(2_024, 3, 17);

export const DOUBLE_SEASONAL_LIGHT_EVENT_DURATION =
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.diff(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, "days").days + 1;

// Miscellaneous.
export const INITIAL_TRAVELLING_SPIRIT_SEEK = skyDate(2_023, 5, 25); // #88 Grateful Shell Collector.

export function todayDate() {
	return DateTime.now().setZone(TIME_ZONE).startOf("day");
}

export function skyDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number) {
	return DateTime.fromObject({ year, month, day, hour, minute, second }, { zone: TIME_ZONE });
}

export function isDuring(start: DateTime, end: DateTime, date = todayDate()) {
	return date >= start && date <= end;
}

export function dateString(date: DateTime, locale: Locale) {
	let resolvedLocale = locale;
	let format;

	// TODO: Replace es-419 with Locale when it's updated.
	switch (locale as Locale | "es-419") {
		case Locale.German:
		case Locale.EnglishGB:
		case "es-419":
		case Locale.SpanishES:
			format = "cccc, d MMMM y";
			break;
		case Locale.EnglishUS:
			format = "cccc, MMMM d, y";
			break;
		case Locale.French:
		case Locale.Italian:
			format = "cccc d MMMM y";
			break;
		case Locale.Japanese:
		case Locale.ChineseCN:
		case Locale.ChineseTW:
			format = "y年L月d日 cccc";
			break;
		case Locale.Korean:
			format = "y년 L월 d일 cccc";
			break;
		case Locale.PortugueseBR:
			format = "cccc, d 'de' MMMM 'de' y";
			break;
		case Locale.Russian:
			format = "cccc, d MMMM y 'г'.";
			break;
		case Locale.Vietnamese:
			format = "cccc, 'ngày' d 'tháng' L, y";
			break;
		default:
			format = "cccc, d MMMM y";
			resolvedLocale = Locale.EnglishGB;
			break;
	}

	return date.toFormat(format, { locale: resolvedLocale });
}

export function dateRangeString(start: DateTime, end: DateTime, locale: Locale) {
	let resolvedLocale = locale;
	let format;

	// TODO: Replace es-419 with Locale when it's updated.
	switch (locale as Locale | "es-419") {
		case Locale.German:
		case Locale.EnglishGB:
		case Locale.French:
		case Locale.Italian:
		case Locale.Russian:
			format = "d MMMM";
			break;
		case "es-419":
		case Locale.SpanishES:
		case Locale.PortugueseBR:
			format = "d 'de' MMMM";
			break;
		case Locale.EnglishUS:
			format = "MMMM d";
			break;
		case Locale.Japanese:
		case Locale.ChineseCN:
		case Locale.ChineseTW:
			format = "M月d日";
			break;
		case Locale.Korean:
			format = "M월 d일";
			break;
		case Locale.Vietnamese:
			format = "'ngày' d 'tháng' M";
			break;
		default:
			resolvedLocale = Locale.EnglishGB;
			format = "d MMMM";
			break;
	}

	return `${start.toFormat(format, { locale: resolvedLocale })} - ${end.toFormat(format, { locale: resolvedLocale })}`;
}
