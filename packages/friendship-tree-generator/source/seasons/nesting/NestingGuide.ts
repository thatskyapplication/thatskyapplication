import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Nesting;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/87/Season-of-Nesting-icon.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/34/Nesting-Ultimate-Outfit-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e0/Nesting-Guide-Mannequin-Figurine-Prop-icon.png/revision/latest",
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
			icon: HEART_URL,
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
	],
	[
		{
			icon: HEART_URL,
		},
	],
] as const satisfies FriendshipTreeData;
