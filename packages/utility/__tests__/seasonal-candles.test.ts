import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import DearVanGogh from "../source/kingdom/seasons/dear-van-gogh/index.js";
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
