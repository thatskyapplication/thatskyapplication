import { deepEqual } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { treasureCandles } from "../source/kingdom.js";
import { CDN_URL } from "../source/routes.js";

const EXPECTED_ROTATIONS = [
	{
		date: skyDate(2026, 3, 13),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
] as const;

for (const { date, expected } of EXPECTED_ROTATIONS) {
	test(`Treasure candles rotation on ${date.toISODate()}`, () => {
		deepEqual(treasureCandles(date), expected);
	});
}
