import { nodeProfilingIntegration } from "@sentry/profiling-node";
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
			nodeProfilingIntegration(),
		],
		maxBreadcrumbs: 25,
		profileLifecycle: "trace",
		profileSessionSampleRate: 1,
		release: process.env.SENTRY_RELEASE,
		traceLifecycle: "stream",
		tracesSampleRate: 1,
	});
}
