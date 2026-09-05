import { deepStrictEqual, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import DearVanGogh from "../source/kingdom/seasons/dear-van-gogh/index.js";
import { SEASONS } from "../source/kingdom/seasons/index.js";
import Lightmending from "../source/kingdom/seasons/lightmending/index.js";

const DEAR_VAN_GOGH_SEASONAL_CANDLES_ROTATIONS = [
	{
		date: skyDate(2026, 7, 17),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 7, 18),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 7, 19),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 7, 20),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/1.webp",
	},
	{
		date: skyDate(2026, 7, 21),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/1.webp",
	},
	{
		date: skyDate(2026, 7, 22),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/1.webp",
	},
	{
		date: skyDate(2026, 7, 23),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/1.webp",
	},
	{
		date: skyDate(2026, 7, 24),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/1.webp",
	},
	{
		date: skyDate(2026, 7, 25),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/2.webp",
	},
	{
		date: skyDate(2026, 7, 26),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/2.webp",
	},
	{
		date: skyDate(2026, 7, 27),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 7, 28),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 7, 29),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 7, 30),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/1.webp",
	},
	{
		date: skyDate(2026, 7, 31),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/1.webp",
	},
	{
		date: skyDate(2026, 8, 1),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 8, 2),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 8, 3),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 8, 4),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/2.webp",
	},
	{
		date: skyDate(2026, 8, 5),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/2.webp",
	},
	{
		date: skyDate(2026, 8, 6),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/1.webp",
	},
	{
		date: skyDate(2026, 8, 7),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/1.webp",
	},
	{
		date: skyDate(2026, 8, 8),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/1.webp",
	},
	{
		date: skyDate(2026, 8, 9),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/1.webp",
	},
	{
		date: skyDate(2026, 8, 10),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/1.webp",
	},
	{
		date: skyDate(2026, 8, 11),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 8, 12),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 8, 13),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 8, 14),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/2.webp",
	},
	{
		date: skyDate(2026, 8, 15),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/2.webp",
	},
	{
		date: skyDate(2026, 8, 16),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/1.webp",
	},
	{
		date: skyDate(2026, 8, 17),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/1.webp",
	},
	{
		date: skyDate(2026, 8, 18),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/1.webp",
	},
	{
		date: skyDate(2026, 8, 19),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/1.webp",
	},
	{
		date: skyDate(2026, 8, 20),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/1.webp",
	},
	{
		date: skyDate(2026, 8, 21),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 8, 22),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 8, 23),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 8, 24),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/2.webp",
	},
	{
		date: skyDate(2026, 8, 25),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/2.webp",
	},
	{
		date: skyDate(2026, 8, 26),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/1.webp",
	},
	{
		date: skyDate(2026, 8, 27),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/1.webp",
	},
	{
		date: skyDate(2026, 8, 28),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/1.webp",
	},
	{
		date: skyDate(2026, 8, 29),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/1.webp",
	},
	{
		date: skyDate(2026, 8, 30),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/1.webp",
	},
	{
		date: skyDate(2026, 8, 31),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
	{
		date: skyDate(2026, 9, 1),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/hidden_forest/2.webp",
	},
	{
		date: skyDate(2026, 9, 2),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/valley_of_triumph/2.webp",
	},
	{
		date: skyDate(2026, 9, 3),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/golden_wasteland/2.webp",
	},
	{
		date: skyDate(2026, 9, 4),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/vault_of_knowledge/2.webp",
	},
	{
		date: skyDate(2026, 9, 5),
		expected:
			"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/29/daylight_prairie/2.webp",
	},
] as const;

test("Dear Van Gogh seasonal candles rotations.", async (t) => {
	for (const { date, expected } of DEAR_VAN_GOGH_SEASONAL_CANDLES_ROTATIONS) {
		await t.test(date.toPlainDate().toString(), () =>
			deepStrictEqual(DearVanGogh.seasonalCandles(date), expected),
		);
	}
});

test("Remaining seasonal candles on the first day of the season.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 1, 16)), {
		seasonalCandlesLeft: 399,
		seasonalCandlesLeftWithSeasonPass: 476,
	});
});

test("Remaining seasonal candles on the day before double seasonal light.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 2, 26)), {
		seasonalCandlesLeft: 194,
		seasonalCandlesLeftWithSeasonPass: 230,
	});
});

test("Remaining seasonal candles on the first day of double seasonal.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 2, 27)), {
		seasonalCandlesLeft: 189,
		seasonalCandlesLeftWithSeasonPass: 224,
	});
});

test("Remaining seasonal candles on the last day of double seasonal light.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 3, 12)), {
		seasonalCandlesLeft: 111,
		seasonalCandlesLeftWithSeasonPass: 133,
	});
});

test("Remaining seasonal candles on the day after double seasonal light.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 3, 13)), {
		seasonalCandlesLeft: 105,
		seasonalCandlesLeftWithSeasonPass: 126,
	});
});

test("Remaining seasonal candles on the last day of the season.", () => {
	deepStrictEqual(Lightmending.remainingSeasonalCandles(skyDate(2026, 4, 2)), {
		seasonalCandlesLeft: 5,
		seasonalCandlesLeftWithSeasonPass: 6,
	});
});

test("Double seasonal light windows are positive, chronological and within their season.", () => {
	for (const season of SEASONS.values()) {
		const windows = season.doubleSeasonalLight ?? [];

		for (const [index, window] of windows.entries()) {
			ok(
				Temporal.ZonedDateTime.compare(window.start, window.end) < 0,
				`Expected double seasonal light window ${index} of season ${season.id} to end after it starts.`,
			);

			ok(
				Temporal.ZonedDateTime.compare(window.start, season.start) >= 0 &&
					Temporal.ZonedDateTime.compare(window.end, season.end) <= 0,
				`Expected double seasonal light window ${index} of season ${season.id} to be within the season.`,
			);

			const next = windows[index + 1];

			if (next) {
				ok(
					Temporal.ZonedDateTime.compare(window.end, next.start) <= 0,
					`Expected double seasonal light window ${index} of season ${season.id} to end before the next one starts.`,
				);
			}
		}
	}
});
