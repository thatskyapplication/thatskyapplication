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
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export default i18next.use(initReactI18next).init({
	detection: {
		order: [],
	},
	fallbackLng: Locale.EnglishGB,
	lng: Locale.EnglishGB,
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
});
