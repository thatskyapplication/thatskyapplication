import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { realmForArea } from "../source/kingdom/areas/index.js";
import { KINGDOM } from "../source/kingdom/index.js";
import { SEASONS } from "../source/kingdom/seasons/index.js";
import type { SpiritIds } from "../source/utility/spirits.js";

const UNKNOWN_SPIRIT_ID = -1 as SpiritIds;

const ALL_SPIRITS = [
	...KINGDOM.standardSpirits.values(),
	...KINGDOM.elderSpirits.values(),
	...[...SEASONS.values()].flatMap((season) => [...season.spiritsWithGuide.values()]),
] as const;

test("displayFriendshipTree follows each spirit kind's rule.", () => {
	for (const spirit of ALL_SPIRITS) {
		if (spirit.isSeasonalSpirit()) {
			equal(
				spirit.displayFriendshipTree,
				spirit.current.length > 0 ? spirit.current : spirit.seasonal,
			);
		} else {
			equal(spirit.displayFriendshipTree, spirit.current);
		}
	}
});

test("Standard spirits derive their realm from their area.", () => {
	for (const spirit of KINGDOM.standardSpirits.values()) {
		equal(spirit.realm, realmForArea(spirit.area));
	}
});

test("Each elder is the registered elder of its realm.", () => {
	for (const elder of KINGDOM.elderSpirits.values()) {
		const realm = KINGDOM.realms.get(elder.realm);
		ok(realm);
		equal(realm.elder?.id, elder.id);
	}
});

test("Each realm's roster matches the standard spirits that resolve to it.", () => {
	for (const realm of KINGDOM.realms.values()) {
		const derived = [...KINGDOM.standardSpirits.values()].filter(
			(spirit) => spirit.realm === realm.name,
		);

		equal(realm.spirits.size, derived.length);

		for (const spirit of derived) {
			ok(realm.spirits.has(spirit.id));
		}
	}
});

test("groupFor returns the collection a spirit belongs to, or null.", () => {
	const standard = [...KINGDOM.standardSpirits.values()][0]!;
	equal(KINGDOM.groupFor(standard.id), KINGDOM.realms.get(standard.realm)!.spirits);

	const elder = [...KINGDOM.elderSpirits.values()][0]!;
	equal(KINGDOM.groupFor(elder.id), KINGDOM.elderSpirits);

	const season = [...SEASONS.values()].find((season) => season.spirits.size > 0)!;
	equal(KINGDOM.groupFor(season.guide.id), season.spiritsWithGuide);

	const seasonal = [...season.spirits.values()][0]!;
	equal(KINGDOM.groupFor(seasonal.id), season.spiritsWithGuide);

	equal(KINGDOM.groupFor(UNKNOWN_SPIRIT_ID), null);
});

test("adjacentSpirits walks a group and clamps at both ends.", () => {
	const realm = [...KINGDOM.realms.values()].find((realm) => realm.spirits.size >= 3)!;
	const members = [...realm.spirits.values()];
	const lastIndex = members.length - 1;

	equal(KINGDOM.adjacentSpirits(members[0]!.id).previous, null);
	equal(KINGDOM.adjacentSpirits(members[0]!.id).next, members[1]);

	equal(KINGDOM.adjacentSpirits(members[1]!.id).previous, members[0]);
	equal(KINGDOM.adjacentSpirits(members[1]!.id).next, members[2]);

	equal(KINGDOM.adjacentSpirits(members[lastIndex]!.id).previous, members[lastIndex - 1]);
	equal(KINGDOM.adjacentSpirits(members[lastIndex]!.id).next, null);

	equal(KINGDOM.adjacentSpirits(UNKNOWN_SPIRIT_ID).previous, null);
	equal(KINGDOM.adjacentSpirits(UNKNOWN_SPIRIT_ID).next, null);

	const season = [...SEASONS.values()].find((season) => season.spirits.size > 0)!;
	equal(KINGDOM.adjacentSpirits(season.guide.id).previous, null);
	equal(KINGDOM.adjacentSpirits(season.guide.id).next, [...season.spirits.values()][0]);
});

test("seasonOf resolves seasonal and guide spirits to their season, others to null.", () => {
	const season = [...SEASONS.values()].find((season) => season.spirits.size > 0)!;
	equal(KINGDOM.seasonOf(season.guide.id), season);
	equal(KINGDOM.seasonOf([...season.spirits.values()][0]!.id), season);

	equal(KINGDOM.seasonOf([...KINGDOM.standardSpirits.values()][0]!.id), null);
	equal(KINGDOM.seasonOf([...KINGDOM.elderSpirits.values()][0]!.id), null);
	equal(KINGDOM.seasonOf(UNKNOWN_SPIRIT_ID), null);
});
