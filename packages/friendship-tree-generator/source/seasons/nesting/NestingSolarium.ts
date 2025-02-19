import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Nesting as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 14, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cc/Nesting-Solarium-Wall-Painting-Prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4a/Nesting-Solarium-Hanging-Planter-Prop-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 30, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/97/Nesting-Solarium-Bathtub-Prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/46/Nesting-Solarium-Dining-Table-Prop-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 34, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
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
