import { SeasonId } from "@thatskyapplication/utility";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.NineColouredDeer;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/07/Princess-Emote-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/07/Princess-Emote-icon.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/51/Princess-Mask-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 8, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e8/Princess-Hair-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/07/Princess-Emote-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/07/Princess-Emote-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/71/Princess-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 26, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 32, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/42/Princess-Cape-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cc/Nine-Colored-Deer-seasonal-heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
