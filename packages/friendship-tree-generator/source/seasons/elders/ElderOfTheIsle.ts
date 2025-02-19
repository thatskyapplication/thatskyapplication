import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/ae/Icon_hair_elder_isle.png/revision/latest",
			cost: { ascendedCandles: 4 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a0/Elder-Mask-Icon-Isle-Morybel-0146.png/revision/latest",
			cost: { ascendedCandles: 125 },
		},
	],
] as const satisfies FriendshipTreeData;
