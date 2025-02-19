import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e5/Icon_hair_elder_forest.png/revision/latest",
			cost: { ascendedCandles: 6 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f1/Elder-Mask-Icon-Forest-Morybel-0146.png/revision/latest",
			cost: { ascendedCandles: 250 },
		},
	],
] as const satisfies FriendshipTreeData;
