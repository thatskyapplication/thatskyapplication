import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Shared-memory-spell-icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/18/Compassionate-Cellist-Face-Accessory-icon.png/revision/latest",
			cost: { candles: 85 },
		},
		{
			icon: HEART_URL,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/03/Compassionate-Cellist-Duets-Cello-icon.png/revision/latest",
			cost: { candles: 200 },
		},
	],
] as const satisfies FriendshipTreeData;
