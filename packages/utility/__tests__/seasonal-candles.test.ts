import { deepStrictEqual, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import BlueBird from "../source/kingdom/seasons/blue-bird/index.js";
import Carnival from "../source/kingdom/seasons/carnival/index.js";
import DearVanGogh from "../source/kingdom/seasons/dear-van-gogh/index.js";
import Duets from "../source/kingdom/seasons/duets/index.js";
import { SEASONS } from "../source/kingdom/seasons/index.js";
import Lightmending from "../source/kingdom/seasons/lightmending/index.js";
import Migration from "../source/kingdom/seasons/migration/index.js";
import Moments from "../source/kingdom/seasons/moments/index.js";
import Moomin from "../source/kingdom/seasons/moomin/index.js";
import Nesting from "../source/kingdom/seasons/nesting/index.js";
import NineColouredDeer from "../source/kingdom/seasons/nine-coloured-deer/index.js";
import Prophecy from "../source/kingdom/seasons/prophecy/index.js";
import Radiance from "../source/kingdom/seasons/radiance/index.js";
import Revival from "../source/kingdom/seasons/revival/index.js";
import TwoEmbersPart1 from "../source/kingdom/seasons/two-embers-part-1/index.js";

const SEASONAL_CANDLES_ROTATIONS = [
	{
		season: Moments,
		rotations: [
			{
				date: skyDate(2023, 7, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 7, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 7, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 7, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 7, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 7, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 7, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 7, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 7, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 7, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 7, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 7, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 7, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 7, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 7, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 8, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 8, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 8, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 8, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 8, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 8, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 8, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 8, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 8, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 8, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 8, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 8, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 8, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 8, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 8, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 8, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 8, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 8, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 8, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 8, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 8, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 8, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 8, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 8, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 8, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 8, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 8, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 8, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 8, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 8, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 8, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 9, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 9, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 9, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 9, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 9, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 9, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 9, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 9, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 9, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 9, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 9, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 9, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 9, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 9, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 9, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2023, 9, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2023, 9, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2023, 9, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2023, 9, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2023, 9, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2023, 9, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2023, 9, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2023, 9, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2023, 9, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2023, 9, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2023, 9, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2023, 9, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2023, 9, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2023, 9, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2023, 9, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2023, 10, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
		],
	},
	{
		season: Revival,
		rotations: [
			{
				date: skyDate(2023, 10, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 10, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 10, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 10, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 10, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 10, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 10, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 10, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 10, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 10, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 10, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 10, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 10, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 10, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 10, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 10, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 11, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 11, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 11, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 11, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 11, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 11, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 11, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 11, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 11, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 11, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 11, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 11, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 11, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 11, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 11, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 11, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 11, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 11, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 11, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 11, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2023, 11, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 11, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 11, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 11, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 12, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 12, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 12, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 12, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 12, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 12, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 12, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 12, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 12, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 12, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 12, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 12, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 12, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 12, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 12, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 12, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 12, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 12, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 12, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 12, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 12, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2023, 12, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2023, 12, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2023, 12, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2023, 12, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2023, 12, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2023, 12, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2023, 12, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2023, 12, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2023, 12, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2023, 12, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
		],
	},
	{
		season: NineColouredDeer,
		rotations: [
			{
				date: skyDate(2024, 1, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 1, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 1, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 1, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 1, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 1, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 1, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 1, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 1, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 1, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 1, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 1, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 1, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 1, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 1, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 1, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 1, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 2, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 2, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 2, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 2, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 2, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 2, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 2, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 2, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 2, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 2, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 2, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 2, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 2, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 2, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 2, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 2, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 2, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 2, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 2, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 2, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 2, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 2, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 2, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 2, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 2, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 2, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 2, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 2, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 2, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 3, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 3, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 3, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 3, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 3, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 3, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 3, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 3, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 3, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 3, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 3, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 3, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 3, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 3, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 3, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 3, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 3, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 3, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 3, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 3, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 3, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 3, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 3, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 3, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 3, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
		],
	},
	{
		season: Nesting,
		rotations: [
			{
				date: skyDate(2024, 4, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 4, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 4, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 4, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 4, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 4, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 4, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 4, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 4, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 4, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2024, 4, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2024, 4, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 4, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2024, 4, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2024, 4, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 4, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 5, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 5, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 5, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 5, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 5, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 5, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 5, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 5, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 5, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 5, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 5, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 5, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 5, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 5, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 5, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 5, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 5, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 5, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 5, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 5, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 5, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 5, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 5, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 5, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 5, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 5, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 5, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 5, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 5, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 5, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 5, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 6, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 6, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 6, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 6, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 6, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 6, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 6, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 6, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 6, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 6, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2024, 6, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 6, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 6, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 6, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 6, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 6, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 6, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 6, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 6, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 6, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 6, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 6, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 6, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 6, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
		],
	},
	{
		season: Duets,
		rotations: [
			{
				date: skyDate(2024, 7, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 7, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 7, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 7, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 7, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 7, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 7, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 7, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 7, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 7, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 7, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 7, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 7, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 7, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 7, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 7, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 7, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 8, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 8, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 8, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 8, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 8, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 8, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 8, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 8, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 8, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 8, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 8, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 8, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 8, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 8, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 8, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 8, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 8, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 8, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 8, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 8, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 8, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 8, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 8, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 8, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 8, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 8, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2024, 8, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 8, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 8, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 8, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2024, 8, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 9, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2024, 9, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2024, 9, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2024, 9, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2024, 9, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2024, 9, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2024, 9, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2024, 9, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2024, 9, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2024, 9, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
		],
	},
	{
		season: Moomin,
		rotations: [
			{
				date: skyDate(2024, 10, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 10, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 10, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 10, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 10, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 10, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 10, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 10, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 10, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 10, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 10, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 10, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 10, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 10, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 10, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 10, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 10, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 10, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 11, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 11, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 11, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 11, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 11, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 11, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 11, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 11, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 11, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 11, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 11, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 11, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 11, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 11, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 11, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 11, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 11, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 11, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 11, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 11, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 11, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 11, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 11, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 11, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 11, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 11, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 11, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 11, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 11, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2024, 11, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2024, 12, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2024, 12, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2024, 12, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 12, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 12, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 12, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 12, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 12, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 12, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2024, 12, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2024, 12, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2024, 12, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2024, 12, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2024, 12, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2024, 12, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2024, 12, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
		],
	},
	{
		season: Radiance,
		rotations: [
			{
				date: skyDate(2025, 1, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 1, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 1, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 1, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 1, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 1, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 1, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 1, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 1, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 1, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 1, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 1, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 2, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 2, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 2, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 2, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 2, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 2, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 2, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 2, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 2, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 2, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 2, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 2, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 2, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 2, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 2, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 2, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 2, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 2, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 2, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 2, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 2, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 2, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 2, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 2, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 2, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 2, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 2, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 2, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 3, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 3, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 3, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 3, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 3, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 3, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 3, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 3, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 3, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 3, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 3, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 3, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 3, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 3, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 3, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 3, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 3, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 3, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 3, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 3, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 3, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 3, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 3, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 3, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 3, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 4, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 4, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 4, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 4, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 4, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 4, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
		],
	},
	{
		season: BlueBird,
		rotations: [
			{
				date: skyDate(2025, 4, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 4, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 4, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 4, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 4, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 4, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 4, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 4, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 4, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 4, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 5, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 5, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 5, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 5, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 5, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 5, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 5, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 5, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 5, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 5, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 5, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 5, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 5, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 5, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 5, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 5, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 5, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 5, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 5, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 5, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 5, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 5, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 5, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 5, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 5, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 5, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 5, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 5, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 5, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 5, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 5, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 6, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 6, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 6, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 6, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 6, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 6, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 6, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 6, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 6, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 6, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 6, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 6, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 6, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 6, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 6, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 6, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 6, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 7, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 7, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 7, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 7, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 7, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 7, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
		],
	},
	{
		season: TwoEmbersPart1,
		rotations: [
			{
				date: skyDate(2025, 7, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 7, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 7, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 7, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 7, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 7, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 7, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 7, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 7, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 7, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 7, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 8, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 8, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 8, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 8, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 8, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 8, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 8, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 8, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 8, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 8, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 8, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 8, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 8, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 8, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 8, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 8, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 8, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 8, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 8, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2025, 8, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 9, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 9, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 9, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 9, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 9, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 9, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 9, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 9, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 9, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 9, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 9, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2025, 9, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 9, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2025, 9, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2025, 9, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2025, 9, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 9, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 9, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 9, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 9, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2025, 9, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2025, 9, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2025, 10, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2025, 10, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2025, 10, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2025, 10, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2025, 10, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
		],
	},
	{
		season: Migration,
		rotations: [
			{
				date: skyDate(2025, 10, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 10, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 10, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 10, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 10, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 10, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 10, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 10, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 10, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 10, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 10, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 10, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 11, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 11, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 11, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 11, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 11, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 11, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 11, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 11, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 11, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 11, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 11, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 11, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 11, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 11, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 11, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 11, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 11, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2025, 11, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2025, 12, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 12, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 12, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 12, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 12, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 12, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 12, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 12, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 12, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 12, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 12, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 12, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 12, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 12, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 12, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 12, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 12, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 12, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 12, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 12, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 12, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2025, 12, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2025, 12, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2025, 12, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2025, 12, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2025, 12, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2025, 12, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2025, 12, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2025, 12, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2025, 12, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2025, 12, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 1, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 1, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 1, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 1, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
		],
	},
	{
		season: Lightmending,
		rotations: [
			{
				date: skyDate(2026, 1, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 1, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 1, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 1, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 1, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 1, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 1, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 1, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 1, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 1, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 1, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 1, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 1, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 1, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 1, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 1, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 2, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 2, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 2, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 2, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 2, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 2, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 2, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 2, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 2, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 2, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 2, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 2, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 2, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 2, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 2, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 2, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 2, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 2, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 2, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 2, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 2, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 2, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 2, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 2, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 2, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 2, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 2, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2026, 2, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3+4.webp",
			},
			{
				date: skyDate(2026, 3, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 3, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 3, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 3, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 3, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 3, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 3, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 3, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 3, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 3, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 3, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 3, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 3, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 3, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 3, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 3, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 3, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 3, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 3, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 4, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 4, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
		],
	},
	{
		season: Carnival,
		rotations: [
			{
				date: skyDate(2026, 4, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 4, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 4, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 4, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 4, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 4, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 4, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 4, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 4, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 4, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2026, 4, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 4, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 4, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 4, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 5, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 5, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 5, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 5, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 5, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 5, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2026, 5, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 5, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 5, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 5, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 5, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 5, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 5, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 5, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 5, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 5, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2026, 5, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 5, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 5, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 5, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 5, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 5, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 5, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 5, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 5, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 5, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2026, 5, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 5, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 5, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 5, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 5, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 6, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 6, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 6, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 6, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 6, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 6, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 6, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 6, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 6, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1.webp",
			},
			{
				date: skyDate(2026, 6, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/2.webp",
			},
			{
				date: skyDate(2026, 6, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/2.webp",
			},
			{
				date: skyDate(2026, 6, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/2.webp",
			},
			{
				date: skyDate(2026, 6, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
			},
			{
				date: skyDate(2026, 6, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/2.webp",
			},
			{
				date: skyDate(2026, 6, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1.webp",
			},
			{
				date: skyDate(2026, 6, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1.webp",
			},
			{
				date: skyDate(2026, 6, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1.webp",
			},
			{
				date: skyDate(2026, 6, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
			},
			{
				date: skyDate(2026, 6, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
			},
			{
				date: skyDate(2026, 6, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/1+2.webp",
			},
			{
				date: skyDate(2026, 7, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/1+2.webp",
			},
			{
				date: skyDate(2026, 7, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/1+2.webp",
			},
		],
	},
	{
		season: DearVanGogh,
		rotations: [
			{
				date: skyDate(2026, 7, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 7, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 7, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 7, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 7, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 7, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 7, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 7, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 7, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 7, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 7, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 7, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 7, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 7, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 7, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 8, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 8, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 8, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 8, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 8, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 8, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 8, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 8, 8),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 8, 9),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 8, 10),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 8, 11),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 8, 12),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 8, 13),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 8, 14),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 8, 15),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 8, 16),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 8, 17),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 8, 18),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 8, 19),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 8, 20),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 8, 21),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 8, 22),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 8, 23),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 8, 24),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 8, 25),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 8, 26),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
			},
			{
				date: skyDate(2026, 8, 27),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 8, 28),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
			{
				date: skyDate(2026, 8, 29),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
			},
			{
				date: skyDate(2026, 8, 30),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
			},
			{
				date: skyDate(2026, 8, 31),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 9, 1),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/4.webp",
			},
			{
				date: skyDate(2026, 9, 2),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/4.webp",
			},
			{
				date: skyDate(2026, 9, 3),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
			},
			{
				date: skyDate(2026, 9, 4),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
			},
			{
				date: skyDate(2026, 9, 5),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
			},
			{
				date: skyDate(2026, 9, 6),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3.webp",
			},
			{
				date: skyDate(2026, 9, 7),
				expected:
					"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/3.webp",
			},
		],
	},
] as const;

for (const { season, rotations } of SEASONAL_CANDLES_ROTATIONS) {
	test(`Season ${season.id} seasonal candles rotations.`, async (t) => {
		for (const { date, expected } of rotations) {
			await t.test(date.toPlainDate().toString(), () =>
				deepStrictEqual(season.seasonalCandles(date), expected),
			);
		}
	});
}

test("Double seasonal light uses the configured rotation only during the event.", () => {
	deepStrictEqual(
		Lightmending.seasonalCandles(skyDate(2026, 2, 26)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/3.webp",
	);
	deepStrictEqual(
		Lightmending.seasonalCandles(skyDate(2026, 2, 27)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3+4.webp",
	);
	deepStrictEqual(
		Lightmending.seasonalCandles(skyDate(2026, 3, 13)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
	);
	deepStrictEqual(
		BlueBird.seasonalCandles(skyDate(2025, 6, 8)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/1.webp",
	);
	deepStrictEqual(
		BlueBird.seasonalCandles(skyDate(2025, 6, 9)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/valley_of_triumph/1+2.webp",
	);
	deepStrictEqual(
		BlueBird.seasonalCandles(skyDate(2025, 6, 23)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/2.webp",
	);
	deepStrictEqual(
		DearVanGogh.seasonalCandles(skyDate(2026, 9, 10)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/3.webp",
	);
	deepStrictEqual(
		DearVanGogh.seasonalCandles(skyDate(2026, 9, 11)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/hidden_forest/3+4.webp",
	);
	deepStrictEqual(
		DearVanGogh.seasonalCandles(skyDate(2026, 9, 25)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
	);
});

test("Nesting seasonal candles follow the reviewed realm and layout dates.", () => {
	deepStrictEqual(
		Nesting.seasonalCandles(skyDate(2024, 5, 1)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/vault_of_knowledge/4.webp",
	);
	deepStrictEqual(
		Nesting.seasonalCandles(skyDate(2024, 5, 2)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/daylight_prairie/4.webp",
	);
	deepStrictEqual(
		Nesting.seasonalCandles(skyDate(2024, 6, 25)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/4.webp",
	);
	deepStrictEqual(
		Nesting.seasonalCandles(skyDate(2024, 6, 30)),
		"https://cdn.thatskyapplication.com/daily_guides/seasonal_candles/golden_wasteland/3.webp",
	);
});

test("Remaining seasonal candles include all future double seasonal light windows.", () => {
	deepStrictEqual(Nesting.remainingSeasonalCandles(skyDate(2024, 4, 15)), {
		seasonalCandlesLeft: 397,
		seasonalCandlesLeftWithSeasonPass: 474,
	});
	deepStrictEqual(Nesting.remainingSeasonalCandles(skyDate(2024, 5, 1)), {
		seasonalCandlesLeft: 312,
		seasonalCandlesLeftWithSeasonPass: 373,
	});
});

test("Seasons without double seasonal light have no bonus candles or active event.", () => {
	const date = skyDate(2020, 10, 5);
	deepStrictEqual(Prophecy.isDuringDoubleSeasonalLightEvent(date), false);
	deepStrictEqual(Prophecy.remainingSeasonalCandles(date), {
		seasonalCandlesLeft: 350,
		seasonalCandlesLeftWithSeasonPass: 420,
	});
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
		const windows = season.doubleSeasonalLight?.dates ?? [];

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
