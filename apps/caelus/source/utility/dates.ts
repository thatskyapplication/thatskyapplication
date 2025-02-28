import { Collection } from "@discordjs/collection";
import { skyDate } from "@thatskyapplication/utility";
import type { DateTime } from "luxon";
import type { HeartsExtra } from "../models/Heart.js";

// Double treasure candles.
export const DOUBLE_TREASURE_CANDLES_DATES = new Collection<
	number,
	{ start: DateTime; end: DateTime }
>()
	.set(1, {
		start: skyDate(2_024, 12, 9),
		end: skyDate(2_024, 12, 23),
	})
	.set(2, {
		start: skyDate(2_025, 3, 17),
		end: skyDate(2_025, 3, 24),
	});

// Extra hearts.
export const HEART_EXTRA_DATES = new Collection<number, HeartsExtra>()
	.set(1, {
		start: skyDate(2_024, 12, 9),
		end: skyDate(2_024, 12, 23),
		count: 1,
	})
	.set(2, {
		start: skyDate(2_025, 2, 10),
		end: skyDate(2_025, 2, 24),
		count: 1,
	});

// Miscellaneous.
export const INITIAL_TREASURE_CANDLES_SEEK = skyDate(2025, 1, 1); // 01/01/2025 failed and is thus the first day of the cycle.
