import { DYE_RED, DYE_YELLOW, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Radiance as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b2/Radiance-Leaping-Dancer-Cartwheel-expression-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b2/Radiance-Leaping-Dancer-Cartwheel-expression-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6a/Radiance-Leaping-Dancer-Hair-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: SEASON } },
		},
		{
			icon: DYE_RED,
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: DYE_RED,
			cost: { seasonalCandles: { cost: 16, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/11/Radiance-Leaping-Dancer-prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b2/Radiance-Leaping-Dancer-Cartwheel-expression-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: SEASON } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b2/Radiance-Leaping-Dancer-Cartwheel-expression-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 4,
		},
	],
	[
		{
			icon: DYE_RED,
			cost: { seasonalCandles: { cost: 24, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/af/Radiance-Leaping-Dancer-Outfit-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/12/Radiance-Leaping-Dancer-Cape-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: SEASON } },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8c/Radiance-Leaping-Dancer-Shoes-icon.png/revision/latest",
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
