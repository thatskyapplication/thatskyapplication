import { Locale } from "discord.js";
import { init } from "i18next";
import de from "./locales2/de.js";
import enGB from "./locales2/en-GB.js";
import es419 from "./locales2/es-419.js";
import esES from "./locales2/es-ES.js";
import fr from "./locales2/fr.js";
import it from "./locales2/it.js";
import ja from "./locales2/ja.js";
import ko from "./locales2/ko.js";
import ptBR from "./locales2/pt-BR.js";
import ru from "./locales2/ru.js";
import th from "./locales2/th.js";
import vi from "./locales2/vi.js";
import zhCN from "./locales2/zh-CN.js";
import zhTW from "./locales2/zh-TW.js";
import pino from "./pino.js";

void init({
	fallbackLng: Locale.EnglishGB,
	missingKeyHandler: (locale, namespace, key) =>
		pino.warn(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
	ns: ["general", "commands"],
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
});
