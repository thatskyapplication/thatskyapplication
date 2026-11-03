import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import {
	clampPlainDate,
	daysLeftUntil,
	daysUntil,
	parsePlainDate,
	skyDate,
} from "../source/dates.js";

test("Days left counts the whole days after the current one.", () => {
	const end = skyDate(2026, 11, 10);

	equal(daysLeftUntil(end, skyDate(2026, 11, 9)), 0);
	equal(daysLeftUntil(end, skyDate(2026, 11, 9, 12)), 0);
	equal(daysLeftUntil(end, skyDate(2026, 11, 7)), 2);
});

test("Days until counts a daylight saving change as whole days.", () => {
	equal(daysUntil(skyDate(2026, 11, 2), skyDate(2026, 10, 31)), 2);
	equal(daysUntil(skyDate(2026, 3, 9), skyDate(2026, 3, 7)), 2);
});

test("Days until does not throw in the repeated hour of a daylight saving change.", () => {
	const from = Temporal.ZonedDateTime.from("2026-11-01T01:53-07:00[America/Los_Angeles]");
	const date = Temporal.ZonedDateTime.from("2026-11-01T01:00-08:00[America/Los_Angeles]");

	ok(daysUntil(date, from) < 0);
});

test("A YYYY-MM-DD date parses.", () => {
	equal(parsePlainDate("2026-09-29")?.toString(), "2026-09-29");
});

test("Anything other than a valid YYYY-MM-DD date does not parse.", () => {
	for (const value of [
		null,
		undefined,
		"",
		"today",
		"2026-9-29",
		"20260929",
		"+002026-09-29",
		"2026-09-29T00:00",
		"2026-09-29[u-ca=japanese]",
		"2026-02-30",
	]) {
		equal(parsePlainDate(value), null, `Expected ${JSON.stringify(value)} not to parse.`);
	}
});

test("Dates clamp to the range.", () => {
	const minimum = Temporal.PlainDate.from("2026-01-01");
	const maximum = Temporal.PlainDate.from("2026-12-31");

	for (const [date, expected] of [
		["2025-12-31", "2026-01-01"],
		["2026-06-15", "2026-06-15"],
		["2027-01-01", "2026-12-31"],
	] as const) {
		equal(
			clampPlainDate(Temporal.PlainDate.from(date), minimum, maximum).toString(),
			expected,
			`Expected ${date} to clamp to ${expected}.`,
		);
	}
});
