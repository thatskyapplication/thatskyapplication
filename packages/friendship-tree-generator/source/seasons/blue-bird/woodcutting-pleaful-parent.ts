import { SeasonId } from "@thatskyapplication/utility";
import { DYE_GREEN } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.BlueBird;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 15, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8d/Woodcutting-Pleaful-Parent-Shoes-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_GREEN,
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
		},
		{
			icon: DYE_GREEN,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a8/Woodcutting-Pleaful-Parent-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 23, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/82/Blue-Bird-seasonal-heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
