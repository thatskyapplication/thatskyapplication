import { strictEqual } from "node:assert";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";
import { PATCH_NOTE_REDIRECTS } from "@thatskyapplication/patch-notes";

test("The README documents every patch note redirect.", async () => {
	const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
	const documentedRows = [...readme.matchAll(/^\|\s*(p[\d-]+)\s*\|\s*(https:\/\/\S+)\s*\|$/gm)];

	const documentedRedirects = new Map(
		documentedRows.map(([, identifier, url]) => [identifier!, url!] as const),
	);

	strictEqual(documentedRows.length, PATCH_NOTE_REDIRECTS.size);
	strictEqual(documentedRedirects.size, PATCH_NOTE_REDIRECTS.size);

	for (const [identifier, url] of PATCH_NOTE_REDIRECTS) {
		strictEqual(documentedRedirects.get(identifier), url, `${identifier} is undocumented`);
	}
});
