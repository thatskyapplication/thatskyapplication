import { deepEqual } from "node:assert/strict";
import { test } from "node:test";
import { checklistResetPayload } from "../source/checklist.js";
import { skyDate } from "../source/dates.js";

const DAILY_RESET = {
	daily_quests: false,
	do_not_disturb: false,
	lightmending: false,
	seasonal_candles: false,
	shard_eruptions: false,
	event_tickets: false,
} as const;

function date(year: number, month: number, day: number, hour = 0, minute = 0) {
	return new Date(skyDate(year, month, day, hour, minute).epochMilliseconds);
}

test("Checklist daily tasks reset at midnight Pacific Time.", () => {
	const now = date(2026, 8, 18);
	const payload = checklistResetPayload(date(2026, 8, 17, 23, 59), now);

	deepEqual(payload, { last_updated_at: now, ...DAILY_RESET });
});

test("Dye Workshop and Nesting Workshop reset on Friday at midnight Pacific Time.", () => {
	const now = date(2026, 8, 21);
	const payload = checklistResetPayload(date(2026, 8, 20, 23, 59), now);

	deepEqual(payload, {
		last_updated_at: now,
		...DAILY_RESET,
		dye_workshop: false,
		nesting_workshop: false,
	});
});

test("Dye Workshop and Nesting Workshop do not reset again after the Friday boundary.", () => {
	const now = date(2026, 8, 21, 12);
	const payload = checklistResetPayload(date(2026, 8, 21), now);

	deepEqual(payload, { last_updated_at: now });
});

test("Eye of Eden still resets on Sunday at midnight Pacific Time.", () => {
	const now = date(2026, 8, 23);
	const payload = checklistResetPayload(date(2026, 8, 22, 23, 59), now);

	deepEqual(payload, { last_updated_at: now, ...DAILY_RESET, eye_of_eden: false });
});
