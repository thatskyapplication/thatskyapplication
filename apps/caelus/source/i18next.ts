import { init } from "i18next";
import pino from "./pino.js";
import { I18_NEXT_OPTIONS } from "./utility/constants.js";

await init({
	...I18_NEXT_OPTIONS,
	missingKeyHandler: (locale, namespace, key) =>
		pino.warn(`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`),
});
