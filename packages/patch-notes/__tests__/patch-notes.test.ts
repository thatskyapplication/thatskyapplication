import { strictEqual } from "node:assert";
import test from "node:test";
import { URL } from "node:url";
import {
	PATCH_NOTE_REDIRECTS,
	PATCH_NOTES,
	isPublishedPatchNote,
	patchNoteVersion,
} from "../source/index.js";

test("Definitions are valid and chronological.", () => {
	let previousDate = "";
	const identifiers = new Set<string>();
	const urls = new Set<string>();

	for (const patchNote of PATCH_NOTES) {
		const instant = new Date(`${patchNote.date}T00:00:00Z`);
		strictEqual(Number.isNaN(instant.valueOf()), false, `${patchNote.date} is not a date`);
		strictEqual(instant.toISOString().slice(0, 10), patchNote.date);
		strictEqual(patchNote.date >= previousDate, true, `${patchNote.date} is out of order`);
		previousDate = patchNote.date;

		strictEqual(patchNote.identifier === undefined, patchNote.url === undefined);

		if (!isPublishedPatchNote(patchNote)) {
			strictEqual(patchNote.aliases, undefined);
			continue;
		}

		strictEqual(/^p\d+(?:-\d+)?$/.test(patchNote.identifier), true);
		const parsedURL = new URL(patchNote.url);
		strictEqual(parsedURL.protocol, "https:");
		strictEqual(parsedURL.hostname, "thatgamecompany.helpshift.com");
		strictEqual(urls.has(patchNote.url), false, `${patchNote.url} is duplicated`);
		urls.add(patchNote.url);

		for (const identifier of [patchNote.identifier, ...(patchNote.aliases ?? [])]) {
			strictEqual(/^p\d+(?:-\d+)?$/.test(identifier), true);
			strictEqual(identifiers.has(identifier), false, `${identifier} is duplicated`);
			identifiers.add(identifier);
		}
	}

	strictEqual(PATCH_NOTE_REDIRECTS.size, identifiers.size);
});

test("Patch identifiers are formatted as game versions.", () => {
	strictEqual(patchNoteVersion("p080"), "0.8.0");
	strictEqual(patchNoteVersion("p0100"), "0.10.0");
	strictEqual(patchNoteVersion("p0309"), "0.30.9");
	strictEqual(patchNoteVersion("p31"), "31.0");
	strictEqual(patchNoteVersion("p0311"), "31.1");
	strictEqual(patchNoteVersion("p344"), "34.4");
	strictEqual(patchNoteVersion("p0251-2"), "0.25.1");
});
