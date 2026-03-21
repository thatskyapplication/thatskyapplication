import { Locale } from "@discordjs/core/http-only";
import { init, reactRouterTracingIntegration } from "@sentry/react-router";
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
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";

async function main() {
	const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;

	await i18next
		.use(initReactI18next)
		.use(I18nextBrowserLanguageDetector)
		.init({
			detection: { order: ["htmlTag"], caches: [] },
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
		});

	if (dsn) {
		init({
			dsn,
			integrations: [reactRouterTracingIntegration()],
			sendDefaultPii: true,
			tracesSampleRate: 1,
		});
	}

	startTransition(() => {
		hydrateRoot(
			document,
			<I18nextProvider i18n={i18next}>
				<StrictMode>
					<HydratedRouter />
				</StrictMode>
			</I18nextProvider>,
		);
	});
}

main().catch((error) => console.error(error));
