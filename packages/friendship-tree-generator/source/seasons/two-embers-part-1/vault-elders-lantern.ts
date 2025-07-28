import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL, QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.TwoEmbersPart1;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: HEART_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/98/Season-of-the-Two-Embers-icon.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fa/Vault-Elder-Lantern-Ultimate-Constellation-Hairpiece-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0b/Vault-Elder-Lantern-Ultimate-Cape-icon.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/60/Question-mark-Ray.png/revision/latest",
		},
	],
] as const satisfies FriendshipTreeData;
