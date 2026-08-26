import { strictEqual } from "node:assert";
import test from "node:test";
import { URL } from "node:url";
import {
	PATCH_NOTES,
	isPublishedPatchNote,
	patchNoteVersion,
	upcomingPatchNote,
} from "../source/index.js";

function dayAfter(date: string) {
	const instant = new Date(`${date}T00:00:00Z`);
	instant.setUTCDate(instant.getUTCDate() + 1);
	return instant.toISOString().slice(0, 10);
}

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

		for (const identifier of [patchNote.identifier, ...(patchNote.aliases ?? [])]) {
			strictEqual(/^p\d+(?:-\d+)?$/.test(identifier), true);
			strictEqual(identifiers.has(identifier), false, `${identifier} is duplicated`);
			identifiers.add(identifier);
		}

		if (!isPublishedPatchNote(patchNote)) {
			strictEqual(patchNote.aliases, undefined);
			continue;
		}

		const parsedURL = new URL(patchNote.url);
		strictEqual(parsedURL.protocol, "https:");
		strictEqual(parsedURL.hostname, "thatgamecompany.helpshift.com");
		strictEqual(urls.has(patchNote.url), false, `${patchNote.url} is duplicated`);
		urls.add(patchNote.url);
	}
});

test("The upcoming patch note is the earliest one on or after a date.", () => {
	strictEqual(upcomingPatchNote("9999-12-31"), null);
	strictEqual(upcomingPatchNote("0000-01-01"), PATCH_NOTES[0]);

	for (const patchNote of PATCH_NOTES) {
		strictEqual(upcomingPatchNote(patchNote.date)?.date, patchNote.date);
		const upcoming = upcomingPatchNote(dayAfter(patchNote.date));

		if (upcoming === null) {
			continue;
		}

		strictEqual(upcoming.date > patchNote.date, true);

		for (const candidate of PATCH_NOTES) {
			strictEqual(
				candidate.date > patchNote.date && candidate.date < upcoming.date,
				false,
				`${candidate.date} was skipped over`,
			);
		}
	}
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
