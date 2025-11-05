import { init, pinoIntegration } from "@sentry/react-router";

if (
	process.env.NODE_ENV === "production" &&
	process.env.SENTRY_DATA_SOURCE_NAME &&
	process.env.SENTRY_RELEASE
) {
	init({
		dsn: process.env.SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [pinoIntegration({ error: { levels: ["error", "fatal"] } })],
		maxBreadcrumbs: 25,
		sendDefaultPii: true,
		tracesSampleRate: 1,
		release: process.env.SENTRY_RELEASE,
	});
}
