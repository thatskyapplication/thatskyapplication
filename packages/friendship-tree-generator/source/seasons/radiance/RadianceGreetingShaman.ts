import { SeasonId } from "@thatskyapplication/utility";
import { DYE_BLACK, DYE_BLUE, DYE_CYAN, DYE_PURPLE } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Radiance;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a8/Radiance-Greeting-Shaman-Expression-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a8/Radiance-Greeting-Shaman-Expression-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/14/Radiance-Greeting-Shaman-Headpiece-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 14, season: seasonId } },
		},
		{
			icon: DYE_BLUE,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_BLUE,
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: DYE_CYAN,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a8/Radiance-Greeting-Shaman-Expression-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a8/Radiance-Greeting-Shaman-Expression-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: DYE_PURPLE,
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
		},
		{
			icon: DYE_BLACK,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/20/Radiance-Greeting-Shaman-Hair-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: DYE_CYAN,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_PURPLE,
			cost: { seasonalCandles: { cost: 28, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/23/Radiance-Greeting-Shaman-Outfit-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/44/Season-of-Radiance-Seasonal-Heart-icon.png/revision/latest",
			cost: { seasonalHearts: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
