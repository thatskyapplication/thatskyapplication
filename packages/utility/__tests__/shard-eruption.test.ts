import { deepEqual, equal, ok, throws } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { AreaName, RealmName } from "../source/kingdom/geography.js";
import { CDN_URL } from "../source/routes.js";
import {
	SHARD_ERUPTION_PREDICTION_START_DATE,
	SHARD_ERUPTION_START_DATE,
	shardEruption,
} from "../source/shard-eruption.js";

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

test("Confirmed historical shard eruptions.", async (t) => {
	for (const { date, expected } of [
		{
			date: skyDate(2023, 1, 7),
			expected: {
				realm: RealmName.HiddenForest,
				area: AreaName.SacredPond,
				strong: true,
				reward: 2.5,
				timestamps: [
					{ start: skyDate(2023, 1, 7, 7, 48, 40), end: skyDate(2023, 1, 7, 11, 40) },
					{ start: skyDate(2023, 1, 7, 13, 48, 40), end: skyDate(2023, 1, 7, 17, 40) },
					{ start: skyDate(2023, 1, 7, 19, 48, 40), end: skyDate(2023, 1, 7, 23, 40) },
				],
			},
		},
		{ date: skyDate(2023, 1, 8), expected: null },
		{
			date: skyDate(2023, 1, 9),
			expected: {
				realm: RealmName.GoldenWasteland,
				area: AreaName.CrabFields,
				strong: true,
				reward: 2.5,
				timestamps: [
					{ start: skyDate(2023, 1, 9, 2, 28, 40), end: skyDate(2023, 1, 9, 6, 20) },
					{ start: skyDate(2023, 1, 9, 8, 28, 40), end: skyDate(2023, 1, 9, 12, 20) },
					{ start: skyDate(2023, 1, 9, 14, 28, 40), end: skyDate(2023, 1, 9, 18, 20) },
				],
			},
		},
	] as const) {
		await t.test(date.toPlainDate().toString(), () => {
			deepEqual(
				comparable(shardEruption(date)),
				expected && {
					realm: expected.realm,
					area: expected.area,
					strong: expected.strong,
					reward: expected.reward,
					timestamps: expected.timestamps.map(({ start, end }) => ({
						start: start.toString(),
						end: end.toString(),
					})),
				},
			);
		});
	}
});

test("Shard eruption exceptions.", async (t) => {
	for (const date of [
		skyDate(2024, 2, 15),
		skyDate(2024, 2, 25),
		skyDate(2025, 2, 15),
		skyDate(2025, 3, 29),
		skyDate(2026, 4, 11),
	]) {
		await t.test(date.toPlainDate().toString(), () => equal(shardEruption(date), null));
	}
});

test("Shard eruption relocations.", async (t) => {
	for (const { date, realm, area, reward } of [
		{
			date: skyDate(2025, 12, 13),
			realm: RealmName.DaylightPrairie,
			area: AreaName.PrairieCave,
			reward: 2,
		},
		{
			date: skyDate(2026, 2, 13),
			realm: RealmName.GoldenWasteland,
			area: AreaName.TheGraveyard,
			reward: 2,
		},
		{
			date: skyDate(2026, 2, 15),
			realm: RealmName.HiddenForest,
			area: AreaName.TheTreehouse,
			reward: 3.5,
		},
		{
			date: skyDate(2026, 3, 26),
			realm: RealmName.HiddenForest,
			area: AreaName.Boneyard,
			reward: 200,
		},
		{
			date: skyDate(2026, 3, 29),
			realm: RealmName.DaylightPrairie,
			area: AreaName.SanctuaryIslands,
			reward: 3.5,
		},
		{
			date: skyDate(2026, 8, 17),
			realm: RealmName.GoldenWasteland,
			area: AreaName.ForgottenArk,
			reward: 3.5,
		},
	] as const) {
		await t.test(date.toPlainDate().toString(), () => {
			const shard = shardEruption(date);
			ok(shard);
			deepEqual(
				{ realm: shard.realm, area: shard.area, reward: shard.reward },
				{ realm, area, reward },
			);
		});
	}
});

test("The input instant is normalised to the Sky calendar day.", () => {
	const skyDateTime = skyDate(2026, 11, 1, 22);
	const utcDateTime = skyDateTime.withTimeZone("UTC");
	deepEqual(comparable(shardEruption(utcDateTime)), comparable(shardEruption(skyDateTime)));
});

test("Shard eruption history begins on 11 July 2022 in the Sky time zone.", async (t) => {
	await t.test("The first day.", () => {
		equal(SHARD_ERUPTION_START_DATE.toPlainDate().toString(), "2022-07-11");
		equal(shardEruption(SHARD_ERUPTION_START_DATE)?.area, AreaName.ForgottenArk);
		equal(
			shardEruption(SHARD_ERUPTION_START_DATE.withTimeZone("Pacific/Honolulu"))?.area,
			AreaName.ForgottenArk,
		);
	});

	await t.test("An earlier Sky day is rejected.", () => {
		throws(
			() => shardEruption(skyDate(2022, 7, 10, 23, 59, 59)),
			new RangeError("Shard eruption dates cannot be before 2022-07-11."),
		);
	});

	await t.test("A foreign calendar date is interpreted as its Sky day.", () => {
		const utcDateTime = Temporal.ZonedDateTime.from("2022-07-11T00:00:00+00:00[UTC]");
		throws(
			() => shardEruption(utcDateTime),
			new RangeError("Shard eruption dates cannot be before 2022-07-11."),
		);
	});
});

test("Shard eruption predictions begin on 1 October 2022 in the Sky time zone.", async (t) => {
	await t.test("The preceding day.", () => {
		equal(SHARD_ERUPTION_PREDICTION_START_DATE.toPlainDate().toString(), "2022-10-01");
		equal(shardEruption(skyDate(2022, 9, 30, 23, 59, 59))?.area, AreaName.JellyfishCove);
	});

	await t.test("The first prediction day has a known result.", () => {
		equal(shardEruption(SHARD_ERUPTION_PREDICTION_START_DATE)?.area, AreaName.PrairieCave);
	});

	await t.test("A foreign calendar date is interpreted as its Sky day.", () => {
		const utcDateTime = Temporal.ZonedDateTime.from("2022-10-01T00:00:00+00:00[UTC]");
		equal(shardEruption(utcDateTime)?.area, AreaName.JellyfishCove);
		equal(
			shardEruption(SHARD_ERUPTION_PREDICTION_START_DATE.withTimeZone("Pacific/Honolulu"))?.area,
			AreaName.PrairieCave,
		);
	});
});

type RecordedShardEruptionExpectation = readonly [
	date: string,
	realm: RealmName,
	area: AreaName,
	reward: number,
	firstStart: readonly [hour: number, minute: number, second: number],
];

const EXPECTED_RECORDED_SHARD_ERUPTIONS = [
	// July 2022.
	["2022-07-11", RealmName.GoldenWasteland, AreaName.ForgottenArk, 3.5, [1, 30, 0]],
	["2022-07-12", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [1, 18, 40]],
	["2022-07-13", RealmName.DaylightPrairie, AreaName.PrairieCave, 2, [1, 14, 40]],
	["2022-07-14", RealmName.HiddenForest, AreaName.ForestBrook, 200, [1, 28, 40]],
	["2022-07-15", RealmName.ValleyOfTriumph, AreaName.VillageOfDreams, 2.5, [1, 14, 40]],
	["2022-07-16", RealmName.GoldenWasteland, AreaName.CrabFields, 2.5, [1, 5, 40]],
	["2022-07-17", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 52, 40]],
	["2022-07-18", RealmName.DaylightPrairie, AreaName.ButterflyFields, 200, [0, 57, 40]],
	["2022-07-19", RealmName.HiddenForest, AreaName.Boneyard, 2.5, [1, 3, 40]],
	["2022-07-20", RealmName.ValleyOfTriumph, AreaName.HermitValley, 3.5, [0, 52, 40]],
	["2022-07-21", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [1, 0, 40]],
	["2022-07-22", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [1, 3, 40]],
	["2022-07-23", RealmName.DaylightPrairie, AreaName.SanctuaryIslands, 3.5, [0, 52, 40]],
	["2022-07-24", RealmName.HiddenForest, AreaName.SacredPond, 2.5, [1, 5, 40]],
	["2022-07-25", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 57, 40]],
	["2022-07-26", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [1, 0, 40]],
	["2022-07-27", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 57, 40]],
	["2022-07-28", RealmName.DaylightPrairie, AreaName.TempleOfThePrairie, 200, [1, 0, 40]],
	["2022-07-29", RealmName.HiddenForest, AreaName.Boneyard, 2.5, [1, 3, 40]],
	["2022-07-30", RealmName.ValleyOfTriumph, AreaName.HermitValley, 3.5, [0, 52, 40]],
	["2022-07-31", RealmName.GoldenWasteland, AreaName.CrabFields, 2.5, [1, 5, 40]],

	// August 2022.
	["2022-08-01", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 55, 40]],
	["2022-08-02", RealmName.DaylightPrairie, AreaName.PrairieVillage, 200, [0, 41, 40]],
	["2022-08-03", RealmName.HiddenForest, AreaName.ForestCourtyard, 200, [0, 55, 40]],
	["2022-08-04", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 41, 40]],
	["2022-08-05", RealmName.GoldenWasteland, AreaName.TheGraveyard, 2, [0, 52, 40]],
	["2022-08-06", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 47, 40]],
	["2022-08-07", RealmName.DaylightPrairie, AreaName.BirdNest, 2.5, [0, 57, 40]],
	["2022-08-08", RealmName.HiddenForest, AreaName.ForestCourtyard, 200, [0, 55, 40]],
	["2022-08-09", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 41, 40]],
	["2022-08-10", RealmName.GoldenWasteland, AreaName.TheOuterBailey, 200, [0, 55, 40]],
	["2022-08-11", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 41, 40]],
	["2022-08-12", RealmName.DaylightPrairie, AreaName.PrairieCave, 2, [0, 52, 40]],
	["2022-08-13", RealmName.HiddenForest, AreaName.ElevatedClearing, 3.5, [0, 47, 40]],
	["2022-08-14", RealmName.ValleyOfTriumph, AreaName.VillageOfDreams, 2.5, [0, 57, 40]],
	["2022-08-15", RealmName.GoldenWasteland, AreaName.TheOuterBailey, 200, [0, 55, 40]],
	["2022-08-16", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 41, 40]],
	["2022-08-17", RealmName.DaylightPrairie, AreaName.ButterflyFields, 200, [0, 55, 40]],
	["2022-08-18", RealmName.HiddenForest, AreaName.Boneyard, 0, [0, 41, 40]],
	["2022-08-19", RealmName.ValleyOfTriumph, AreaName.VillageOfDreams, 2.5, [0, 52, 40]],
	["2022-08-20", RealmName.GoldenWasteland, AreaName.ForgottenArk, 3.5, [0, 47, 40]],
	["2022-08-21", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 57, 40]],
	["2022-08-22", RealmName.DaylightPrairie, AreaName.ButterflyFields, 200, [0, 55, 40]],
	["2022-08-23", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [0, 41, 40]],
	["2022-08-24", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 55, 40]],
	["2022-08-25", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [0, 41, 40]],
	["2022-08-26", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 52, 40]],
	["2022-08-27", RealmName.DaylightPrairie, AreaName.SanctuaryIslands, 3.5, [0, 47, 40]],
	["2022-08-28", RealmName.HiddenForest, AreaName.TheTreehouse, 3.5, [0, 57, 40]],
	["2022-08-29", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 55, 40]],
	["2022-08-30", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [0, 41, 40]],
	["2022-08-31", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 55, 40]],

	// September 2022.
	["2022-09-01", RealmName.DaylightPrairie, AreaName.TempleOfThePrairie, 200, [0, 58, 40]],
	["2022-09-02", RealmName.HiddenForest, AreaName.SacredPond, 2.5, [0, 44, 40]],
	["2022-09-03", RealmName.ValleyOfTriumph, AreaName.HermitValley, 3.5, [0, 59, 40]],
	["2022-09-04", RealmName.GoldenWasteland, AreaName.CrabFields, 2.5, [1, 4, 40]],
	["2022-09-05", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 59, 40]],
	["2022-09-06", RealmName.DaylightPrairie, AreaName.PrairieVillage, 200, [0, 58, 40]],
	["2022-09-07", RealmName.HiddenForest, AreaName.ForestBrook, 200, [0, 59, 40]],
	["2022-09-08", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 58, 40]],
	["2022-09-09", RealmName.GoldenWasteland, AreaName.TheGraveyard, 2, [0, 44, 40]],
	["2022-09-10", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 59, 40]],
	["2022-09-11", RealmName.DaylightPrairie, AreaName.BirdNest, 2.5, [1, 5, 40]],
	["2022-09-12", RealmName.HiddenForest, AreaName.ForestBrook, 200, [0, 59, 40]],
	["2022-09-13", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 58, 40]],
	["2022-09-14", RealmName.GoldenWasteland, AreaName.TheOuterBailey, 200, [0, 59, 40]],
	["2022-09-15", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 58, 40]],
	["2022-09-16", RealmName.DaylightPrairie, AreaName.PrairieCave, 2, [0, 44, 40]],
	["2022-09-17", RealmName.HiddenForest, AreaName.ElevatedClearing, 0, [0, 59, 40]],
	["2022-09-18", RealmName.ValleyOfTriumph, AreaName.VillageOfDreams, 2.5, [1, 5, 40]],
	["2022-09-19", RealmName.GoldenWasteland, AreaName.TheOuterBailey, 200, [0, 59, 40]],
	["2022-09-20", RealmName.VaultOfKnowledge, AreaName.StarlightDesert, 200, [0, 58, 40]],
	["2022-09-21", RealmName.DaylightPrairie, AreaName.ButterflyFields, 200, [0, 59, 40]],
	["2022-09-22", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 58, 40]],
	["2022-09-23", RealmName.ValleyOfTriumph, AreaName.VillageOfDreams, 2.5, [0, 44, 40]],
	["2022-09-24", RealmName.GoldenWasteland, AreaName.ForgottenArk, 3.5, [0, 59, 40]],
	["2022-09-25", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [1, 5, 40]],
	["2022-09-26", RealmName.DaylightPrairie, AreaName.ButterflyFields, 200, [0, 59, 40]],
	["2022-09-27", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [0, 58, 40]],
	["2022-09-28", RealmName.ValleyOfTriumph, AreaName.FrozenLake, 200, [0, 59, 40]],
	["2022-09-29", RealmName.GoldenWasteland, AreaName.TheBattlefield, 200, [0, 58, 40]],
	["2022-09-30", RealmName.VaultOfKnowledge, AreaName.JellyfishCove, 3.5, [0, 44, 40]],
] as const satisfies readonly RecordedShardEruptionExpectation[];

function recordedDate(date: string) {
	const [year, month, day] = date.split("-").map(Number) as [number, number, number];
	return skyDate(year, month, day);
}

test("Recorded shard eruptions.", async (t) => {
	await t.test("Every day from 11 July through 30 September 2022 is represented.", () => {
		equal(EXPECTED_RECORDED_SHARD_ERUPTIONS.length, 82);
		let date = skyDate(2022, 7, 11);

		for (const [expectedDate] of EXPECTED_RECORDED_SHARD_ERUPTIONS) {
			equal(expectedDate, date.toPlainDate().toString());
			ok(shardEruption(date));
			date = date.add({ days: 1 });
		}

		equal(date.toPlainDate().toString(), "2022-10-01");
	});

	await t.test("Scheduled landings from 12 July use the 40-second boundary.", () => {
		for (const [date] of EXPECTED_RECORDED_SHARD_ERUPTIONS.slice(1)) {
			const shard = shardEruption(recordedDate(date));
			ok(shard);

			for (const [index, { start }] of shard.timestamps.entries()) {
				equal(start.second, 40, `${date}, occurrence ${index + 1}`);
			}
		}
	});

	for (const [date, realm, area, reward, firstStart] of EXPECTED_RECORDED_SHARD_ERUPTIONS) {
		await t.test(date, () => {
			const shard = shardEruption(recordedDate(date));
			ok(shard);
			equal(shard.realm, realm);
			equal(shard.area, area);
			equal(shard.reward, reward);
			deepEqual(shard.infographic, {
				url: String(
					new URL(
						`daily_guides/shard_eruptions/${area.toLowerCase().replaceAll(" ", "_")}.webp`,
						CDN_URL,
					),
				),
				acknowledgement: "Clement",
			});
			equal(shard.timestamps.length, 12);

			const first = shard.timestamps[0]!;
			deepEqual([first.start.hour, first.start.minute, first.start.second], firstStart);
		});
	}
});

test("Recorded shard eruption type follows the historical weekday schedule.", async (t) => {
	await t.test("Friday through Sunday are strong.", () => {
		for (const [date] of EXPECTED_RECORDED_SHARD_ERUPTIONS) {
			const recorded = recordedDate(date);

			if (recorded.dayOfWeek >= 5) {
				equal(shardEruption(recorded)?.strong, true, date);
			}
		}
	});

	await t.test("Monday through Thursday are regular except for the launch-period dates.", () => {
		const extraStrongDates = new Set([
			"2022-07-11",
			"2022-07-12",
			"2022-07-13",
			"2022-07-19",
			"2022-07-20",
		]);
		const actualExtraStrongDates: string[] = [];

		for (const [date] of EXPECTED_RECORDED_SHARD_ERUPTIONS) {
			const recorded = recordedDate(date);

			if (recorded.dayOfWeek <= 4) {
				const strong = shardEruption(recorded)?.strong;
				equal(strong, extraStrongDates.has(date), date);

				if (strong) {
					actualExtraStrongDates.push(date);
				}
			}
		}

		deepEqual(actualExtraStrongDates, [...extraStrongDates]);
	});
});

test("Normal recorded shard eruptions recur every two hours for 51 minutes 20 seconds.", () => {
	for (const [date] of EXPECTED_RECORDED_SHARD_ERUPTIONS) {
		const shard = shardEruption(recordedDate(date));
		ok(shard);

		if (date !== "2022-07-15") {
			for (let index = 1; index < shard.timestamps.length; index++) {
				equal(
					shard.timestamps[index]!.start.epochMilliseconds -
						shard.timestamps[index - 1]!.start.epochMilliseconds,
					2 * 60 * 60 * 1_000,
					`${date}, occurrence ${index + 1}`,
				);
			}
		}

		if (date !== "2022-07-14") {
			for (const [index, { start, end }] of shard.timestamps.entries()) {
				equal(
					end.epochMilliseconds - start.epochMilliseconds,
					51 * 60 * 1_000 + 20 * 1_000,
					`${date}, occurrence ${index + 1}`,
				);
			}
		}
	}
});

test("Recorded shard eruption exceptions.", async (t) => {
	await t.test("14 July lasts 96 minutes 20 seconds.", () => {
		const shard = shardEruption(skyDate(2022, 7, 14));
		ok(shard);

		for (const { start, end } of shard.timestamps) {
			equal(end.epochMilliseconds - start.epochMilliseconds, 96 * 60 * 1_000 + 20 * 1_000);
		}

		equal(shard.timestamps[0]!.end.toPlainTime().toString(), "03:05:00");
	});

	await t.test("15 July uses the full schedule before and after the developer update.", () => {
		const shard = shardEruption(skyDate(2022, 7, 15));
		ok(shard);
		deepEqual(
			shard.timestamps.map(({ start, end }) => [
				start.toPlainTime().toString(),
				end.toPlainTime().toString(),
			]),
			[
				["01:14:40", "02:06:00"],
				["03:14:40", "04:06:00"],
				["05:14:40", "06:06:00"],
				["07:14:40", "08:06:00"],
				["09:14:40", "10:06:00"],
				["11:14:40", "12:06:00"],
				["13:14:40", "14:06:00"],
				["15:14:40", "16:06:00"],
				["17:03:40", "17:55:00"],
				["19:03:40", "19:55:00"],
				["21:03:40", "21:55:00"],
				["23:03:40", "23:55:00"],
			],
		);
	});

	await t.test("Developer-updated versions are canonical.", () => {
		for (const [date, realm, area] of [
			["2022-07-18", RealmName.DaylightPrairie, AreaName.ButterflyFields],
			["2022-08-18", RealmName.HiddenForest, AreaName.Boneyard],
			["2022-08-20", RealmName.GoldenWasteland, AreaName.ForgottenArk],
			["2022-08-23", RealmName.GoldenWasteland, AreaName.TheBattlefield],
			["2022-09-27", RealmName.GoldenWasteland, AreaName.TheBattlefield],
		] as const) {
			const shard = shardEruption(recordedDate(date));
			ok(shard);
			equal(shard.realm, realm, date);
			equal(shard.area, area, date);
		}
	});

	await t.test("Actual zero rewards retain their shard type.", () => {
		for (const [date, strong] of [
			["2022-08-18", false],
			["2022-09-17", true],
		] as const) {
			const shard = shardEruption(recordedDate(date));
			ok(shard);
			equal(shard.strong, strong, date);
			equal(shard.reward, 0, date);
		}
	});
});

test("Historical dates are normalised to the Sky time zone.", () => {
	const skyDateTime = skyDate(2022, 9, 30, 22);
	const utcDateTime = skyDateTime.withTimeZone("UTC");
	const skyShard = shardEruption(skyDateTime);
	const utcShard = shardEruption(utcDateTime);
	deepEqual(utcShard, skyShard);
});
