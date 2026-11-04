import { equal } from "node:assert/strict";
import test from "node:test";
import { URL } from "node:url";
import {
	LATEST_MAJOR_PATCH_NOTES,
	LATEST_PATCH_NOTE,
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

test("The latest major patch notes run from the latest .0 to the latest published note.", () => {
	const versions = LATEST_MAJOR_PATCH_NOTES.map(({ identifier }) => patchNoteVersion(identifier));

	equal(versions[0]!.endsWith(".0"), true);
	equal(versions.filter((version) => version.endsWith(".0")).length, 1);
	equal(LATEST_MAJOR_PATCH_NOTES.at(-1), LATEST_PATCH_NOTE);
});

test("Definitions are valid and chronological.", () => {
	let previousDate = "";
	const identifiers = new Set<string>();
	const urls = new Set<string>();

	for (const patchNote of PATCH_NOTES) {
		const instant = new Date(`${patchNote.date}T00:00:00Z`);
		equal(Number.isNaN(instant.valueOf()), false, `${patchNote.date} is not a date`);
		equal(instant.toISOString().slice(0, 10), patchNote.date);
		equal(patchNote.date >= previousDate, true, `${patchNote.date} is out of order`);
		previousDate = patchNote.date;

		for (const identifier of [patchNote.identifier, ...(patchNote.aliases ?? [])]) {
			equal(/^p\d+(?:-\d+)?$/.test(identifier), true);
			equal(identifiers.has(identifier), false, `${identifier} is duplicated`);
			identifiers.add(identifier);
		}

		if (!isPublishedPatchNote(patchNote)) {
			equal(patchNote.aliases, undefined);
			continue;
		}

		const parsedURL = new URL(patchNote.url);
		equal(parsedURL.protocol, "https:");
		equal(parsedURL.hostname, "thatgamecompany.helpshift.com");
		equal(urls.has(patchNote.url), false, `${patchNote.url} is duplicated`);
		urls.add(patchNote.url);
	}
});

test("The upcoming patch note is the earliest one on or after a date.", () => {
	equal(upcomingPatchNote("9999-12-31"), null);
	equal(upcomingPatchNote("0000-01-01"), PATCH_NOTES[0]);

	for (const patchNote of PATCH_NOTES) {
		equal(upcomingPatchNote(patchNote.date)?.date, patchNote.date);
		const upcoming = upcomingPatchNote(dayAfter(patchNote.date));

		if (upcoming === null) {
			continue;
		}

		equal(upcoming.date > patchNote.date, true);

		for (const candidate of PATCH_NOTES) {
			equal(
				candidate.date > patchNote.date && candidate.date < upcoming.date,
				false,
				`${candidate.date} was skipped over`,
			);
		}
	}
});

test("Patch identifiers are formatted as game versions.", () => {
	equal(patchNoteVersion("p080"), "0.8.0");
	equal(patchNoteVersion("p0100"), "0.10.0");
	equal(patchNoteVersion("p0309"), "0.30.9");
	equal(patchNoteVersion("p31"), "31.0");
	equal(patchNoteVersion("p0311"), "31.1");
	equal(patchNoteVersion("p344"), "34.4");
	equal(patchNoteVersion("p0251-2"), "0.25.1");
});
