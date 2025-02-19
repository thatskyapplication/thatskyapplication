import { QUEST_URL, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Revival as const;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/60/Season-of-Revival-icon.png/revision/latest",
			seasonIcon: SEASON,
			flatLine: true,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/ff/Revival-Ultimate-Hair-icon.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 2, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ef/Revival-Ultimate-Cape-icon.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 2, season: SEASON } },
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
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
