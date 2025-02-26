import { WIKI_URL } from "./constants.js";

export function snakeCaseName(name: string) {
	return name
		.replaceAll("'s", "s")
		.replace("' ", "'")
		.replaceAll(/[ '-]/g, "_")
		.replaceAll(/[()]/g, "")
		.replaceAll("×", "x")
		.toLowerCase();
}

export function wikiURL(name: string) {
	return String(
		new URL(
			(name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name).replaceAll(" ", "_"),
			WIKI_URL,
		),
	);
}
