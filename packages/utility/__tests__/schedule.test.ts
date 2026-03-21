import { equal } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { nextNestingWorkshop } from "../source/schedule.js";

const EXPECTED_NEXT_NESTING_WORKSHOPS = [
	{
		date: skyDate(2026, 3, 16),
		expected: skyDate(2026, 3, 20),
	},
	{
		date: skyDate(2026, 3, 19),
		expected: skyDate(2026, 3, 20),
	},
	{
		date: skyDate(2026, 3, 20),
		expected: skyDate(2026, 3, 27),
	},
	{
		date: skyDate(2026, 3, 21),
		expected: skyDate(2026, 3, 27),
	},
] as const;

for (const { date, expected } of EXPECTED_NEXT_NESTING_WORKSHOPS) {
	test(`Next nesting workshop reset from ${date.toISODate()}.`, () => {
		equal(nextNestingWorkshop(date).toISODate(), expected.toISODate());
	});
}
