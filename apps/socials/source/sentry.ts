import {
	extraErrorDataIntegration,
	init,
	nodeRuntimeMetricsIntegration,
	pinoIntegration,
} from "@sentry/node";
import { eventLoopBlockIntegration } from "@sentry/node-native";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
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
			nodeProfilingIntegration(),
		],
		maxBreadcrumbs: 10,
		profileLifecycle: "trace",
		profileSessionSampleRate: 1,
		release: SENTRY_RELEASE,
		traceLifecycle: "stream",
		tracesSampleRate: 1,
	});
}
