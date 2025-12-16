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
import { Locale } from "discord-api-types/v10";
import { init } from "i18next";

// biome-ignore lint/nursery/noFloatingPromises: Reddit cannot use top-level await.
(async () =>
	init({
		fallbackLng: Locale.EnglishGB,
		interpolation: { escapeValue: false },
		missingKeyHandler: (locale, namespace, key) =>
			console.warn(
				`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`,
			),
		ns: ["general", "commands", "features"],
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
	}))();
