import { equal } from "node:assert/strict";
import { test } from "node:test";
import { clampPlainDate, parsePlainDate } from "../source/dates.js";

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
