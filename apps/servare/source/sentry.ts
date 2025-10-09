import { init, pinoIntegration } from "@sentry/node";
import { PRODUCTION, SENTRY_DATA_SOURCE_NAME } from "./utility/constants.js";

if (PRODUCTION && SENTRY_DATA_SOURCE_NAME) {
	init({
		dsn: SENTRY_DATA_SOURCE_NAME,
		enableLogs: true,
		integrations: [pinoIntegration({ error: { levels: ["error", "fatal"] } })],
		maxBreadcrumbs: 10,
		sendDefaultPii: true,
	});
}
