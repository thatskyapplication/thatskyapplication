import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f2/LevitatingAdept-1.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f2/LevitatingAdept-1.png/revision/latest",
			cost: { candles: 5 },
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3c/1CandleSpell.png/revision/latest",
			cost: { candles: 1 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/86/LevitatingAdept-2.png/revision/latest",
			cost: { hearts: 5 },
		},
		{
			icon: HEART_URL,
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 2 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f2/LevitatingAdept-1.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f2/LevitatingAdept-1.png/revision/latest",
			cost: { candles: 7 },
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/25/LevitatingAdept-3.png/revision/latest",
			cost: { hearts: 10 },
		},
	],
] as const satisfies FriendshipTreeData;
