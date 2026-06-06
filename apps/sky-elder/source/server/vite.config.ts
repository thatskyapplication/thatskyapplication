import { builtinModules } from "node:module";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig((config) => ({
	build: {
		ssr: "index.ts",
		outDir: "../../distribution/server",
		emptyOutDir: true,
		target: "ESNext",
		sourcemap: true,
		rollupOptions: {
			external: [...builtinModules],
			output: {
				format: "cjs",
				entryFileNames: "index.cjs",
				inlineDynamicImports: true,
			},
		},
	},
	...(config.mode === "development"
		? {
				resolve: {
					alias: {
						"@thatskyapplication/utility": resolve(
							import.meta.dirname,
							"../../../../packages/utility/source/index.ts",
						),
					},
				},
			}
		: {}),
	ssr: {
		noExternal: true,
	},
}));
