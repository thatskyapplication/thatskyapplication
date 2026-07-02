import "temporal-polyfill/global";
import { Locale } from "@discordjs/core/http-only";
import { init, reactRouterTracingIntegration } from "@sentry/react-router";
import i18next, { type Resource } from "i18next";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";

async function main() {
	const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;
	const language = document.documentElement.lang || Locale.EnglishGB;

	const [active, fallback] = await Promise.all([
		fetch(`/locales/${language}`).then((response) => response.json()),
		language === Locale.EnglishGB
			? null
			: fetch(`/locales/${Locale.EnglishGB}`).then((response) => response.json()),
	]);

	const resources: Resource = { [language]: active };

	if (fallback) {
		resources[Locale.EnglishGB] = fallback;
	}

	await i18next.use(initReactI18next).init({
		fallbackLng: Locale.EnglishGB,
		interpolation: { escapeValue: false },
		lng: language,
		missingKeyHandler: (locale, namespace, key) =>
			console.warn(
				`Locale ${locale} had a missing translation in namespace ${namespace} for "${key}".`,
			),
		resources,
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
