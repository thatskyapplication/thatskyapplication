import { deepStrictEqual, strictEqual } from "node:assert";
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
} from "../source/redirects.js";

function assertResolvable(redirects: readonly Redirect[], identifiers: Set<string>) {
	for (const { identifiers: redirectIdentifiers, url } of redirects) {
		strictEqual(redirectIdentifiers.length > 0, true, `${url} has no identifiers`);

		for (const identifier of redirectIdentifiers) {
			strictEqual(
				identifier,
				identifier.toLowerCase(),
				`${identifier} is not lowercase and would never resolve`,
			);

			strictEqual(
				encodeURIComponent(identifier),
				identifier,
				`${identifier} is not safe within a path`,
			);

			strictEqual(identifiers.has(identifier), false, `${identifier} is duplicated`);
			identifiers.add(identifier);
			strictEqual(REDIRECT_URLS.get(identifier), url);
		}
	}
}

test("Identifiers are unique and resolvable.", () => {
	const identifiers = new Set<string>();
	assertResolvable(REDIRECTS, identifiers);
	assertResolvable(PATCH_NOTE_REDIRECTS, identifiers);
	strictEqual(REDIRECT_URLS.size, identifiers.size);
});

test("The identifiers the website builds examples from resolve.", () => {
	for (const pathname of [
		"wiki",
		"profiles/618976181026422814",
		"tmis202601",
		LATEST_PATCH_NOTE_IDENTIFIER,
	]) {
		strictEqual(resolveRedirect(pathname) === null, false, `${pathname} does not resolve`);
	}
});

test("Resolution covers every kind of redirect.", () => {
	deepStrictEqual(resolveRedirect("wiki"), {
		status: 301,
		url: "https://sky-children-of-the-light.fandom.com",
	});

	deepStrictEqual(resolveRedirect("profiles/618976181026422814"), {
		status: 301,
		url: "https://thatskyapplication.com/sky-profiles/618976181026422814",
	});

	deepStrictEqual(resolveRedirect("tmis202601"), {
		status: 301,
		url: "https://www.thatskygame.com/news/this-month-in-sky-january-2026-edition",
	});

	deepStrictEqual(resolveRedirect(LATEST_PATCH_NOTE_IDENTIFIER), {
		status: 302,
		url: LATEST_PATCH_NOTE.url,
	});

	strictEqual(resolveRedirect("p345")?.status, 301);
	strictEqual(resolveRedirect(""), null);
	strictEqual(resolveRedirect("nope"), null);
});

test("Every identifier in the table resolves permanently.", () => {
	for (const [identifier, url] of REDIRECT_URLS) {
		deepStrictEqual(
			resolveRedirect(identifier),
			{ status: 301, url },
			`${identifier} does not resolve to its table entry`,
		);
	}
});

test("Sky profiles resolve only with a user id.", () => {
	strictEqual(
		skyProfileRedirect("profiles/618976181026422814"),
		"https://thatskyapplication.com/sky-profiles/618976181026422814",
	);

	strictEqual(skyProfileRedirect("profiles/"), null);
	strictEqual(skyProfileRedirect("profiles"), null);
	strictEqual(skyProfileRedirect("wiki"), null);
});

test("This Month in Sky resolves only with a real month.", () => {
	strictEqual(
		thisMonthInSkyRedirect("tmis202601"),
		"https://www.thatskygame.com/news/this-month-in-sky-january-2026-edition",
	);

	strictEqual(
		thisMonthInSkyRedirect("tmis202512"),
		"https://www.thatskygame.com/news/this-month-in-sky-december-2025-edition",
	);

	strictEqual(thisMonthInSkyRedirect("tmis202600"), null);
	strictEqual(thisMonthInSkyRedirect("tmis202613"), null);
	strictEqual(thisMonthInSkyRedirect("tmis2026"), null);
	strictEqual(thisMonthInSkyRedirect("wiki"), null);
});

test("Every published patch note is redirected to.", () => {
	strictEqual(PATCH_NOTE_REDIRECTS.length, PATCH_NOTES.filter(isPublishedPatchNote).length);

	for (const patchNote of PATCH_NOTES) {
		if (!isPublishedPatchNote(patchNote)) {
			strictEqual(REDIRECT_URLS.has(patchNote.identifier), false);
			continue;
		}

		for (const identifier of [patchNote.identifier, ...(patchNote.aliases ?? [])]) {
			strictEqual(REDIRECT_URLS.get(identifier), patchNote.url);
		}
	}
});
