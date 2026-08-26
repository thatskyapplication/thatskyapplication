import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["source/index.ts"],
	platform: "neutral",
	fixedExtension: false,
	format: "esm",
	target: "esnext",
	dts: true,
	minify: true,
	outDir: "distribution",
});
