import { dedupeIntegration, extraErrorDataIntegration, init } from "@sentry/browser";

const dsn = import.meta.env.VITE_SENTRY_DATA_SOURCE_NAME;
const release = import.meta.env.VITE_SENTRY_RELEASE;

if (dsn && release) {
	init({
		dataCollection: {},
		dsn,
		enableLogs: true,
		integrations: [extraErrorDataIntegration(), dedupeIntegration()],
		maxBreadcrumbs: 10,
		release,
	});
}
