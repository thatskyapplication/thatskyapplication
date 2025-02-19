import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.NineColouredDeer as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/Hunter-Emote-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/Hunter-Emote-icon.png/revision/latest",
			level: 2,
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fc/Hunter-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 8, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/Hunter-Emote-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: SEASON } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/Hunter-Emote-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/10/Hunter-Hair-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/Hunter-Cape-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 34, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cc/Nine-Colored-Deer-seasonal-heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: SEASON } },
			seasonIcon: SEASON,
		},
	],
] as const satisfies FriendshipTreeData;
