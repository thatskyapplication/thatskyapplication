import { deepEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { AreaName, RealmName } from "../source/kingdom/geography.js";
import { shardEruption } from "../source/shard-eruption.js";

const EXPECTED_SHARD_ERUPTIONS = [
	{
		reason: "Spring forward skips the first shard eruption.",
		date: skyDate(2025, 3, 9, 12),
		expected: {
			realm: RealmName.GoldenWasteland,
			area: AreaName.CrabFields,
			strong: true,
			reward: 2.5,
			timestamps: [
				{ start: skyDate(2025, 3, 9, 8, 28, 40), end: skyDate(2025, 3, 9, 12, 20) },
				{ start: skyDate(2025, 3, 9, 14, 28, 40), end: skyDate(2025, 3, 9, 18, 20) },
			],
		},
	},
	{
		reason: "Regular day after the spring forward.",
		date: skyDate(2025, 3, 11, 12),
		expected: {
			realm: RealmName.DaylightPrairie,
			area: AreaName.SanctuaryIslands,
			strong: true,
			reward: 3.5,
			timestamps: [
				{ start: skyDate(2025, 3, 11, 3, 38, 40), end: skyDate(2025, 3, 11, 7, 30) },
				{ start: skyDate(2025, 3, 11, 9, 38, 40), end: skyDate(2025, 3, 11, 13, 30) },
				{ start: skyDate(2025, 3, 11, 15, 38, 40), end: skyDate(2025, 3, 11, 19, 30) },
			],
		},
	},
	{
		reason: "No shard eruption on the fall back.",
		date: skyDate(2025, 11, 2, 12),
		expected: null,
	},
	{
		reason: "No shard eruption on the spring forward.",
		date: skyDate(2026, 3, 8, 12),
		expected: null,
	},
	{
		reason: "Fall back realigns shard eruptions to the wall clock.",
		date: skyDate(2026, 11, 1, 12),
		expected: {
			realm: RealmName.DaylightPrairie,
			area: AreaName.PrairieCave,
			strong: true,
			reward: 2,
			timestamps: [
				{ start: skyDate(2026, 11, 1, 7, 48, 40), end: skyDate(2026, 11, 1, 11, 40) },
				{ start: skyDate(2026, 11, 1, 13, 48, 40), end: skyDate(2026, 11, 1, 17, 40) },
				{ start: skyDate(2026, 11, 1, 19, 48, 40), end: skyDate(2026, 11, 1, 23, 40) },
			],
		},
	},
	{
		reason: "No shard eruption on the spring forward.",
		date: skyDate(2027, 3, 14, 12),
		expected: null,
	},
	{
		reason: "Fall back realigns shard eruptions to the wall clock.",
		date: skyDate(2027, 11, 7, 12),
		expected: {
			realm: RealmName.HiddenForest,
			area: AreaName.SacredPond,
			strong: true,
			reward: 2.5,
			timestamps: [
				{ start: skyDate(2027, 11, 7, 7, 48, 40), end: skyDate(2027, 11, 7, 11, 40) },
				{ start: skyDate(2027, 11, 7, 13, 48, 40), end: skyDate(2027, 11, 7, 17, 40) },
				{ start: skyDate(2027, 11, 7, 19, 48, 40), end: skyDate(2027, 11, 7, 23, 40) },
			],
		},
	},
	{
		reason: "Spring forward realigns shard eruptions without a skip.",
		date: skyDate(2029, 3, 11, 12),
		expected: {
			realm: RealmName.DaylightPrairie,
			area: AreaName.SanctuaryIslands,
			strong: true,
			reward: 3.5,
			timestamps: [
				{ start: skyDate(2029, 3, 11, 3, 38, 40), end: skyDate(2029, 3, 11, 7, 30) },
				{ start: skyDate(2029, 3, 11, 9, 38, 40), end: skyDate(2029, 3, 11, 13, 30) },
				{ start: skyDate(2029, 3, 11, 15, 38, 40), end: skyDate(2029, 3, 11, 19, 30) },
			],
		},
	},
	{
		reason: "Spring forward skips the first shard eruption.",
		date: skyDate(2031, 3, 9, 12),
		expected: {
			realm: RealmName.GoldenWasteland,
			area: AreaName.CrabFields,
			strong: true,
			reward: 2.5,
			timestamps: [
				{ start: skyDate(2031, 3, 9, 8, 28, 40), end: skyDate(2031, 3, 9, 12, 20) },
				{ start: skyDate(2031, 3, 9, 14, 28, 40), end: skyDate(2031, 3, 9, 18, 20) },
			],
		},
	},
] as const;

function comparable(shard: ReturnType<typeof shardEruption>) {
	return (
		shard && {
			realm: shard.realm,
			area: shard.area,
			strong: shard.strong,
			reward: shard.reward,
			timestamps: shard.timestamps.map(({ start, end }) => ({
				start: start.toString(),
				end: end.toString(),
			})),
		}
	);
}

for (const { reason, date, expected } of EXPECTED_SHARD_ERUPTIONS) {
	test(`${reason} on ${date.toPlainDate().toString()}.`, () => {
		const shard = shardEruption(date);

		if (expected === null) {
			equal(shard, null);
			return;
		}

		deepEqual(comparable(shard), {
			realm: expected.realm,
			area: expected.area,
			strong: expected.strong,
			reward: expected.reward,
			timestamps: expected.timestamps.map(({ start, end }) => ({
				start: start.toString(),
				end: end.toString(),
			})),
		});
	});
}

test("Shard eruption exceptions.", async (t) => {
	for (const date of [
		skyDate(2024, 2, 15),
		skyDate(2024, 2, 25),
		skyDate(2025, 2, 15),
		skyDate(2025, 3, 29),
	]) {
		await t.test(date.toPlainDate().toString(), () => equal(shardEruption(date), null));
	}
});

test("The input instant is normalised to the Sky calendar day.", () => {
	const skyDateTime = skyDate(2026, 11, 1, 22);
	const utcDateTime = skyDateTime.withTimeZone("UTC");
	deepEqual(comparable(shardEruption(utcDateTime)), comparable(shardEruption(skyDateTime)));
});
