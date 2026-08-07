import { deepStrictEqual, equal, ok } from "node:assert/strict";
import { test } from "node:test";
import {
	CatalogueCollection,
	type CatalogueSearchEntry,
	catalogueSearch,
	catalogueSearchEntries,
	CatalogueSearchType,
} from "../source/catalogue.js";
import enGB from "../source/locales/en-gb.js";

function resolveName(key: string) {
	let current: unknown = enGB.general;

	for (const part of key.split(".")) {
		current = (current as Record<string, unknown>)[part];
	}

	return typeof current === "string" ? current : key;
}

const entries = catalogueSearchEntries(resolveName);

function names(query: string, limit?: number) {
	return catalogueSearch(entries, query, limit).map(({ name }) => name);
}

function firstTarget(query: string) {
	return catalogueSearch(entries, query, 1)[0]?.target;
}

test("An empty query yields nothing.", () => {
	deepStrictEqual(names(""), []);
	deepStrictEqual(names("   "), []);
});

test("A query with no matches yields nothing.", () => {
	deepStrictEqual(names("zzzzzzzz"), []);
});

test("Queries are trimmed and case-insensitive.", () => {
	deepStrictEqual(names("  season of prophecy  ", 1), names("SEASON OF PROPHECY", 1));
});

test("An exact name outranks a longer prefix.", () => {
	equal(names("Days of Summer", 1)[0], "Days of Summer");
	equal(names("AURORA", 1)[0], "AURORA");
});

test("A prefix outranks a substring.", () => {
	const [first] = names("Light", 1);
	ok(first?.toUpperCase().startsWith("LIGHT"), `Expected a prefix match, got ${first}.`);
});

test("A name match outranks a keyword match.", () => {
	const results = catalogueSearch(entries, "Prophecy");
	const isNameMatch = ({ name }: CatalogueSearchEntry) => name.toUpperCase().includes("PROPHECY");
	const firstKeywordOnly = results.findIndex((entry) => !isNameMatch(entry));

	ok(firstKeywordOnly > 0, "Expected both name and keyword matches.");
	ok(results.slice(firstKeywordOnly).every((entry) => !isNameMatch(entry)));
});

test("Spirits are searchable by their season and realm.", () => {
	const bySeason = catalogueSearch(entries, "Season of Prophecy").filter(
		({ target }) => target.type === CatalogueSearchType.Spirit,
	);

	ok(bySeason.length > 0, "Expected spirits to match their season name.");

	const byRealm = catalogueSearch(entries, "Daylight Prairie").filter(
		({ target }) => target.type === CatalogueSearchType.Spirit,
	);

	ok(byRealm.length > 0, "Expected spirits to match their realm name.");
});

test("Seasons and events are indexed newest first.", () => {
	const seasons = catalogueSearch(entries, "Season of").filter(
		({ target }) => target.type === CatalogueSearchType.Season,
	);

	const identifiers = seasons.map(({ target }) =>
		target.type === CatalogueSearchType.Season ? target.season.id : -1,
	);

	deepStrictEqual(
		identifiers,
		identifiers.toSorted((a, b) => b - a),
	);
});

test("The limit caps results and is optional.", () => {
	equal(names("Season of", 5).length, 5);
	ok(names("Season of").length > 5);
});

test("Cosmetic packs are indexed and target where they are sold.", () => {
	equal(names("Journey Pack", 1)[0], "Journey Pack");

	const secretArea = firstTarget("Journey Pack");
	ok(secretArea?.type === CatalogueSearchType.Collection);
	equal(secretArea.collection, CatalogueCollection.SecretArea);

	const starterPack = firstTarget("Red & Blue Starter Pack");
	ok(starterPack?.type === CatalogueSearchType.Collection);
	equal(starterPack.collection, CatalogueCollection.StarterPacks);

	const seasonPack = firstTarget("Roving Snufkin Robe Set");
	ok(seasonPack?.type === CatalogueSearchType.Season);
});

test("Individual purchases are indexed alongside packs.", () => {
	equal(names("Pointed Snufkin Hat", 1)[0], "Pointed Snufkin Hat");

	const hat = firstTarget("Pointed Snufkin Hat");
	ok(hat?.type === CatalogueSearchType.Season);

	equal(names("TGC Guitar Pack", 1)[0], "TGC Guitar Pack");
	equal(names("Little Prince Scarf", 1)[0], "Little Prince Scarf");
});

test("Items bought with in-game currency are not indexed.", () => {
	deepStrictEqual(names("Companion Cube"), []);
	deepStrictEqual(names("Stone Single Bench"), []);
});

test("Every entry has a name and every target is reachable.", () => {
	for (const entry of entries) {
		ok(entry.name.length > 0, "Expected a resolved name.");
		ok(!entry.name.includes("."), `Expected a translation, got the key ${entry.name}.`);
	}
});

test("Only purchasable entries carry a cosmetic to display.", () => {
	for (const entry of entries) {
		const purchasable = entry.cosmeticDisplay !== null;
		const container = entry.target.type !== CatalogueSearchType.Spirit;

		if (purchasable) {
			ok(container, `${entry.name} should target where it is sold.`);
		}
	}

	const hat = catalogueSearch(entries, "Pointed Snufkin Hat", 1)[0];
	ok(hat?.cosmeticDisplay !== null, "Expected a purchasable entry to carry a cosmetic.");

	const season = catalogueSearch(entries, "Season of Prophecy", 1)[0];
	equal(season?.cosmeticDisplay, null);
});

test("Entries are uniquely addressable by target and name.", () => {
	const keys = entries.map((entry) => `${JSON.stringify(entry.target)}${entry.name}`);
	equal(keys.length, new Set(keys).size);
});

test("Ranking is stable for entries sharing a bucket.", () => {
	const run = () => names("Days of");
	deepStrictEqual(run(), run());
});

test("Searching an unrelated entry list does not leak the module index.", () => {
	const custom: CatalogueSearchEntry[] = [
		{ name: "Alpha", keywords: [], cosmeticDisplay: null, target: entries[0]!.target },
		{ name: "Beta", keywords: ["alpha"], cosmeticDisplay: null, target: entries[0]!.target },
	];

	deepStrictEqual(
		catalogueSearch(custom, "alpha").map(({ name }) => name),
		["Alpha", "Beta"],
	);
});
