import { QUEST_URL, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.NineColouredDeer as const;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5a/Season-of-The-Nine-Colored-Deer-icon.png/revision/latest",
			seasonIcon: SEASON,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3c/Nine-Colored-Deer-Ultimate-Hair-icon.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/34/Nine-Colored-Deer-Ultimate-Outfit-icon.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bb/Nine-Colored-Deer-Ultimate-Cape-icon.png/revision/latest",
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
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c0/Nine-Colored-Deer-Hair-Accessory-icon.png/revision/latest",
			cost: { candles: 50 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
		},
	],
	[
		{
			icon: QUEST_URL,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/dc/Nine-Colored-Deer-Mask-icon.png/revision/latest",
			cost: { candles: 120 },
		},
	],
] as const satisfies FriendshipTreeData;
