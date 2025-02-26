import { SeasonId } from "@thatskyapplication/utility";
import { DYE_GREEN, DYE_WHITE, DYE_YELLOW } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Radiance;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 2,
		},
	],
	[
		{
			icon: DYE_GREEN,
			cost: { seasonalCandles: { cost: 10, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/23/Radiance-Provoking-Performer-Headpiece-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_GREEN,
			cost: { seasonalCandles: { cost: 14, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/be/Radiance-Greeting-Shaman-instrument-Cymbals-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e6/Radiance-Provoking-Performer-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: DYE_YELLOW,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_YELLOW,
			cost: { seasonalCandles: { cost: 32, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0a/Radiance-Provoking-Performer-Cape-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Radiance-Provoking-Performer-Shoes-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 38, season: seasonId } },
		},
		{
			icon: DYE_WHITE,
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
