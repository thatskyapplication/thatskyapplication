import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["source/index.ts"],
	platform: "node",
	format: "esm",
	target: "esnext",
	skipNodeModulesBundle: true,
	clean: true,
	keepNames: true,
	dts: {
		compilerOptions: {
			ignoreDeprecations: "6.0",
		},
	},
	minify: true,
	sourcemap: false,
	outDir: "distribution",
});
