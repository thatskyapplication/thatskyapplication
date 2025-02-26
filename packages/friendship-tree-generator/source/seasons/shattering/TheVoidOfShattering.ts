import { SeasonId } from "@thatskyapplication/utility";
import { QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Shattering;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d0/14_SOShattering.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/63/SOShattering-ultimate-Cape-manta-Icon-Morybel-0146.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/98/SOShattering-ultimate-Cape-krill-Icon-Morybel-0146.png/revision/latest",
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
