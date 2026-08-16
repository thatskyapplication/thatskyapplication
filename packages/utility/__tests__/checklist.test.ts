import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";
import { checklistResetPayload } from "../source/checklist.js";
import { skyDate } from "../source/dates.js";

function date(year: number, month: number, day: number, hour = 0, minute = 0) {
	return new Date(skyDate(year, month, day, hour, minute).epochMilliseconds);
}

test("Checklist daily tasks reset at midnight Pacific Time.", () => {
	const now = date(2026, 8, 18);
	const payload = checklistResetPayload(date(2026, 8, 17, 23, 59), now);

	deepStrictEqual(payload, {
		last_updated_at: now,
		daily_quests: false,
		do_not_disturb: false,
		seasonal_candles: false,
		shard_eruptions: false,
		event_tickets: false,
	});
});

test("Dye Workshop resets on Friday at midnight Pacific Time.", () => {
	const payload = checklistResetPayload(date(2026, 8, 20, 23, 59), date(2026, 8, 21));

	equal(payload.dye_workshop, false);
	equal(payload.eye_of_eden, undefined);
});

test("Dye Workshop does not reset again after the Friday boundary.", () => {
	const now = date(2026, 8, 21, 12);
	const payload = checklistResetPayload(date(2026, 8, 21), now);

	deepStrictEqual(payload, { last_updated_at: now });
});

test("Eye of Eden still resets on Sunday at midnight Pacific Time.", () => {
	const payload = checklistResetPayload(date(2026, 8, 22, 23, 59), date(2026, 8, 23));

	equal(payload.eye_of_eden, false);
	equal(payload.dye_workshop, undefined);
});
