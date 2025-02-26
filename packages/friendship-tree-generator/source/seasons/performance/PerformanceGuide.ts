import { SeasonId } from "@thatskyapplication/utility";
import { QUEST_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Performance;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Shared-memory-spell-icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/16/13_SOPerformance_logo.png/revision/latest",
			seasonIcon: seasonId,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/95/SOPerformance-ultimate-mask-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOPerformance-ultimate-cape-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 2, season: seasonId } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fe/SOPerformance-ultimate-hair-icon.png/revision/latest",
					seasonIcon: seasonId,
					cost: { seasonalHearts: { cost: 1, season: seasonId } },
				},
			],
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/94/Icon_high_five.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0f/Morybel-0146-SOPerformance-ultimate-mask-icon-f2p.png/revision/latest",
			cost: { candles: 42 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Shared-memory-spell-icon-Morybel-0146.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8d/Mimi-4117_03_doublefive_light_catcher_emote.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Shared-memory-spell-icon-Morybel-0146.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Icon_hug.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Shared-memory-spell-icon-Morybel-0146.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/11/Morybel-0146-SOPerformance-Modest-Dancer-emote-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f8/SOPerformance-flower-pot-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 52 },
		},
	],
] as const satisfies FriendshipTreeData;
