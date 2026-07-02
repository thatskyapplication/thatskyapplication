import { equal } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	dreamsSkaterSchedule,
	grandmaSchedule,
	internationalSpaceStationSchedule,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	nineColouredDeerSchedule,
	pollutedGeyserSchedule,
	projectorOfMemoriesSchedule,
	turtleSchedule,
	vaultEldersBlessingSchedule,
} from "../source/schedule.js";

const zoned = (isoWithOffset: string) => Temporal.ZonedDateTime.from(isoWithOffset);

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
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 20),
				start: "2025-06-15T10:20:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:21:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "skips the spring forward gap",
				input: skyDate(2025, 3, 9, 1, 50),
				start: "2025-03-09T03:00:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T03:01:00-07:00[America/Los_Angeles]",
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
				label: "active on a normal day",
				input: skyDate(2025, 6, 15, 10, 0),
				start: "2025-06-15T09:20:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T10:38:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active mid-cycle on a normal day",
				input: skyDate(2025, 6, 15, 13, 20),
				start: "2025-06-15T13:20:00-07:00[America/Los_Angeles]",
				end: "2025-06-15T14:38:00-07:00[America/Los_Angeles]",
				active: true,
			},
			{
				label: "active at the boundary after the spring forward",
				input: skyDate(2025, 3, 9, 4, 0),
				start: "2025-03-09T04:00:00-07:00[America/Los_Angeles]",
				end: "2025-03-09T05:18:00-07:00[America/Los_Angeles]",
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
			equal(result.start.toString(), start);
			equal(result.end.toString(), end);
			equal(result.active, active);
		});
	}
}

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
			equal(schedule(input).toString(), expected);
		});
	}
}

const EXPECTED_NEXT_NESTING_WORKSHOPS = [
	{ date: skyDate(2026, 3, 16), expected: skyDate(2026, 3, 20) },
	{ date: skyDate(2026, 3, 19), expected: skyDate(2026, 3, 20) },
	{ date: skyDate(2026, 3, 20), expected: skyDate(2026, 3, 27) },
	{ date: skyDate(2026, 3, 21), expected: skyDate(2026, 3, 27) },
	{ date: skyDate(2025, 11, 1), expected: skyDate(2025, 11, 7) },
] as const;

for (const { date, expected } of EXPECTED_NEXT_NESTING_WORKSHOPS) {
	test(`Next nesting workshop reset from ${date.toPlainDate().toString()}.`, () => {
		equal(nextNestingWorkshop(date).toPlainDate().toString(), expected.toPlainDate().toString());
	});
}

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
