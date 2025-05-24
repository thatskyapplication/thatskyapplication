import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.BlueBird;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/63/Season-of-Blue-Bird-icon.png/revision/latest/scale-to-width-down/51?cb=20250228214357",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/da/Blue-Bird-Guide-Ultimate-Facepiece-icon.png/revision/latest/scale-to-width-down/51?cb=20250421204129",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/Blue-Bird-Guide-Ultimate-Cape-icon.png/revision/latest/scale-to-width-down/51?cb=20250422001410",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 3, season: seasonId } },
				},
			],
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2e/Blue-Bird-Guide-ultimate-expression.png/revision/latest/scale-to-width-down/51?cb=20250316000859",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2e/Blue-Bird-Guide-ultimate-expression.png/revision/latest/scale-to-width-down/51?cb=20250316000859",
			level: 2,
			cost: { hearts: 3 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2e/Blue-Bird-Guide-ultimate-expression.png/revision/latest/scale-to-width-down/51?cb=20250316000859",
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2e/Blue-Bird-Guide-ultimate-expression.png/revision/latest/scale-to-width-down/51?cb=20250316000859",
			level: 4,
			cost: { hearts: 5 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/60/Question-mark-Ray.png/revision/latest",
		},
	],
] as const satisfies FriendshipTreeData;
