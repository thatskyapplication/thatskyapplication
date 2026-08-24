import { Locale } from "@discordjs/core/http-only";
import { LOCALES } from "~/utility/constants.js";

const FIRST_DAY_OF_WEEK = {
	[Locale.German]: 1,
	[Locale.EnglishGB]: 1,
	[Locale.SpanishLATAM]: 1,
	[Locale.SpanishES]: 1,
	[Locale.French]: 1,
	[Locale.Italian]: 1,
	[Locale.Japanese]: 7,
	[Locale.Korean]: 7,
	[Locale.PortugueseBR]: 7,
	[Locale.Russian]: 1,
	[Locale.Thai]: 7,
	[Locale.Vietnamese]: 1,
	[Locale.ChineseCN]: 1,
	[Locale.ChineseTW]: 7,
} as const satisfies Readonly<Record<(typeof LOCALES)[number], number>>;

export function isLocale(value: string | undefined): value is (typeof LOCALES)[number] {
	return LOCALES.includes(value as (typeof LOCALES)[number]);
}

export function firstDayOfWeek(locale: string) {
	return isLocale(locale) ? FIRST_DAY_OF_WEEK[locale] : FIRST_DAY_OF_WEEK[Locale.EnglishGB];
}
