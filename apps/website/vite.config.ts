import { resolve } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";

export default defineConfig((config) => ({
	build: {
		sourcemap: true,
	},
	resolve: {
		tsconfigPaths: true,
		...(config.command === "serve"
			? {
					alias: {
						"@thatskyapplication/utility": resolve(
							import.meta.dirname,
							"../../packages/utility/source/index.ts",
						),
					},
				}
			: {}),
	},
	plugins: [
		reactRouterHonoServer(),
		tailwindcss(),
		reactRouter(),
		sentryReactRouter(
			{
				org: "thatskyapplication",
				project: "website",
				sourcemaps: {
					filesToDeleteAfterUpload: "**/*.map",
				},
				release: {
					create: true,
					name: process.env.SENTRY_RELEASE ?? "Unknown",
				},
			},
			config,
		),
	],
}));
