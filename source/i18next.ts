import { Locale } from "discord.js";
import { init } from "i18next";
import de from "./Locales/de.js";
import enGB from "./Locales/en-GB.js";
import es419 from "./Locales/es-419.js";
import esES from "./Locales/es-ES.js";
import fr from "./Locales/fr.js";
import it from "./Locales/it.js";
import ja from "./Locales/ja.js";
import ko from "./Locales/ko.js";
import ptBR from "./Locales/pt-BR.js";
import ru from "./Locales/ru.js";
import th from "./Locales/th.js";
import vi from "./Locales/vi.js";
import zhCN from "./Locales/zh-CN.js";
import zhTW from "./Locales/zh-TW.js";
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
