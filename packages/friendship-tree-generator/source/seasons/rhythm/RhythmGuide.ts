import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Rhythm as const;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/25/4_Rhythm.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/08/Icon_mask_rhythm_ult.png/revision/latest",
			seasonIcon: SEASON,
			cost: { seasonalHearts: { cost: 2, season: SEASON } },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8a/Icon_hair_rhythm_ultimate.png/revision/latest",
			seasonIcon: SEASON,
			cost: { seasonalHearts: { cost: 4, season: SEASON } },
		},
	],
] as const satisfies FriendshipTreeData;
