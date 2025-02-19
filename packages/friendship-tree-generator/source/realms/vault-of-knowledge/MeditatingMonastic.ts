import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a5/Meditating-Monastic-1.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a5/Meditating-Monastic-1.png/revision/latest",
			cost: { candles: 10 },
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3c/1CandleSpell.png/revision/latest",
			cost: { candles: 1 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/08/Meditating-Monastic-2.png/revision/latest",
			cost: { hearts: 10 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a5/Meditating-Monastic-1.png/revision/latest",
			cost: { candles: 7 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a5/Meditating-Monastic-1.png/revision/latest",
			cost: { candles: 10 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/47/Meditating-Monastic-3.png/revision/latest",
			cost: { hearts: 30 },
		},
	],
] as const satisfies FriendshipTreeData;
