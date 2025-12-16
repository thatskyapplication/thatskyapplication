import { builtinModules } from "node:module";
import { defineConfig } from "vite";

export default defineConfig({
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
	ssr: {
		noExternal: true,
	},
});
