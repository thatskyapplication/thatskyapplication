import { SeasonId } from "@thatskyapplication/utility";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Moments;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/Reassuring-Ranger-Action-icon-Credit-Morybel.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/Reassuring-Ranger-Action-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/20/Reassuring-Ranger-Head-accessory-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/91/Reassuring-Ranger-Mask-icon-Credit-Morybel.png/revision/latest",
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
			cost: { seasonalCandles: { cost: 30, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9f/Reassuring-Ranger-Cape-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b8/Reassuring-Ranger-Hair-accessory-icon-Credit-Morybel.png/revision/latest",
			cost: { seasonalCandles: { cost: 36, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c7/SOMoments-seasonal-heart-icon-Credit-Morybel.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
