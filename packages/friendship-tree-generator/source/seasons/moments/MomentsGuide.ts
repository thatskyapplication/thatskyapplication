import { QUEST_URL, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Moments as const;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/23/Moments-Guide-Prop-Camera-icon-Credit-Morybel.png/revision/latest",
		},
		null,
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5c/Season-of-Moments-icon.png/revision/latest",
			seasonIcon: SEASON,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/02/Moments-Guide-Head-accessory-icon-Credit-Morybel.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4f/Moments-Guide-Prop-Ultimate-Camera-icon-Credit-Morybel.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3f/Moments-Guide-Ultimate-Hair-accessory-icon-Credit-Morybel.png/revision/latest",
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
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/94/Icon_high_five.png/revision/latest",
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
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
] as const satisfies FriendshipTreeData;
