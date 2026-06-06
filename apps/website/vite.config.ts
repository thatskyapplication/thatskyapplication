import { resolve } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((config) => ({
	build: {
		sourcemap: true,
	},
	...(config.command === "serve"
		? {
				resolve: {
					alias: {
						"@thatskyapplication/utility": resolve(
							import.meta.dirname,
							"../../packages/utility/source/index.ts",
						),
					},
				},
			}
		: {}),
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
				unstable_sentryVitePluginOptions: {
					release: {
						// Creating a release above does not work.
						create: true,
						name: process.env.SENTRY_RELEASE ?? "Unknown",
					},
				},
			},
			config,
		),
	],
}));
