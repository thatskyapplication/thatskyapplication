import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["source/index.ts"],
	platform: "node",
	fixedExtension: false,
	format: "esm",
	target: "esnext",
	deps: {
		skipNodeModulesBundle: true,
	},
	dts: true,
	minify: true,
	outDir: "distribution",
});
