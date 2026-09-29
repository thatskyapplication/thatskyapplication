import { deepEqual } from "node:assert/strict";
import { test } from "node:test";
import { visibleDaysCountItems } from "../source/daily-guides.js";
import { skyDate } from "../source/dates.js";

test("Days count items start within 90 Sky days, active ones first.", () => {
	const today = skyDate(2026, 11, 1);

	const daysCount = [
		{ key: "day 91", start: skyDate(2027, 1, 31) },
		{ key: "day 90 in UTC", start: Temporal.ZonedDateTime.from("2027-01-31T05:00:00+00:00[UTC]") },
		{ key: "tomorrow", start: skyDate(2026, 11, 2) },
		{ key: "active", start: skyDate(2026, 10, 1), end: skyDate(2026, 12, 1) },
	];

	deepEqual(
		visibleDaysCountItems(daysCount, today).map(({ key }) => key),
		["active", "tomorrow", "day 90 in UTC"],
	);
});
