import { skyDate } from "./dates.js";

export const MAINTENANCE_PERIODS = [
	{
		// start: skyDate(2026, 2, 18, 11),
		// end: skyDate(2026, 2, 18, 15),
		start: skyDate(2026, 2, 20, 11),
		end: skyDate(2026, 2, 20, 15),
	},
	{
		start: skyDate(2026, 2, 19, 1),
		end: skyDate(2026, 2, 19, 23),
	},
] as const;
