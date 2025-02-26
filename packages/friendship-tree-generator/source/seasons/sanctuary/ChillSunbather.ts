import { SeasonId } from "@thatskyapplication/utility";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Sanctuary;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			cost: { hearts: 4 },
			level: 2,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/49/Icon_prop_summer_lounger.png/revision/latest",
			cost: { candles: 20 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/Mimi-4117_07_chill_sunbather_mask.png/revision/latest",
			cost: { candles: 66 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/31/Winglight.png/revision/latest",
			cost: { ascendedCandles: 2 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6d/Mimi-4117_07_chill_sunbather_hat.png/revision/latest",
			cost: { candles: 44 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ed/Icon_cape_sanctuary_flower-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
] as const satisfies FriendshipTreeData;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/Mimi-4117_07_chill_sunbather_mask.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			level: 3,
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c2/SOS_Chill.png/revision/latest",
			level: 4,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6d/Mimi-4117_07_chill_sunbather_hat.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ed/Icon_cape_sanctuary_flower-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8b/Sanctuary-heart-Ray.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
