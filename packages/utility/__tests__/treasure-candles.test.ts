import { deepEqual } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { treasureCandles } from "../source/kingdom/treasure-candles.js";
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
	{
		date: skyDate(2026, 3, 24),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 25),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 26),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 27),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 28),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 29),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 30),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 3, 31),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 1),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 2),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 3),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 4),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 5),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 6),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 7),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 8),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 9),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 10),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 11),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 12),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 13),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 14),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 15),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 16),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 17),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 18),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 19),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 20),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 4, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 1),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 2),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 3),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 4),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 5),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 6),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 7),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 8),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 9),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 10),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 11),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 12),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 13),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 14),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 15),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 16),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 17),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 18),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 19),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 20),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 5, 31),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 1),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 2),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 9),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 10),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 11),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 12),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 13),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 14),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 15),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 16),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 17),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 18),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 6, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 21),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 23),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 24),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 25),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 26),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 27),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
] as const;

test("Treasure candles rotations.", async (t) => {
	for (const { date, expected } of EXPECTED_ROTATIONS) {
		await t.test(date.toPlainDate().toString(), () => deepEqual(treasureCandles(date), expected));
	}
});
