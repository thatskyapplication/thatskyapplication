import { deepStrictEqual, equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { RETURNING_DATES } from "../source/kingdom/seasons/index.js";
import {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	dreamsSkaterSchedule,
	grandmaSchedule,
	internationalSpaceStationDates,
	internationalSpaceStationSchedule,
	isInternationalSpaceStationDate,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	nineColouredDeerSchedule,
	pollutedGeyserSchedule,
	projectorOfMemoriesSchedule,
	returningSpiritsSchedule,
	shardEruptionSchedule,
	turtleSchedule,
	vaultEldersBlessingSchedule,
} from "../source/schedule.js";
import type { ReturningSpiritVisit } from "../source/types/index.js";

const zoned = (isoWithOffset: string) => Temporal.ZonedDateTime.from(isoWithOffset);

function assertReturningSpiritsSchedule(
	actual: ReturnType<typeof returningSpiritsSchedule>,
	expected: ReturningSpiritVisit,
	active: boolean,
) {
	ok(actual);
	equal(Temporal.ZonedDateTime.compare(actual.start, expected.start), 0);
	equal(Temporal.ZonedDateTime.compare(actual.end, expected.end), 0);
	equal(actual.type, expected.type);
	deepStrictEqual(actual.spiritIds, expected.spiritIds);
	equal(actual.active, active);
}

test("Returning spirits schedule follows every visit's boundaries.", () => {
	const firstVisit = RETURNING_DATES.first();
	ok(firstVisit);
	assertReturningSpiritsSchedule(
		returningSpiritsSchedule(firstVisit.start.subtract({ nanoseconds: 1 })),
		firstVisit,
		false,
	);

	for (const [visitNumber, visit] of RETURNING_DATES) {
		assertReturningSpiritsSchedule(returningSpiritsSchedule(visit.start), visit, true);
		assertReturningSpiritsSchedule(
			returningSpiritsSchedule(visit.end.subtract({ nanoseconds: 1 })),
			visit,
			true,
		);

		const nextVisit = RETURNING_DATES.get(visitNumber + 1);

		if (nextVisit) {
			assertReturningSpiritsSchedule(
				returningSpiritsSchedule(visit.end),
				nextVisit,
				Temporal.ZonedDateTime.compare(visit.end, nextVisit.start) === 0,
			);
		} else {
			equal(returningSpiritsSchedule(visit.end), null);
		}
	}
});

test("International Space Station dates follow the historical rotations.", async (t) => {
	const cases = [
		{
			label: "before the Secret Area's introduction",
			input: skyDate(2019, 8, 1),
			expected: [],
		},
		{
			label: "during the Secret Area's introduction month",
			input: skyDate(2019, 9, 1),
			expected: ["2019-09-27"],
		},
		{
			label: "during the original rotation",
			input: skyDate(2023, 5, 1),
			expected: ["2023-05-06", "2023-05-13", "2023-05-20", "2023-05-27"],
		},
		{
			label: "from June 2023 onwards",
			input: skyDate(2023, 6, 1),
			expected: ["2023-06-06", "2023-06-14", "2023-06-22", "2023-06-30"],
		},
		{
			label: "when the 30th is outside the month",
			input: skyDate(2024, 2, 1),
			expected: ["2024-02-06", "2024-02-14", "2024-02-22"],
		},
	] as const;

	for (const { label, input, expected } of cases) {
		await t.test(label, () => {
			deepStrictEqual(
				internationalSpaceStationDates(input).map((date) => date.toPlainDate().toString()),
				expected,
			);
		});
	}
});

test("International Space Station dates are recognised across historical boundaries.", () => {
	equal(isInternationalSpaceStationDate(skyDate(2019, 9, 20)), false);
	equal(isInternationalSpaceStationDate(skyDate(2019, 9, 27)), true);
	equal(isInternationalSpaceStationDate(skyDate(2023, 5, 13)), true);
	equal(isInternationalSpaceStationDate(skyDate(2023, 5, 14)), false);
	equal(isInternationalSpaceStationDate(skyDate(2023, 6, 13)), false);
	equal(isInternationalSpaceStationDate(skyDate(2023, 6, 14)), true);
});

const SCHEDULES = [
	{
		name: "Polluted geyser",
		schedule: pollutedGeyserSchedule,
		cases: [
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 8),
				start: "2025-06-15T10:05:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:15:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "upcoming from an odd hour",
				input: skyDate(2025, 6, 15, 11, 30),
				start: "2025-06-15T12:05:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T12:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 30),
				start: "2025-03-09T03:05:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: skyDate(2025, 11, 2, 0, 30),
				start: "2025-11-02T02:05:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T02:15:00-08:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "Grandma",
		schedule: grandmaSchedule,
		cases: [
			{
				label: "available from its release",
				input: skyDate(2021, 11, 18, 12, 33, 3),
				start: "2021-11-18T12:35:00-08:00[America/Los_Angeles]",
				end: "2021-11-18T12:45:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 40),
				start: "2025-06-15T10:35:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:45:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "upcoming from an odd hour",
				input: skyDate(2025, 6, 15, 11, 30),
				start: "2025-06-15T12:35:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T12:45:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 50),
				start: "2025-03-09T03:35:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:45:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: skyDate(2025, 11, 2, 0, 50),
				start: "2025-11-02T02:35:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T02:45:00-08:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "Turtle",
		schedule: turtleSchedule,
		cases: [
			{
				label: "available from Days of Nature 2022",
				input: skyDate(2022, 4, 18),
				start: "2022-04-18T00:50:00-07:00[America/Los_Angeles]",
				end: "2022-04-18T01:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 52),
				start: "2025-06-15T10:50:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T11:00:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "upcoming from an odd hour",
				input: skyDate(2025, 6, 15, 11, 30),
				start: "2025-06-15T12:50:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T13:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 10),
				start: "2025-03-09T03:50:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T04:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: zoned("2025-11-02T01:10:00-07:00[America/Los_Angeles]"),
				start: "2025-11-02T02:50:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T03:00:00-08:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "AURORA",
		schedule: auroraSchedule,
		cases: [
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 20),
				start: "2025-06-15T10:10:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:58:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "upcoming from an odd hour",
				input: skyDate(2025, 6, 15, 11, 30),
				start: "2025-06-15T12:10:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T12:58:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 30),
				start: "2025-03-09T03:10:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:58:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: zoned("2025-11-02T01:30:00-07:00[America/Los_Angeles]"),
				start: "2025-11-02T02:10:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T02:58:00-08:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "Nine-coloured deer",
		schedule: nineColouredDeerSchedule,
		cases: [
			{
				label: "active from the season's last quest",
				input: skyDate(2024, 3, 11),
				start: "2024-03-11T00:00:00-07:00[America/Los_Angeles]",
				end: "2024-03-11T00:20:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 35),
				start: "2025-06-15T10:30:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:50:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 55),
				start: "2025-03-09T03:00:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:20:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps the later offset during the repeated fall-back hour",
				input: zoned("2025-11-02T01:30:00-08:00[America/Los_Angeles]"),
				start: "2025-11-02T01:30:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T01:50:00-08:00[America/Los_Angeles]",
				active: true,
			},
		],
	},
	{
		name: "Vault elder's blessing",
		schedule: vaultEldersBlessingSchedule,
		cases: [
			{
				label: "available from its introduction",
				input: skyDate(2025, 8, 28, 12, 10),
				start: "2025-08-28T12:20:00-07:00[America/Los_Angeles]",
				end: "2025-08-28T12:21:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 9, 15, 10, 20),
				start: "2025-09-15T10:20:00-07:00[America/Los_Angeles]",
				end: "2025-09-15T10:21:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2026, 3, 8, 1, 50),
				start: "2026-03-08T03:00:00-07:00[America/Los_Angeles]",
				end: "2026-03-08T03:01:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: skyDate(2025, 11, 2, 0, 50),
				start: "2025-11-02T01:00:00-07:00[America/Los_Angeles]",
				end: "2025-11-02T01:01:00-07:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "Projector of memories",
		schedule: projectorOfMemoriesSchedule,
		cases: [
			{
				label: "active from its introduction",
				input: skyDate(2025, 9, 6),
				start: "2025-09-06T00:00:00-07:00[America/Los_Angeles]",
				end: "2025-09-06T01:18:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 9, 15, 10, 0),
				start: "2025-09-15T09:20:00-07:00[America/Los_Angeles]",
				end: "2025-09-15T10:38:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active mid-cycle on a normal day",
				input: skyDate(2025, 9, 15, 13, 20),
				start: "2025-09-15T13:20:00-07:00[America/Los_Angeles]",
				end: "2025-09-15T14:38:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active at the boundary after the spring forward",
				input: skyDate(2026, 3, 8, 4, 0),
				start: "2026-03-08T04:00:00-07:00[America/Los_Angeles]",
				end: "2026-03-08T05:18:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "keeps wall-clock time in the fall-back afternoon",
				input: skyDate(2025, 11, 2, 15, 0),
				start: "2025-11-02T14:40:00-08:00[America/Los_Angeles]",
				end: "2025-11-02T15:58:00-08:00[America/Los_Angeles]",
				active: true,
			},
		],
	},
	{
		name: "Dreams skater",
		schedule: dreamsSkaterSchedule,
		cases: [
			{
				label: "from its introduction points at the first recurring Friday",
				input: skyDate(2022, 12, 19),
				start: "2022-12-23T01:00:00-08:00[America/Los_Angeles]",
				end: "2022-12-23T01:15:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "on a weekday points at the next Friday",
				input: skyDate(2025, 6, 11, 12, 0),
				start: "2025-06-13T01:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-13T01:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a weekend",
				input: skyDate(2025, 6, 13, 13, 10),
				start: "2025-06-13T13:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-13T13:15:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "wraps Sunday's last event to the next Friday",
				input: skyDate(2025, 6, 15, 23, 30),
				start: "2025-06-20T01:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-20T01:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 30),
				start: "2025-03-09T03:00:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "keeps wall-clock time across the fall back",
				input: skyDate(2025, 11, 2, 0, 10),
				start: "2025-11-02T01:00:00-07:00[America/Los_Angeles]",
				end: "2025-11-02T01:15:00-07:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
	{
		name: "Aviary's firework festival",
		schedule: aviarysFireworkFestivalSchedule,
		cases: [
			{
				label: "active on the finale's first show",
				input: skyDate(2023, 12, 12),
				start: "2023-12-12T00:00:00-08:00[America/Los_Angeles]",
				end: "2023-12-12T00:10:00-08:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "rolls into the next day during the finale",
				input: skyDate(2023, 12, 14, 22),
				start: "2023-12-15T00:00:00-08:00[America/Los_Angeles]",
				end: "2023-12-15T00:10:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on the finale's last show",
				input: skyDate(2023, 12, 17, 20, 5),
				start: "2023-12-17T20:00:00-08:00[America/Los_Angeles]",
				end: "2023-12-17T20:10:00-08:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "waits for the monthly rotation once the finale is over",
				input: skyDate(2023, 12, 17, 20, 10),
				start: "2024-01-01T00:00:00-08:00[America/Los_Angeles]",
				end: "2024-01-01T00:10:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips a day that is not the first of the month",
				input: skyDate(2024, 1, 2),
				start: "2024-02-01T00:00:00-08:00[America/Los_Angeles]",
				end: "2024-02-01T00:10:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "leaves the first of the month once its last show is over",
				input: skyDate(2025, 6, 1, 20, 10),
				start: "2025-07-01T00:00:00-07:00[America/Los_Angeles]",
				end: "2025-07-01T00:10:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on the first of the month",
				input: skyDate(2025, 6, 1, 12, 5),
				start: "2025-06-01T12:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-01T12:10:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "upcoming on the first of the month",
				input: skyDate(2025, 6, 1, 9, 0),
				start: "2025-06-01T12:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-01T12:10:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a fall-back first of the month",
				input: skyDate(2026, 11, 1, 0, 5),
				start: "2026-11-01T00:00:00-07:00[America/Los_Angeles]",
				end: "2026-11-01T00:10:00-07:00[America/Los_Angeles]",
				active: true,
			},
		],
	},
	{
		name: "International Space Station",
		schedule: internationalSpaceStationSchedule,
		cases: [
			{
				label: "from the Secret Area's introduction",
				input: skyDate(2019, 9, 22),
				start: "2019-09-27T00:00:00-07:00[America/Los_Angeles]",
				end: "2019-09-28T00:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "uses the original rotation before June 2023",
				input: skyDate(2023, 5, 20, 12, 0),
				start: "2023-05-20T00:00:00-07:00[America/Los_Angeles]",
				end: "2023-05-21T00:00:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "uses the current rotation from June 2023",
				input: skyDate(2023, 6, 20, 12, 0),
				start: "2023-06-22T00:00:00-07:00[America/Los_Angeles]",
				end: "2023-06-23T00:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the invalid 30th in a non-leap February",
				input: skyDate(2025, 2, 23, 12, 0),
				start: "2025-03-06T00:00:00-08:00[America/Los_Angeles]",
				end: "2025-03-07T00:00:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "skips the invalid 30th in a leap February",
				input: skyDate(2024, 2, 23, 12, 0),
				start: "2024-03-06T00:00:00-08:00[America/Los_Angeles]",
				end: "2024-03-07T00:00:00-08:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "upcoming on a normal day",
				input: skyDate(2025, 6, 10, 12, 0),
				start: "2025-06-14T00:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T00:00:00-07:00[America/Los_Angeles]",
				active: false,
			},
			{
				label: "active on a normal day",
				input: skyDate(2025, 6, 14, 12, 0),
				start: "2025-06-14T00:00:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T00:00:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "targets a standard-time date across the fall back",
				input: skyDate(2025, 11, 1, 12, 0),
				start: "2025-11-06T00:00:00-08:00[America/Los_Angeles]",
				end: "2025-11-07T00:00:00-08:00[America/Los_Angeles]",
				active: false,
			},
		],
	},
] as const;

for (const { name, schedule, cases } of SCHEDULES) {
	for (const { label, input, start, end, active } of cases) {
		test(`${name} ${label}.`, () => {
			const result = schedule(input);
			ok(result);
			equal(result.start.toString(), start);
			equal(result.end.toString(), end);
			equal(result.active, active);
		});
	}
}

test("Grandma schedule is unavailable before its release.", () => {
	equal(grandmaSchedule(skyDate(2017, 12, 19)), null);
	equal(grandmaSchedule(skyDate(2021, 11, 18, 12, 33, 2)), null);
});

test("Nine-coloured deer schedule is unavailable before the season's last quest.", () => {
	equal(nineColouredDeerSchedule(skyDate(2017, 12, 19)), null);
	equal(nineColouredDeerSchedule(skyDate(2024, 3, 10, 23, 59, 59)), null);
});

test("Turtle schedule is unavailable before Days of Nature 2022.", () => {
	equal(turtleSchedule(skyDate(2017, 12, 19)), null);
	equal(turtleSchedule(skyDate(2022, 4, 17, 23, 59, 59)), null);
});

test("Aviary's firework festival schedule is unavailable before the finale.", () => {
	equal(aviarysFireworkFestivalSchedule(skyDate(2017, 12, 19)), null);
	equal(aviarysFireworkFestivalSchedule(skyDate(2023, 12, 1)), null);
	equal(aviarysFireworkFestivalSchedule(skyDate(2023, 12, 11, 23, 59, 59)), null);
});

test("International Space Station schedule is unavailable before the Secret Area's introduction.", () => {
	equal(internationalSpaceStationSchedule(skyDate(2017, 12, 19)), null);
	equal(internationalSpaceStationSchedule(skyDate(2019, 9, 21, 23, 59, 59)), null);
});

test("Dreams skater schedule is unavailable before its introduction.", () => {
	equal(dreamsSkaterSchedule(skyDate(2017, 12, 19)), null);
	equal(dreamsSkaterSchedule(skyDate(2022, 12, 18, 23, 59, 59)), null);
});

test("Vault elder's blessing schedule is unavailable before its introduction.", () => {
	equal(vaultEldersBlessingSchedule(skyDate(2017, 12, 19)), null);
	equal(vaultEldersBlessingSchedule(skyDate(2025, 8, 28, 12, 9, 59)), null);
});

test("Projector of memories schedule is unavailable before its introduction.", () => {
	equal(projectorOfMemoriesSchedule(skyDate(2017, 12, 19)), null);
	equal(projectorOfMemoriesSchedule(skyDate(2025, 9, 5, 23, 59, 59)), null);
});

test("Shard eruption schedule finds an active eruption on the requested date.", () => {
	const result = shardEruptionSchedule(skyDate(2025, 3, 11, 10));
	ok(result);
	equal(result.start.toString(), "2025-03-11T09:38:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2025-03-11T13:30:00-07:00[America/Los_Angeles]");
	equal(result.active, true);
});

test("Shard eruption schedule searches forward from a requested day with no eruption.", () => {
	const result = shardEruptionSchedule(skyDate(2025, 3, 8, 12));
	ok(result);
	equal(result.start.toString(), "2025-03-09T08:28:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2025-03-09T12:20:00-07:00[America/Los_Angeles]");
	equal(result.active, false);
});

test("Shard eruption schedule traverses Sky calendar days across spring forward.", () => {
	const input = skyDate(2025, 3, 8, 23, 30).withTimeZone("UTC");
	const result = shardEruptionSchedule(input);
	ok(result);
	equal(result.start.toString(), "2025-03-09T08:28:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2025-03-09T12:20:00-07:00[America/Los_Angeles]");
	equal(result.active, false);
});

test("Shard eruption schedule includes an eruption from the previous Sky day after reset.", () => {
	const result = shardEruptionSchedule(skyDate(2022, 7, 15, 0, 30));
	equal(result.start.toString(), "2022-07-14T23:28:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2022-07-15T01:05:00-07:00[America/Los_Angeles]");
	equal(result.active, true);
});

test("Shard eruption schedule moves to the current Sky day after an overnight eruption ends.", () => {
	const result = shardEruptionSchedule(skyDate(2022, 7, 15, 1, 10));
	equal(result.start.toString(), "2022-07-15T01:14:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2022-07-15T02:06:00-07:00[America/Los_Angeles]");
	equal(result.active, false);
});

test("Shard eruption schedule does not search before the first eruption date.", () => {
	const result = shardEruptionSchedule(skyDate(2022, 7, 11));
	equal(result.start.toString(), "2022-07-11T01:30:00-07:00[America/Los_Angeles]");
	equal(result.active, false);
});

test("Shard eruption schedule moves from the old sequence to the predicted schedule.", () => {
	const result = shardEruptionSchedule(skyDate(2022, 9, 30, 23, 50));
	equal(result.start.toString(), "2022-10-01T07:48:40-07:00[America/Los_Angeles]");
	equal(result.end.toString(), "2022-10-01T11:40:00-07:00[America/Los_Angeles]");
	equal(result.active, false);
});

const NEXT_SCHEDULES = [
	{
		name: "Next daily reset",
		schedule: nextDailyReset,
		cases: [
			{
				label: "on a normal day",
				input: skyDate(2025, 6, 15, 10, 0),
				expected: "2025-06-16T00:00:00-07:00[America/Los_Angeles]",
			},
			{
				label: "into the spring forward day",
				input: skyDate(2025, 3, 8, 12, 0),
				expected: "2025-03-09T00:00:00-08:00[America/Los_Angeles]",
			},
			{
				label: "into the fall back day",
				input: skyDate(2025, 11, 1, 12, 0),
				expected: "2025-11-02T00:00:00-07:00[America/Los_Angeles]",
			},
		],
	},
	{
		name: "Next Eye of Eden",
		schedule: nextEyeOfEden,
		cases: [
			{
				label: "on a normal week",
				input: skyDate(2025, 6, 11, 10, 0),
				expected: "2025-06-15T00:00:00-07:00[America/Los_Angeles]",
			},
			{
				label: "into the spring forward week",
				input: skyDate(2025, 3, 5, 10, 0),
				expected: "2025-03-09T00:00:00-08:00[America/Los_Angeles]",
			},
		],
	},
	{
		name: "Next passage",
		schedule: nextPassage,
		cases: [
			{
				label: "reaches the Season of Passage's second quest from the moment before it",
				input: skyDate(2023, 4, 30, 23, 59, 59),
				expected: "2023-05-01T00:00:00-07:00[America/Los_Angeles]",
			},
			{
				label: "from the Season of Passage's second quest",
				input: skyDate(2023, 5, 1),
				expected: "2023-05-01T00:15:00-07:00[America/Los_Angeles]",
			},
			{
				label: "on a normal day",
				input: skyDate(2025, 6, 15, 10, 7),
				expected: "2025-06-15T10:15:00-07:00[America/Los_Angeles]",
			},
			{
				label: "across the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 50),
				expected: "2025-03-09T03:00:00-07:00[America/Los_Angeles]",
			},
			{
				label: "into the repeated fall-back hour",
				input: skyDate(2025, 11, 2, 0, 50),
				expected: "2025-11-02T01:00:00-07:00[America/Los_Angeles]",
			},
		],
	},
] as const;

for (const { name, schedule, cases } of NEXT_SCHEDULES) {
	for (const { label, input, expected } of cases) {
		test(`${name} ${label}.`, () => {
			const result = schedule(input);
			ok(result);
			equal(result.toString(), expected);
		});
	}
}

test("Next passage is unavailable before the Season of Passage's second quest.", () => {
	equal(nextPassage(skyDate(2017, 12, 19)), null);
	equal(nextPassage(skyDate(2023, 4, 30, 23, 44)), null);
});

const EXPECTED_NEXT_NESTING_WORKSHOPS = [
	{ date: skyDate(2024, 4, 14), expected: skyDate(2024, 4, 15) },
	{ date: skyDate(2024, 4, 15), expected: skyDate(2024, 4, 22) },
	{ date: skyDate(2025, 11, 1), expected: skyDate(2025, 11, 3) },
	{ date: skyDate(2026, 3, 1), expected: skyDate(2026, 3, 2) },
	{ date: skyDate(2026, 3, 2), expected: skyDate(2026, 3, 6) },
	{ date: skyDate(2026, 3, 5), expected: skyDate(2026, 3, 6) },
	{ date: skyDate(2026, 3, 6), expected: skyDate(2026, 3, 13) },
	{ date: skyDate(2026, 3, 16), expected: skyDate(2026, 3, 20) },
	{ date: skyDate(2026, 3, 19), expected: skyDate(2026, 3, 20) },
	{ date: skyDate(2026, 3, 20), expected: skyDate(2026, 3, 27) },
	{ date: skyDate(2026, 3, 21), expected: skyDate(2026, 3, 27) },
] as const;

for (const { date, expected } of EXPECTED_NEXT_NESTING_WORKSHOPS) {
	test(`Next nesting workshop reset from ${date.toPlainDate().toString()}.`, () => {
		const result = nextNestingWorkshop(date);
		ok(result);
		equal(result.toPlainDate().toString(), expected.toPlainDate().toString());
	});
}

test("Next nesting workshop is unavailable before the Season of Nesting.", () => {
	equal(nextNestingWorkshop(skyDate(2017, 12, 19)), null);
	equal(nextNestingWorkshop(skyDate(2024, 4, 7)), null);
});

test("Meteor shower active during a Days of Love window.", () => {
	const result = meteorShowerSchedule(skyDate(2026, 2, 14, 12, 40));
	equal(result?.start.toString(), "2026-02-14T12:35:00-08:00[America/Los_Angeles]");
	equal(result?.end.toString(), "2026-02-14T12:45:00-08:00[America/Los_Angeles]");
	equal(result?.active, true);
});

test("Meteor shower upcoming during a Days of Love window.", () => {
	const result = meteorShowerSchedule(skyDate(2026, 2, 14, 12, 30));
	equal(result?.start.toString(), "2026-02-14T12:35:00-08:00[America/Los_Angeles]");
	equal(result?.active, false);
});
