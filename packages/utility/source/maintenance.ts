import { skyDate } from "./dates.js";

export const MAINTENANCE_PERIODS = [
	{
		start: skyDate(2026, 2, 18, 11),
		end: skyDate(2026, 2, 18, 15),
	},
	{
		start: skyDate(2026, 2, 21, 3),
		end: skyDate(2026, 2, 21, 4),
	},
	{
		start: skyDate(2026, 2, 23, 0),
		end: skyDate(2026, 2, 23, 0),
	},
] as const;
