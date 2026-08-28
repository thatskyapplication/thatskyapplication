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
import { LOCALE_RESOURCES_ELEMENT_ID } from "~/utility/constants";
import { isLocale } from "~/utility/locale.js";
import { reportMissingTranslation } from "~/utility/missing-translation.js";

const BROWSER_TRANSLATION_CLASSES = ["translated-ltr", "translated-rtl"] as const;
const BROWSER_TRANSLATION_ELEMENT_ID = "goog-gt-tt" as const;
const HYDRATION_BREADCRUMB_CATEGORY = "replay.hydrate-error" as const;

const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;
let browserTranslationObserved = false;

if (dsn) {
	init({
		dataCollection: {},
		// Meta's in-app browser performance logger; no application code appears in its frames.
		denyUrls: [/^iabjs:\/\//],
		dsn,
		enableLogs: true,
		ignoreErrors: [
			// Instagram's Android in-app browser.
			// https://github.com/getsentry/sentry-javascript/issues/23733
			"Error invoking postMessage: Java exception was raised during method invocation",
			"Error invoking postMessage: Java object is gone",
			// Facebook's iOS in-app browser, where the WKWebView bridge is absent.
			"undefined is not an object (evaluating 'window.webkit.messageHandlers')",
			// DuckDuckGo's iOS browser, where the WKWebView bridge does not answer.
			"WKWebView API client did not respond to this postMessage",
		],
		integrations: [
			reactRouterTracingIntegration(),
			extraErrorDataIntegration(),
			replayIntegration({
				beforeAddRecordingEvent: (event) =>
					browserTranslationObserved &&
					event.data.tag === "breadcrumb" &&
					event.data.payload.category === HYDRATION_BREADCRUMB_CATEGORY
						? null
						: event,
				blockAllMedia: false,
				maskAllText: false,
			}),
		],
		replaysOnErrorSampleRate: 1,
		replaysSessionSampleRate: 0.1,
		tracesSampleRate: 1,
	});
}

function translatedByBrowser() {
	const { classList } = document.documentElement;

	return (
		BROWSER_TRANSLATION_CLASSES.some((className) => classList.contains(className)) ||
		document.getElementById(BROWSER_TRANSLATION_ELEMENT_ID) !== null
	);
}

function watchForBrowserTranslation() {
	if (translatedByBrowser()) {
		browserTranslationObserved = true;
		return;
	}

	const observer = new MutationObserver(() => {
		if (!translatedByBrowser()) {
			return;
		}

		browserTranslationObserved = true;
		observer.disconnect();
	});

	observer.observe(document.documentElement, { attributeFilter: ["class"], attributes: true });
	observer.observe(document.body, { childList: true });
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
		missingKeyHandler: reportMissingTranslation,
		resources,
		returnEmptyString: false,
		saveMissing: true,
	});

	watchForBrowserTranslation();

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
