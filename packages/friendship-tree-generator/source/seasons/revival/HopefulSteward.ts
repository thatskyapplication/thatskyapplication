import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Revival;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/60/Season-of-Revival-icon.png/revision/latest",
			seasonIcon: seasonId,
			flatLine: true,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/ff/Revival-Ultimate-Hair-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ef/Revival-Ultimate-Cape-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Icon_hug.png/revision/latest",
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: QUEST_URL,
		},
		{
			icon: QUEST_URL,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/67/Revival-Hair-icon.png/revision/latest",
			cost: { candles: 46 },
		},
	],
] as const satisfies FriendshipTreeData;
