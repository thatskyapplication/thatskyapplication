import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/55/PointingCandlemaker-1.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/55/PointingCandlemaker-1.png/revision/latest",
			cost: { candles: 1 },
			level: 2,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7e/PointingCandlemaker-2.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3c/1CandleSpell.png/revision/latest",
			cost: { candles: 1 },
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 1 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/55/PointingCandlemaker-1.png/revision/latest",
			cost: { candles: 2 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/55/PointingCandlemaker-1.png/revision/latest",
			cost: { candles: 2 },
			level: 4,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d5/PointingCandlemaker-3.png/revision/latest",
			cost: { hearts: 4 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
	],
] as const satisfies FriendshipTreeData;
