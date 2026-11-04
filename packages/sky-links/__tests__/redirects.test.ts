import { deepEqual, equal, notEqual } from "node:assert/strict";
import test from "node:test";
import { isPublishedPatchNote, LATEST_PATCH_NOTE, PATCH_NOTES } from "../source/patch-notes.js";
import {
	LATEST_PATCH_NOTE_IDENTIFIER,
	PATCH_NOTE_REDIRECTS,
	REDIRECT_URLS,
	REDIRECTS,
	type Redirect,
	resolveRedirect,
	skyProfileRedirect,
	thisMonthInSkyRedirect,
	thisMonthInSkyURL,
} from "../source/redirects.js";

function assertResolvable(redirects: readonly Redirect[], identifiers: Set<string>) {
	for (const { identifiers: redirectIdentifiers, url } of redirects) {
		equal(redirectIdentifiers.length > 0, true, `${url} has no identifiers`);

		for (const identifier of redirectIdentifiers) {
			equal(
				identifier,
				identifier.toLowerCase(),
				`${identifier} is not lowercase and would never resolve`,
			);

			equal(encodeURIComponent(identifier), identifier, `${identifier} is not safe within a path`);

			equal(identifiers.has(identifier), false, `${identifier} is duplicated`);
			identifiers.add(identifier);
			equal(REDIRECT_URLS.get(identifier), url);
		}
	}
}

test("Identifiers are unique and resolvable.", () => {
	const identifiers = new Set<string>();
	assertResolvable(REDIRECTS, identifiers);
	assertResolvable(PATCH_NOTE_REDIRECTS, identifiers);
	equal(REDIRECT_URLS.size, identifiers.size);
});

test("The identifiers the website builds examples from resolve.", () => {
	for (const pathname of [
		"wiki",
		"profiles/618976181026422814",
		"tmis202601",
		LATEST_PATCH_NOTE_IDENTIFIER,
	]) {
		equal(resolveRedirect(pathname) === null, false, `${pathname} does not resolve`);
	}
});

test("Resolution covers every kind of redirect.", () => {
	deepEqual(resolveRedirect("wiki"), {
		status: 301,
		url: "https://sky-children-of-the-light.fandom.com",
	});

	deepEqual(resolveRedirect("profiles/618976181026422814"), {
		status: 301,
		url: "https://thatskyapplication.com/sky-profiles/618976181026422814",
	});

	deepEqual(resolveRedirect("tmis202601"), {
		status: 301,
		url: "https://www.thatskygame.com/news/this-month-in-sky-january-2026-edition",
	});

	deepEqual(resolveRedirect(LATEST_PATCH_NOTE_IDENTIFIER), {
		status: 302,
		url: LATEST_PATCH_NOTE.url,
	});

	equal(resolveRedirect("p345")?.status, 301);
	equal(resolveRedirect(""), null);
	equal(resolveRedirect("nope"), null);
});

test("Every identifier in the table resolves permanently.", () => {
	for (const [identifier, url] of REDIRECT_URLS) {
		deepEqual(
			resolveRedirect(identifier),
			{ status: 301, url },
			`${identifier} does not resolve to its table entry`,
		);
	}
});

test("Sky profiles resolve only with a user id.", () => {
	equal(
		skyProfileRedirect("profiles/618976181026422814"),
		"https://thatskyapplication.com/sky-profiles/618976181026422814",
	);

	equal(skyProfileRedirect("profiles/"), null);
	equal(skyProfileRedirect("profiles"), null);
	equal(skyProfileRedirect("wiki"), null);
});

test("This Month in Sky resolves only with a real month.", () => {
	equal(
		thisMonthInSkyRedirect("tmis202601"),
		"https://www.thatskygame.com/news/this-month-in-sky-january-2026-edition",
	);

	equal(
		thisMonthInSkyRedirect("tmis202512"),
		"https://www.thatskygame.com/news/this-month-in-sky-december-2025-edition",
	);

	equal(thisMonthInSkyRedirect("tmis202600"), null);
	equal(thisMonthInSkyRedirect("tmis202613"), null);
	equal(thisMonthInSkyRedirect("tmis2026"), null);
	equal(thisMonthInSkyRedirect("wiki"), null);
});

test("This Month in Sky links are padded and always resolve.", () => {
	equal(thisMonthInSkyURL({ month: 11, year: 2026 }), "https://thatsky.link/tmis202611");
	equal(thisMonthInSkyURL({ month: 1, year: 2027 }), "https://thatsky.link/tmis202701");

	for (let month = 1; month <= 12; month++) {
		const { pathname } = new URL(thisMonthInSkyURL({ month, year: 2026 }));
		notEqual(thisMonthInSkyRedirect(pathname.slice(1)), null);
	}
});

test("Every published patch note is redirected to.", () => {
	equal(PATCH_NOTE_REDIRECTS.length, PATCH_NOTES.filter(isPublishedPatchNote).length);

	for (const patchNote of PATCH_NOTES) {
		if (!isPublishedPatchNote(patchNote)) {
			equal(REDIRECT_URLS.has(patchNote.identifier), false);
			continue;
		}

		for (const identifier of [patchNote.identifier, ...(patchNote.aliases ?? [])]) {
			equal(REDIRECT_URLS.get(identifier), patchNote.url);
		}
	}
});
