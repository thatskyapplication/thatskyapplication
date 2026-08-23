import { init, nodeRuntimeMetricsIntegration, pinoIntegration } from "@sentry/node";
import { PRODUCTION, SENTRY_DATA_SOURCE_NAME, SENTRY_RELEASE } from "./utility/configuration.js";

if (PRODUCTION && SENTRY_DATA_SOURCE_NAME && SENTRY_RELEASE) {
	init({
		dataCollection: {},
		dsn: SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [
			pinoIntegration({ error: { levels: ["error", "fatal"] } }),
			nodeRuntimeMetricsIntegration(),
		],
		maxBreadcrumbs: 10,
		release: SENTRY_RELEASE,
		tracesSampleRate: 1,
	});
}
