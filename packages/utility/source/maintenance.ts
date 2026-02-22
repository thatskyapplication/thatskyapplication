import { skyDate } from "./dates.js";

export const MAINTENANCE_PERIODS = [
	{
		start: skyDate(2026, 2, 18, 11),
		end: skyDate(2026, 2, 18, 15),
	},
	{
		start: skyDate(2026, 2, 21, 3),
		end: skyDate(2026, 2, 21, 15),
	},
	{
		start: skyDate(2026, 2, 22, 23),
		end: skyDate(2026, 2, 22, 23, 25),
	},
	{
		start: skyDate(2026, 2, 22, 13, 5),
		end: skyDate(2026, 2, 22, 14, 0),
	},
	{
		start: skyDate(2026, 2, 23, 0),
		end: skyDate(2026, 2, 23, 0),
	},
	{
		start: skyDate(2026, 2, 23, 2),
		end: skyDate(2026, 2, 23, 3),
	},
] as const;
