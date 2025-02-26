import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Performance;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/SoPerformance_-_Frantic_Stagehand-emote-icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { candles: 22 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/87/SoPerformance_-_Frantic_Stagehand-hairstyle-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 48 },
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 2 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/SoPerformance_-_Frantic_Stagehand-emote-icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 8 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/SoPerformance_-_Frantic_Stagehand-outfit-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f4/SoPerformance_-_Frantic_Stagehand-mask-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 34 },
		},
	],
] as const satisfies FriendshipTreeData;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/SoPerformance_-_Frantic_Stagehand-emote-icon-Morybel-0146.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 10, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/87/SoPerformance_-_Frantic_Stagehand-hairstyle-icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 26, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/SoPerformance_-_Frantic_Stagehand-emote-icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f4/SoPerformance_-_Frantic_Stagehand-mask-icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 30, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/SoPerformance_-_Frantic_Stagehand-outfit-icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d5/SOPerformance-seasonal-heart-icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
