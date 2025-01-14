import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["source/index.ts"],
	platform: "node",
	format: "esm",
	target: "esnext",
	skipNodeModulesBundle: true,
	clean: true,
	keepNames: true,
	dts: true,
	minify: true,
	sourcemap: false,
	outDir: "distribution",
});
