import {
	extraErrorDataIntegration,
	init,
	nodeRuntimeMetricsIntegration,
	pinoIntegration,
} from "@sentry/node";
import { eventLoopBlockIntegration } from "@sentry/node-native";
import { PRODUCTION, SENTRY_DATA_SOURCE_NAME, SENTRY_RELEASE } from "./utility/configuration.js";

if (PRODUCTION && SENTRY_DATA_SOURCE_NAME && SENTRY_RELEASE) {
	init({
		dataCollection: {},
		dsn: SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [
			pinoIntegration({ error: { levels: ["error", "fatal"] } }),
			nodeRuntimeMetricsIntegration(),
			extraErrorDataIntegration(),
			eventLoopBlockIntegration(),
		],
		maxBreadcrumbs: 10,
		release: SENTRY_RELEASE,
		tracesSampleRate: 1,
	});
}
