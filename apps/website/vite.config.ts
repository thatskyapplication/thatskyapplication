import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig((config) => ({
	build: {
		sourcemap: true,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		babel({
			babelConfig: {
				plugins: ["babel-plugin-react-compiler"],
				presets: ["@babel/preset-typescript"],
			},
			include: /app\/.*\.tsx?$/,
		}),
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
