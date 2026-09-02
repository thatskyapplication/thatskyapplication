import process from "node:process";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const SERVER_URL = "http://localhost:3010" as const;

export default defineConfig({
	build: {
		outDir: "build/client",
		emptyOutDir: true,
		sourcemap: true,
	},
	plugins: [
		react(),
		tailwindcss(),
		sentryVitePlugin({
			org: "thatskyapplication",
			project: "games",
			release: { create: true, name: process.env.SENTRY_RELEASE ?? "Unknown" },
			sourcemaps: { filesToDeleteAfterUpload: "**/*.map" },
		}),
	],
	server: {
		allowedHosts: [".trycloudflare.com"],
		port: 5176,
		strictPort: true,
		proxy: {
			"/api": { target: SERVER_URL },
			"/cdn": SERVER_URL,
			"/ws": { target: SERVER_URL, ws: true },
			"/login": { target: SERVER_URL },
		},
	},
});
