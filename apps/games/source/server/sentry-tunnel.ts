import { SENTRY_DATA_SOURCE_NAME } from "./config.js";

const envelopeURL = (() => {
	if (!SENTRY_DATA_SOURCE_NAME) {
		return null;
	}

	const dataSourceName = new URL(SENTRY_DATA_SOURCE_NAME);
	const projectId = dataSourceName.pathname.slice(1);
	return projectId.length === 0 ? null : `${dataSourceName.origin}/api/${projectId}/envelope/`;
})();

export function sentryEnvelopeURL(body: string) {
	if (envelopeURL === null) {
		return null;
	}

	const newline = body.indexOf("\n");

	if (newline === -1) {
		return null;
	}

	let header: unknown;

	try {
		header = JSON.parse(body.slice(0, newline));
	} catch {
		return null;
	}

	return typeof header === "object" &&
		header !== null &&
		"dsn" in header &&
		header.dsn === SENTRY_DATA_SOURCE_NAME
		? envelopeURL
		: null;
}
