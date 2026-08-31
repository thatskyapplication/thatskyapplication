import { builtinModules } from "node:module";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		ssr: "index.ts",
		outDir: "../../distribution/server",
		emptyOutDir: true,
		target: "Node22",
		minify: true,
		sourcemap: true,
		rolldownOptions: {
			external: [...builtinModules],
			output: {
				codeSplitting: false,
				format: "cjs",
				entryFileNames: "index.cjs",
			},
		},
	},
	ssr: {
		noExternal: true,
	},
});
