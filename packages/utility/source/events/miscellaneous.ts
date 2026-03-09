import type { DateTime } from "luxon";
import { skyDate } from "../dates.js";

export const DyeType = {
	Red: 0,
	Yellow: 1,
	Green: 2,
	Cyan: 3,
	Blue: 4,
	Purple: 5,
	Black: 6,
	White: 7,
} as const satisfies Readonly<Record<string, number>>;

export type DyeTypes = (typeof DyeType)[keyof typeof DyeType];

interface RadianceEvent {
	start: DateTime;
	end: DateTime;
	dyes: readonly [DyeTypes, ...DyeTypes[]];
}

export const RADIANCE_EVENTS = [
	{
		start: skyDate(2_025, 10, 13),
		end: skyDate(2_025, 10, 27),
		dyes: [DyeType.Green, DyeType.Black],
	},
	{
		start: skyDate(2025, 12, 2),
		end: skyDate(2025, 12, 12),
		dyes: [DyeType.Red, DyeType.Cyan, DyeType.White],
	},
	{
		start: skyDate(2026, 2, 27),
		end: skyDate(2026, 3, 13),
		dyes: [DyeType.Cyan, DyeType.Purple, DyeType.White],
	},
] as const satisfies readonly RadianceEvent[];

export const COMMUNITY_EVENTS = [
	{
		name: "Aurora 2.0 Mega Concert",
		start: skyDate(2025, 12, 31, 10),
		marketingURL: "https://discord.gg/aurora-2-0",
	},
	{
		name: "Aurora 2.0 Mega Concert",
		start: skyDate(2026, 3, 7, 10),
		marketingURL: "https://discord.gg/aurora-2-0",
	},
] as const;
