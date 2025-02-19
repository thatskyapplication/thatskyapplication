import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Nesting as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3d/Nesting-Atrium-Floor-Light-Prop-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Nesting-Atrium-Hanging-Lamp-Prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/71/Nesting-Atrium-Hair-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/77/Nesting-Atrium-Hanging-Branch-Prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4d/Season-of-Nesting-Seasonal-Heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: SEASON } },
			seasonIcon: SEASON,
		},
	],
] as const satisfies FriendshipTreeData;
