import { Locale } from "@discordjs/core/http-only";
import { captureException, init, reactRouterTracingIntegration } from "@sentry/react-router";
import i18next, { type Resource, type ResourceLanguage } from "i18next";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import { LOCALES } from "~/utility/constants";

const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;

if (dsn) {
	init({
		dataCollection: {},
		dsn,
		integrations: [reactRouterTracingIntegration()],
		tracesSampleRate: 1,
	});
}

function isLocale(value: string | undefined): value is (typeof LOCALES)[number] {
	return LOCALES.includes(value as (typeof LOCALES)[number]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isResourceKey(value: unknown): boolean {
	return (
		typeof value === "string" ||
		(Array.isArray(value) && value.every((entry) => isResourceKey(entry))) ||
		(isRecord(value) && Object.values(value).every((entry) => isResourceKey(entry)))
	);
}

function isResourceLanguage(value: unknown): value is ResourceLanguage {
	return isRecord(value) && Object.values(value).every((entry) => isResourceKey(entry));
}

async function fetchResource(language: string) {
	const response = await fetch(`/locales/${language}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch locale ${language}: ${response.status}.`);
	}

	const resource: unknown = await response.json();

	if (!isResourceLanguage(resource)) {
		throw new TypeError(`Locale ${language} returned an invalid resource.`);
	}

	return resource;
}

async function main() {
	const { locale } = document.documentElement.dataset;
	const language = isLocale(locale) ? locale : Locale.EnglishGB;

	const [active, fallback] = await Promise.all([
		fetchResource(language),
		language === Locale.EnglishGB ? null : fetchResource(Locale.EnglishGB),
	]);

	const resources: Resource = { [language]: active };

	if (fallback) {
		resources[Locale.EnglishGB] = fallback;
	}

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
					<HydratedRouter />
				</StrictMode>
			</I18nextProvider>,
		);
	});
}

main().catch((error: unknown) => {
	console.error(error);
	captureException(error);
});
