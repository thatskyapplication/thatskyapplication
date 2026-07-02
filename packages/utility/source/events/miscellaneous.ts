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
	start: Temporal.ZonedDateTime;
	/**
	 * The end date is exclusive.
	 */
	end: Temporal.ZonedDateTime;
	dyes: readonly [DyeTypes, ...DyeTypes[]];
}

interface DoubleHeartEvent {
	start: Temporal.ZonedDateTime;
	/**
	 * The end date is exclusive.
	 */
	end: Temporal.ZonedDateTime;
}

export interface CommunityEvent {
	name: string;
	start: Temporal.ZonedDateTime;
	marketingURL?: `https://${string}`;
}

export const RADIANCE_EVENTS = [
	{
		start: skyDate(2025, 10, 13),
		end: skyDate(2025, 10, 27),
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
	{
		start: skyDate(2026, 4, 24),
		end: skyDate(2026, 5, 8),
		dyes: [DyeType.Black, DyeType.Yellow],
	},
	{
		start: skyDate(2026, 6, 19),
		end: skyDate(2026, 7, 3),
		dyes: [DyeType.White, DyeType.Cyan],
	},
] as const satisfies readonly RadianceEvent[];

export const DOUBLE_HEART_EVENTS = [
	{
		start: skyDate(2024, 12, 9),
		end: skyDate(2024, 12, 23),
	},
	{
		start: skyDate(2025, 2, 10),
		end: skyDate(2025, 2, 24),
	},
	{
		start: skyDate(2025, 11, 17),
		end: skyDate(2025, 12, 1),
	},
	{
		start: skyDate(2025, 12, 31),
		end: skyDate(2026, 1, 16),
	},
] as const satisfies readonly DoubleHeartEvent[];

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
	{
		name: "Aurora 2.0 Mega Concert",
		start: skyDate(2026, 6, 6, 10),
		marketingURL: "https://discord.gg/UNNNcdG4M",
	},
] as const satisfies readonly CommunityEvent[];
