import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.AURORA;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 10, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bc/SoAurora-Mindful-Miner-Mask-Icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 3,
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 4,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/68/SoAurora-Mindful-Miner-Hair-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/SoAurora-Mindful-Miner-Outfit-Icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/66/SoAurora-Mindful-Miner-Cape-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 32, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6a/SoAurora-Seasonal-Heart-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 2,
			cost: { hearts: 4 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bc/SoAurora-Mindful-Miner-Mask-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 35 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 3,
			cost: { hearts: 3 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SoAurora-Mindful-Miner-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 4,
			cost: { hearts: 6 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/68/SoAurora-Mindful-Miner-Hair-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 40 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/SoAurora-Mindful-Miner-Outfit-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 55 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/66/SoAurora-Mindful-Miner-Cape-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 75 },
		},
	],
] as const satisfies FriendshipTreeData;
