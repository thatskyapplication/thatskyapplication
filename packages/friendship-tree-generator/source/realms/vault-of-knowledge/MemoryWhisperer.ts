import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ea/MemoryWhisperer-1.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a1/MemoryWhisperer-2.png/revision/latest",
			cost: { hearts: 3 },
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
			cost: { ascendedCandles: 4 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ec/MemoryWhisperer-3.png/revision/latest",
			cost: { hearts: 50 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 12 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/81/Icon_cape_white_tier_2.png/revision/latest",
			cost: { hearts: 150 },
		},
	],
] as const satisfies FriendshipTreeData;
