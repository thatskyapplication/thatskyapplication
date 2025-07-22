import { SeasonId } from "@thatskyapplication/utility";
import { DYE_PURPLE, DYE_WHITE } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.TwoEmbersPart1;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Scarred-Sentry-Stance-icon.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3f/Scarred-Sentry-Cracked-Helmet-Hair-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 10, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/89/Scarred-Sentry-Plumed-Helmet-Hair-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_PURPLE,
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e2/Scarred-Sentry-Cape-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7f/Scarred-Sentry-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/06/Scarred-Sentry-Shoes-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bf/Scarred-Sentry-Shield-Prop-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9c/Random-dye-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_WHITE,
			cost: { seasonalCandles: { cost: 34, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4d/Scarred-Sentry-Spear-Prop-icon.png/revision/latest",
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
