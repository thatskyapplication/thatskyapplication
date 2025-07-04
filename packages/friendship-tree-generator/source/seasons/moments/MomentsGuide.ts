import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Moments;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/23/Moments-Guide-Prop-Camera-icon-Credit-Morybel.png/revision/latest",
		},
		null,
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5c/Season-of-Moments-icon.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/02/Moments-Guide-Head-accessory-icon-Credit-Morybel.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4f/Moments-Guide-Prop-Ultimate-Camera-icon-Credit-Morybel.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3f/Moments-Guide-Ultimate-Hair-accessory-icon-Credit-Morybel.png/revision/latest",
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
	],
	[
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
] as const satisfies FriendshipTreeData;
