import { init, pinoIntegration } from "@sentry/react-router";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DATA_SOURCE_NAME) {
	init({
		dsn: process.env.SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [pinoIntegration({ error: { levels: ["error", "fatal"] } })],
		maxBreadcrumbs: 25,
		sendDefaultPii: true,
	});
}
