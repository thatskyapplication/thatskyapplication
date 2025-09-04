import { init } from "@sentry/node";
import { PRODUCTION, SENTRY_DATA_SOURCE_NAME } from "./utility/configuration.js";

if (PRODUCTION && SENTRY_DATA_SOURCE_NAME) {
	init({ dsn: SENTRY_DATA_SOURCE_NAME, sendDefaultPii: true });
}
