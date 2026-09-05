import { deepEqual, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import {
	treasureCandles,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
} from "../source/kingdom/treasure-candles.js";
import { CDN_URL } from "../source/routes.js";

const EXPECTED_ROTATIONS = [
	{
		date: skyDate(2025, 1, 1),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 2),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 3),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 4),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 5),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 6),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 7),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 8),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 9),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 10),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 11),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 12),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 13),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 14),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 15),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 16),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 17),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 18),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 19),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 20),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 1, 31),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 1),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 2),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 9),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 10),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 11),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 12),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 13),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 14),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 15),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 16),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 17),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 18),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 19),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 20),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 21),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 22),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 23),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 24),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 25),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 26),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 27),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 2, 28),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 1),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 2),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 3),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 4),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 5),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 6),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 7),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 8),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 9),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 10),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 11),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 12),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 13),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 14),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 15),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 16),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 17),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 18),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 21),
		// Abnormally, all three were available.
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 23),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 3, 24),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 25),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 26),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 27),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 28),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 29),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 30),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 3, 31),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 1),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 2),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 3),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 4),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 5),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 6),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 7),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 8),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 9),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 10),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 11),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 12),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 13),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 14),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 15),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 16),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 17),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 18),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 4, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 4, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 1),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 2),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 3),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 4),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 5),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 6),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 7),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 8),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 9),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 10),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 11),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 12),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 13),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 14),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 15),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 16),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 17),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 18),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 19),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 20),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 5, 31),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 1),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 2),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 9),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 10),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 11),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 12),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 13),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 14),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 15),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 16),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 17),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 18),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 21),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 6, 23),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 24),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 25),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 26),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 27),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 28),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 29),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 6, 30),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 1),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 2),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 9),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 10),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 11),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 12),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 13),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 14),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 15),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 16),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 17),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 18),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 19),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 20),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 21),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 22),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 23),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 24),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 25),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 26),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 27),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 28),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 29),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 30),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 7, 31),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 1),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 2),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 3),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 4),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 5),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 6),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 7),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 8),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 9),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 10),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 11),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 12),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 13),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 14),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 15),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 16),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 17),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 18),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 8, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 21),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 23),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 24),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 25),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 26),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 27),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 28),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 29),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 30),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 8, 31),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 1),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 2),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 3),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 4),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 5),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 6),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 7),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 8),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 9),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 10),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 11),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 12),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 13),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 14),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 15),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 16),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 17),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 18),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 19),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 20),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 21),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 23),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 24),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 25),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 26),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 27),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 28),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 9, 29),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 9, 30),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 1),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 2),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 3),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 4),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 5),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 6),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 7),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 8),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 9),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 10),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 11),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 12),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 13),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 14),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 15),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 16),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 17),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 18),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 19),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 20),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 21),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 22),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 23),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 24),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 25),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 26),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 27),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 28),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 29),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 30),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 10, 31),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 1),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 2),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 3),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 4),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 5),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 6),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 7),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 8),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 9),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 10),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 11),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 12),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 13),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 14),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 15),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 16),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 11, 17),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 18),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 19),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 20),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 21),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 22),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 23),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 24),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 25),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 26),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 27),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 28),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 29),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 11, 30),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2025, 12, 1),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 2),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 3),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 4),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 5),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 6),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 7),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 8),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 9),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 10),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 11),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 12),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 13),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 14),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 15),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 16),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 17),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 18),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 19),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 20),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 21),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 22),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 23),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 24),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 25),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 26),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 27),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 28),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 29),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 30),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2025, 12, 31),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 1),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 2),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 3),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 4),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 5),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 6),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 7),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 8),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 9),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 10),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 11),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 12),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 13),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 14),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 15),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 1, 16),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 17),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 18),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 19),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 20),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 21),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 22),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 23),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 24),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 25),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 26),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 27),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 28),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 29),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 30),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 1, 31),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 1),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 2),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 9),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 10),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 11),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 12),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 13),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 14),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 15),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 16),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 17),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 18),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 19),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 20),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 21),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 22),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 23),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 24),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 25),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 26),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 2, 27),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 2, 28),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 1),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 2),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 3),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 4),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 5),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 6),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 7),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 8),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 9),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 10),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 11),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 3, 12),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
		],
	},
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
	{
		date: skyDate(2026, 6, 28),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 29),
		expected: [
			String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 6, 30),
		expected: [
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 7, 1),
		expected: [
			String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 7, 2),
		expected: [
			String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 7, 3),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 4),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 5),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 6),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 7),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 8),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 9),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 10),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 11),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 12),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 13),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 14),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 15),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 16),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 17),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 18),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 19),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 20),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 21),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 22),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 23),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 24),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 25),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 26),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 27),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 28),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 29),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 30),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 7, 31),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 1),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 2),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 3),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 4),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 5),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 6),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 7),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 8),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 9),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 10),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 11),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 12),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 13),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 14),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 15),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 16),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 17),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 18),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 19),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 20),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 21),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 22),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 23),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 24),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 25),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 26),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 27),
		expected: [String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 28),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/3.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 29),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 30),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 8, 31),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 9, 1),
		expected: [
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/2.webp", CDN_URL)),
			String(new URL("daily_guides/treasure_candles/valley_of_triumph/1.webp", CDN_URL)),
		],
	},
	{
		date: skyDate(2026, 9, 2),
		expected: [String(new URL("daily_guides/treasure_candles/golden_wasteland/2.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 9, 3),
		expected: [String(new URL("daily_guides/treasure_candles/vault_of_knowledge/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 9, 4),
		expected: [String(new URL("daily_guides/treasure_candles/daylight_prairie/1.webp", CDN_URL))],
	},
	{
		date: skyDate(2026, 9, 5),
		expected: [String(new URL("daily_guides/treasure_candles/hidden_forest/2.webp", CDN_URL))],
	},
] as const;

test("Treasure candles rotations.", async (t) => {
	for (const { date, expected } of EXPECTED_ROTATIONS) {
		await t.test(date.toPlainDate().toString(), () => deepEqual(treasureCandles(date), expected));
	}
});

test("Double treasure candle configurations are positive and chronological.", () => {
	for (const [index, configuration] of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.entries()) {
		ok(
			Temporal.ZonedDateTime.compare(configuration.start, configuration.end) < 0,
			`Expected double treasure candle configuration ${index} to end after it starts.`,
		);

		const next = TREASURE_CANDLES_DOUBLE_CONFIGURATIONS[index + 1];

		if (next) {
			ok(
				Temporal.ZonedDateTime.compare(configuration.end, next.start) <= 0,
				`Expected double treasure candle configuration ${index} to end before the next one starts.`,
			);
		}
	}
});
