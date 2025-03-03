import { SeasonId } from "@thatskyapplication/utility";
import {
	DYE_BLACK,
	DYE_BLUE,
	DYE_CYAN,
	DYE_GREEN,
	DYE_PURPLE,
	DYE_RED,
	DYE_WHITE,
	DYE_YELLOW,
	HEART_URL,
	QUEST_URL,
} from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Radiance;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/Season-of-Radiance-icon.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7c/Radiance-Ultimate-Cape-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c4/Radiance-Ultimate-Mask-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
			],
		},
	],
	[
		{
			icon: DYE_RED,
		},
		{
			icon: DYE_YELLOW,
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
			icon: DYE_GREEN,
		},
		{
			icon: DYE_CYAN,
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
			icon: DYE_BLUE,
		},
		{
			icon: DYE_PURPLE,
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: DYE_WHITE,
		},
		{
			icon: DYE_BLACK,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/60/Question-mark-Ray.png/revision/latest",
		},
	],
] as const satisfies FriendshipTreeData;
