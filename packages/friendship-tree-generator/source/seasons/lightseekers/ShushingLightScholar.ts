import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Lightseekers;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			cost: { hearts: 4 },
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/92/Mimi-4117_03_shushing_light_scholar_mask.png/revision/latest",
			cost: { candles: 30 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5f/Icon_cape_lightseekers_blue_gold-Morybel-0146.png/revision/latest",
			cost: { candles: 65 },
		},
	],
] as const satisfies FriendshipTreeData;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			seasonIcon: seasonId,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/92/Mimi-4117_03_shushing_light_scholar_mask.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/88/Mimi-4117_03_shushing_light_scholar_emote.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5f/Icon_cape_lightseekers_blue_gold-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
