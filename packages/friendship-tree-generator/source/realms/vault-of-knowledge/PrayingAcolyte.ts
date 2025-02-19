import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/75/PrayingAcolyte-1.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/75/PrayingAcolyte-1.png/revision/latest",
			cost: { candles: 3 },
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3c/1CandleSpell.png/revision/latest",
			cost: { candles: 1 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3d/PrayingAcolyte-2.png/revision/latest",
			cost: { hearts: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/75/PrayingAcolyte-1.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/75/PrayingAcolyte-1.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7b/PrayingAcolyte-3-Morybel-0146.png/revision/latest",
			cost: { hearts: 25 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 9 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cb/PrayingAcolyte-4.png/revision/latest",
			cost: { hearts: 75 },
		},
	],
] as const satisfies FriendshipTreeData;
