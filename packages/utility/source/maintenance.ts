import { skyDate } from "./dates.js";

export const MAINTENANCE_PERIODS = [
	{
		start: skyDate(2026, 2, 18, 11),
		end: skyDate(2026, 2, 18, 15),
	},
	{
		start: skyDate(2026, 4, 8, 13),
		end: skyDate(2026, 4, 8, 14),
	},
] as const;
