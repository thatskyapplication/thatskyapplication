import { Locale } from "@discordjs/core/http-only";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	it,
	ja,
	ko,
	ptBR,
	ru,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import { createI18nextMiddleware } from "remix-i18next/middleware";
import { LOCALES } from "~/utility/constants.js";

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
	detection: {
		supportedLanguages: LOCALES as unknown as string[],
		fallbackLanguage: Locale.EnglishGB,
	},
	i18next: {
		fallbackLng: Locale.EnglishGB,
		interpolation: { escapeValue: false },
		missingKeyHandler: (locale, namespace, key) =>
			console.warn(
				`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`,
			),
		resources: {
			[Locale.German]: de,
			[Locale.EnglishGB]: enGB,
			[Locale.SpanishLATAM]: es419,
			[Locale.SpanishES]: esES,
			[Locale.French]: fr,
			[Locale.Italian]: it,
			[Locale.Japanese]: ja,
			[Locale.Korean]: ko,
			[Locale.PortugueseBR]: ptBR,
			[Locale.Russian]: ru,
			[Locale.Thai]: th,
			[Locale.Vietnamese]: vi,
			[Locale.ChineseCN]: zhCN,
			[Locale.ChineseTW]: zhTW,
		},
		returnEmptyString: false,
		saveMissing: true,
	},
});
