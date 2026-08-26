import { captureException } from "@sentry/react-router";

const MISSING_TRANSLATION_FINGERPRINT = "i18next-missing-translation" as const;

const reportedMissingTranslations = new Set<string>();

export function reportMissingTranslation(
	languages: readonly string[],
	namespace: string,
	key: string,
) {
	const identifier = `${namespace}:${key}`;

	if (reportedMissingTranslations.has(identifier)) {
		return;
	}

	reportedMissingTranslations.add(identifier);
	const message = `Locale ${languages.join(", ")} had a missing translation for "${identifier}".`;
	console.warn(message);

	captureException(new Error(message), {
		extra: { key, languages },
		fingerprint: [MISSING_TRANSLATION_FINGERPRINT, namespace, key],
		tags: { namespace },
	});
}
