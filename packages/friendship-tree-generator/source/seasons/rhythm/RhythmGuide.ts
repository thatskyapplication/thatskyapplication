import { SeasonId } from "@thatskyapplication/utility";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Rhythm;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/25/4_Rhythm.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/08/Icon_mask_rhythm_ult.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalHearts: { cost: 2, season: seasonId } },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8a/Icon_hair_rhythm_ultimate.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalHearts: { cost: 4, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
