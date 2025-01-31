import { Locale } from "@discordjs/core";
import { init } from "i18next";
import de from "./locales/de.js";
import enGB from "./locales/en-gb.js";
import es419 from "./locales/es-419.js";
import esES from "./locales/es-es.js";
import fr from "./locales/fr.js";
import it from "./locales/it.js";
import ja from "./locales/ja.js";
import ko from "./locales/ko.js";
import ptBR from "./locales/pt-br.js";
import ru from "./locales/ru.js";
import th from "./locales/th.js";
import vi from "./locales/vi.js";
import zhCN from "./locales/zh-cn.js";
import zhTW from "./locales/zh-tw.js";
import pino from "./pino.js";

void init({
	fallbackLng: Locale.EnglishGB,
	missingKeyHandler: (locale, namespace, key) =>
		pino.warn(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
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
	interpolation: {
		escapeValue: false,
	},
});
