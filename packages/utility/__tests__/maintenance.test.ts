import { ok } from "node:assert/strict";
import { test } from "node:test";
import { MAINTENANCE_PERIODS } from "../source/maintenance.js";

test("Maintenance periods are positive and chronological.", () => {
	for (const [index, period] of MAINTENANCE_PERIODS.entries()) {
		ok(
			Temporal.ZonedDateTime.compare(period.start, period.end) < 0,
			`Expected maintenance period ${index} to end after it starts.`,
		);

		const next = MAINTENANCE_PERIODS[index + 1];

		if (next) {
			ok(
				Temporal.ZonedDateTime.compare(period.end, next.start) <= 0,
				`Expected maintenance period ${index} to end before the next one starts.`,
			);
		}
	}
});
