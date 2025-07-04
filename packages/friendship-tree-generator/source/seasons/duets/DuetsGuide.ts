import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Duets;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3a/Duets-Guide-Mask-icon.png/revision/latest",
			cost: { candles: 65 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3f/Season-of-Duets-icon.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bf/Duets-Ultimate-Poster-Prop-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bc/Duets-Ultimate-Cape-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/57/Duets-Ultimate-Grand-Piano-Prop-icon.png/revision/latest",
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
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b4/Duets-Guide-Action-icon.png/revision/latest",
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b4/Duets-Guide-Action-icon.png/revision/latest",
			cost: { hearts: 8 },
			level: 2,
		},
	],
	[
		{
			icon: QUEST_URL,
		},
	],
	[
		{
			icon: HEART_URL,
		},
	],
] as const satisfies FriendshipTreeData;
