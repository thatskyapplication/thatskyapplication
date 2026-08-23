import { Locale } from "@discordjs/core/http-only";
import {
	captureException,
	extraErrorDataIntegration,
	init,
	reactRouterTracingIntegration,
	replayIntegration,
	sentryOnError,
} from "@sentry/react-router";
import i18next, { type Resource } from "i18next";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { isRouteErrorResponse } from "react-router";
import { HydratedRouter } from "react-router/dom";
import { LOCALE_RESOURCES_ELEMENT_ID, LOCALES } from "~/utility/constants";

const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;

if (dsn) {
	init({
		dataCollection: {},
		dsn,
		enableLogs: true,
		integrations: [
			reactRouterTracingIntegration(),
			extraErrorDataIntegration(),
			replayIntegration({ maskAllText: false }),
		],
		replaysOnErrorSampleRate: 1,
		replaysSessionSampleRate: 0.1,
		tracesSampleRate: 1,
	});
}

function isLocale(value: string | undefined): value is (typeof LOCALES)[number] {
	return LOCALES.includes(value as (typeof LOCALES)[number]);
}

function isResource(value: unknown): value is Resource {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readResources() {
	const element = document.getElementById(LOCALE_RESOURCES_ELEMENT_ID);

	if (!element?.textContent) {
		throw new Error("Locale resources were not present in the document.");
	}

	const resources: unknown = JSON.parse(element.textContent);

	if (!isResource(resources)) {
		throw new TypeError("Locale resources were not a valid resource.");
	}

	return resources;
}

async function main() {
	const { locale } = document.documentElement.dataset;
	const language = isLocale(locale) ? locale : Locale.EnglishGB;
	const resources = readResources();

	await i18next.use(initReactI18next).init({
		fallbackLng: Locale.EnglishGB,
		interpolation: { escapeValue: false },
		lng: language,
		missingKeyHandler: (lngs, namespace, key) =>
			console.warn(
				`Locale ${lngs.join(", ")} had a missing translation in namespace ${namespace} for "${key}".`,
			),
		resources,
		returnEmptyString: false,
		saveMissing: true,
	});

	startTransition(() => {
		hydrateRoot(
			document,
			<I18nextProvider i18n={i18next}>
				<StrictMode>
					<HydratedRouter
						onError={(error, info) => {
							if (!isRouteErrorResponse(error)) {
								sentryOnError(error, info);
							}
						}}
					/>
				</StrictMode>
			</I18nextProvider>,
		);
	});
}

main().catch((error: unknown) => {
	console.error(error);
	captureException(error);
});
