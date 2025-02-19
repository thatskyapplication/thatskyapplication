import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/07/Icon_hair_elder_valley_2.png/revision/latest",
			cost: { ascendedCandles: 5 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/10/Icon_hair_elder_valley_1.png/revision/latest",
			cost: { ascendedCandles: 6 },
		},
	],
] as const satisfies FriendshipTreeData;
