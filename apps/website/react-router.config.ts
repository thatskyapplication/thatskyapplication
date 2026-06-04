import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";

export default {
	future: {
		v8_middleware: true,
		v8_passThroughRequests: true,
		v8_splitRouteModules: true,
		v8_trailingSlashAwareDataRequests: true,
		v8_viteEnvironmentApi: true,
	},
	ssr: true,
	buildEnd: async ({ buildManifest, reactRouterConfig, viteConfig }) =>
		await sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest }),
} satisfies Config;
