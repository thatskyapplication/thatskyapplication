import type { FriendshipTreeData } from "../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f0/Icon_hair_elder_wasteland.png/revision/latest",
			cost: { ascendedCandles: 6 },
		},
	],
] as const satisfies FriendshipTreeData;
