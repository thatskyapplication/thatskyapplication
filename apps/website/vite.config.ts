import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((config) => ({
	build: {
		sourcemap: true,
	},
	plugins: [
		reactRouterHonoServer(),
		reactRouter(),
		tsconfigPaths(),
		sentryReactRouter(
			{
				org: "thatskyapplication",
				project: "website",
				sourceMapsUploadOptions: {
					enabled: true,
					filesToDeleteAfterUpload: "**/*.map",
				},
			},
			config,
		),
	],
}));
