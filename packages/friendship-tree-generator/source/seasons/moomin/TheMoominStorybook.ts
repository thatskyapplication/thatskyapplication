import { SeasonId } from "@thatskyapplication/utility";
import { QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Moomin;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/The-Moomin-Storybook-Emote-icon.png/revision/latest",
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/The-Moomin-Storybook-Emote-icon.png/revision/latest",
					cost: { hearts: 3 },
					level: 2,
				},
			],
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3a/Season-of-Moomin-icon.png/revision/latest/",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/dc/Moomin-Ultimate-Umbrella-Prop-icon.png/revision/latest/",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2d/Moomin-Ultimate-Plush-Prop-icon.png/revision/latest/",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ed/Moomin-Ultimate-Outfit-icon.png/revision/latest/",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/The-Moomin-Storybook-Emote-icon.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/The-Moomin-Storybook-Emote-icon.png/revision/latest",
					cost: { hearts: 5 },
					level: 4,
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/24/Moomin-Family-Painting-Prop-icon.png/revision/latest",
			cost: { candles: 35 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/97/Moomin-Invisible-Outfit-icon.png/revision/latest",
			cost: { candles: 190 },
		},
	],
] as const satisfies FriendshipTreeData;
