import { QUEST_URL, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Nesting as const;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/87/Season-of-Nesting-icon.png/revision/latest",
			seasonIcon: SEASON,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/34/Nesting-Ultimate-Outfit-icon.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 2, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e0/Nesting-Guide-Mannequin-Figurine-Prop-icon.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
		},
	],
] as const satisfies FriendshipTreeData;
