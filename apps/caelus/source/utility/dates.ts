import { Collection } from "@discordjs/collection";
import { skyDate } from "@thatskyapplication/utility";
import type { HeartsExtra } from "../models/Heart.js";

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
