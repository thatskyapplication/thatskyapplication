import { init, pinoIntegration } from "@sentry/node";
import { PRODUCTION, SENTRY_DATA_SOURCE_NAME } from "./utility/configuration.js";

if (PRODUCTION && SENTRY_DATA_SOURCE_NAME) {
	init({
		dsn: SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [pinoIntegration()],
		maxBreadcrumbs: 10,
		sendDefaultPii: true,
	});
}
