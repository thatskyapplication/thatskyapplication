import { DYE_GREEN, DYE_WHITE, DYE_YELLOW, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Radiance as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 2,
		},
	],
	[
		{
			icon: DYE_GREEN,
			cost: { seasonalCandles: { cost: 10, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/23/Radiance-Provoking-Performer-Headpiece-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: DYE_GREEN,
			cost: { seasonalCandles: { cost: 14, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/be/Radiance-Greeting-Shaman-instrument-Cymbals-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: SEASON } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c6/Radiance-Provoking-Performer-Expression-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e6/Radiance-Provoking-Performer-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: SEASON } },
		},
		{
			icon: DYE_YELLOW,
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: DYE_YELLOW,
			cost: { seasonalCandles: { cost: 32, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0a/Radiance-Provoking-Performer-Cape-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Radiance-Provoking-Performer-Shoes-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 38, season: SEASON } },
		},
		{
			icon: DYE_WHITE,
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/44/Season-of-Radiance-Seasonal-Heart-icon.png/revision/latest",
			cost: { seasonalHearts: { cost: 3, season: SEASON } },
			seasonIcon: SEASON,
		},
	],
] as const satisfies FriendshipTreeData;
