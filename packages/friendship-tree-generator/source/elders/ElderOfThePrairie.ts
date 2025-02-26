import type { FriendshipTreeData } from "../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/58/Icon_hair_elder_prairie.png/revision/latest",
			cost: { ascendedCandles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f6/Elder-Mask-Icon-Prairie-Morybel-0146.png/revision/latest",
			cost: { ascendedCandles: 75 },
		},
	],
] as const satisfies FriendshipTreeData;
