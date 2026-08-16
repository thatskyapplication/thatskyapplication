import { deepStrictEqual, equal, notEqual, ok } from "node:assert/strict";
import { test } from "node:test";
import {
	CatalogueCollection,
	type CatalogueSearchEntry,
	catalogueSearch,
	catalogueSearchEntries,
	CatalogueSearchType,
	type CatalogueSpiritSearchEntry,
} from "../source/catalogue.js";
import { skyDate } from "../source/dates.js";
import { skySeasons } from "../source/kingdom/seasons/index.js";
import { spirits } from "../source/kingdom/spirits.js";
import enGB from "../source/locales/en-gb.js";
import { SpiritKind } from "../source/models/spirits.js";
import { SeasonId } from "../source/season.js";
import { SpiritId, spiritNotReturnedTranslationKey } from "../source/utility/spirits.js";

function resolveName(key: string) {
	let current: unknown = enGB.general;

	for (const part of key.split(".")) {
		current = (current as Record<string, unknown>)[part];
	}

	return typeof current === "string" ? current : key;
}

const entries = catalogueSearchEntries(resolveName, { groupEventFamilies: true });

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
	deepStrictEqual(names("  season of prophecy  ", 1), ["Season of Prophecy"]);
	deepStrictEqual(names("SEASON OF PROPHECY", 1), ["Season of Prophecy"]);
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

test("Spirits are searchable by their expressions.", () => {
	for (const [query, expectedSpiritIds] of [
		["Clap", [SpiritId.ApplaudingBellmaker]],
		["Wise Stance", [SpiritId.WiseGrandparent]],
		["Nightbird Call", [SpiritId.NightbirdWhisperer]],
		["Whisper", [SpiritId.LightmendingLightCatcher, SpiritId.LightmendingLightScholar]],
	] as const) {
		const results = catalogueSearch(entries, query).filter(
			(entry): entry is CatalogueSpiritSearchEntry =>
				entry.target.type === CatalogueSearchType.Spirit,
		);
		const spiritIds = results.map(({ target }) => target.spirit.id);

		for (const spiritId of expectedSpiritIds) {
			ok(spiritIds.includes(spiritId), `Expected spirit ${spiritId} to match ${query}.`);
		}
	}
});

test("Non-spirit seasons expose the correct spirit kinds.", () => {
	const seasons = skySeasons();
	const shattering = seasons.get(SeasonId.Shattering)!;
	const nesting = seasons.get(SeasonId.Nesting)!;
	const revival = seasons.get(SeasonId.Revival)!;

	for (const spirit of shattering.spiritsWithGuide.values()) {
		equal(spirit.kind, SpiritKind.Entity);
	}

	for (const spirit of nesting.spirits.values()) {
		equal(spirit.kind, SpiritKind.Entity);
	}

	equal(nesting.guide.kind, SpiritKind.Spirit);

	for (const spirit of revival.spirits.values()) {
		equal(spirit.kind, SpiritKind.Mannequin);
	}
});

test("Not-returned spirit copy follows the spirit's kind.", () => {
	const collection = spirits();
	const beforeReturns = skyDate(2019, 1, 1);
	const afterReturns = skyDate(2030, 1, 1);
	const entity = collection.get(SpiritId.AncientLight1)!;
	const nestingEntity = collection.get(SpiritId.NestingSolarium)!;
	const mannequin = collection.get(SpiritId.EchoOfAnAbandonedRefuge)!;
	const seasonalSpirit = collection.get(SpiritId.SassyDrifter)!;
	const guide = collection.get(SpiritId.NestingGuide)!;

	equal(spiritNotReturnedTranslationKey(entity, beforeReturns), "spirits.kind-not-yet-returned.1");
	equal(
		spiritNotReturnedTranslationKey(nestingEntity, beforeReturns),
		"spirits.kind-not-yet-returned.1",
	);
	equal(
		spiritNotReturnedTranslationKey(mannequin, beforeReturns),
		"spirits.kind-not-yet-returned.2",
	);
	equal(
		spiritNotReturnedTranslationKey(seasonalSpirit, beforeReturns),
		"spirits.kind-not-yet-returned.0",
	);
	equal(spiritNotReturnedTranslationKey(seasonalSpirit, afterReturns), null);
	equal(spiritNotReturnedTranslationKey(guide, beforeReturns), null);
});

function assertNewestFirst(starts: readonly Temporal.ZonedDateTime[], subject: string) {
	ok(starts.length > 1, `Expected several ${subject} to match.`);

	for (let index = 1; index < starts.length; index++) {
		ok(
			Temporal.ZonedDateTime.compare(starts[index]!, starts[index - 1]!) <= 0,
			`Expected ${subject} to be indexed newest first.`,
		);
	}
}

test("Seasons are indexed newest first.", () => {
	const starts: Temporal.ZonedDateTime[] = [];

	for (const { target } of catalogueSearch(entries, "Season of")) {
		if (target.type === CatalogueSearchType.Season) {
			starts.push(target.season.start);
		}
	}

	assertNewestFirst(starts, "seasons");
});

test("Events are indexed newest first.", () => {
	const starts: Temporal.ZonedDateTime[] = [];

	for (const { target } of catalogueSearch(entries, "Days of")) {
		if (target.type === CatalogueSearchType.Event) {
			starts.push(target.event.start);
		}
	}

	assertNewestFirst(starts, "events");
});

test("An event name yields one entry for all of its years.", () => {
	deepStrictEqual(names("Days of Sunlight"), ["Days of Sunlight"]);
});

test("A renamed event surfaces each of its names against the same family.", () => {
	const current = firstTarget("Days of Fortune");
	ok(current?.type === CatalogueSearchType.EventFamily);

	const previous = firstTarget("Lunar New Year");
	ok(previous?.type === CatalogueSearchType.EventFamily);

	equal(current.occurrences[0].family, previous.occurrences[0].family);
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

test("Every entry resolves to a translated name.", () => {
	for (const entry of entries) {
		ok(entry.name.length > 0, "Expected a resolved name.");
		ok(!entry.name.includes("."), `Expected a translation, got the key ${entry.name}.`);
	}
});

test("Only purchasable entries carry a cosmetic to display.", () => {
	const [hat] = catalogueSearch(entries, "Pointed Snufkin Hat", 1);
	ok(hat, "Expected the purchasable entry to be indexed.");
	notEqual(hat.cosmeticDisplay, null);

	const [season] = catalogueSearch(entries, "Season of Prophecy", 1);
	ok(season, "Expected the season entry to be indexed.");
	equal(season.cosmeticDisplay, null);

	const [spirit] = catalogueSearch(entries, "Nightbird Whisperer", 1);
	ok(spirit, "Expected the spirit entry to be indexed.");
	equal(spirit.cosmeticDisplay, null);

	const purchasable = entries.filter(({ cosmeticDisplay }) => cosmeticDisplay !== null);
	ok(purchasable.length > 100, "Expected the index to carry many purchasable entries.");
});

test("Entries are uniquely addressable by target and name.", () => {
	const keys = entries.map((entry) => `${JSON.stringify(entry.target)}${entry.name}`);
	equal(keys.length, new Set(keys).size);
});

test("Entries sharing a bucket keep their index order.", () => {
	const query = "Days of";

	const prefixMatches = entries.filter(({ name }) =>
		name.toUpperCase().startsWith(query.toUpperCase()),
	);

	const ranked = catalogueSearch(entries, query).filter(({ name }) =>
		name.toUpperCase().startsWith(query.toUpperCase()),
	);

	ok(prefixMatches.length > 1, "Expected several prefix matches.");
	deepStrictEqual(ranked, prefixMatches);
});

test("An exact match outranks a keyword match on a caller-supplied list.", () => {
	const custom: CatalogueSearchEntry[] = [
		{ name: "Alpha", keywords: [], cosmeticDisplay: null, target: entries[0]!.target },
		{ name: "Beta", keywords: ["alpha"], cosmeticDisplay: null, target: entries[0]!.target },
	];

	deepStrictEqual(
		catalogueSearch(custom, "alpha").map(({ name }) => name),
		["Alpha", "Beta"],
	);
});
