import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import Lightmending from "../source/kingdom/seasons/lightmending/index.js";

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
