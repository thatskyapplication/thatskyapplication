import {
	extraErrorDataIntegration,
	init,
	nodeRuntimeMetricsIntegration,
	pinoIntegration,
} from "@sentry/react-router";

if (
	process.env.NODE_ENV === "production" &&
	process.env.SENTRY_DATA_SOURCE_NAME &&
	process.env.SENTRY_RELEASE
) {
	init({
		dataCollection: {},
		dsn: process.env.SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [
			pinoIntegration({ error: { levels: ["error", "fatal"] } }),
			nodeRuntimeMetricsIntegration(),
			extraErrorDataIntegration(),
		],
		maxBreadcrumbs: 25,
		release: process.env.SENTRY_RELEASE,
		tracesSampleRate: 1,
	});
}
