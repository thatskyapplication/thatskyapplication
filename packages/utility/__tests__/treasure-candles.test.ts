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
	{
		date: skyDate(2026, 3, 14),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 15),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 16),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 17),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 18),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 19),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 20),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 21),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 22),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 23),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
] as const;

for (const { date, expected } of EXPECTED_ROTATIONS) {
	test(`Treasure candles rotation on ${date.toISODate()}`, () => {
		deepEqual(treasureCandles(date), expected);
	});
}
