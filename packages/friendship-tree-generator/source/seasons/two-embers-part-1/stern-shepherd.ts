import { SeasonId } from "@thatskyapplication/utility";
import { DYE_YELLOW } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.TwoEmbersPart1;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7d/Stern-Shepherd-Manatee-Call-icon.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/de/Stern-Shepherd-Hair-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/Stern-Shepherd-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: seasonId } },
		},
		{
			icon: DYE_YELLOW,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9c/Random-dye-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ef/Stern-Shepherd-Prop-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/18/Stern-Shepherd-Mask-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 30, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9c/Random-dye-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9a/Season-of-Two-Embers-P1-Seasonal-Heart-icon.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
