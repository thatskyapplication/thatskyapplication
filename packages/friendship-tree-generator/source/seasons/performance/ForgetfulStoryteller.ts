import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Performance as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/ad/SoPerformance_-_Forgetful_Storyteller-mask-icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/af/SoPerformance_-_Forgetful_Storyteller-hairstyle-icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: SEASON } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 26, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/10/SOPerformance_-Forgetful_Storyteller_-_Outfit-icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/94/SOPerformance_-Forgetful_Storyteller_-_Cape_-icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 34, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d5/SOPerformance-seasonal-heart-icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
			cost: { seasonalCandles: { cost: 3, season: SEASON } },
		},
	],
] as const satisfies FriendshipTreeData;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 4 },
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/ad/SoPerformance_-_Forgetful_Storyteller-mask-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 34 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3e/SoPerformance_-_Forgetful_Storyteller-emote-icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/af/SoPerformance_-_Forgetful_Storyteller-hairstyle-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 44 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/10/SOPerformance_-Forgetful_Storyteller_-_Outfit-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/94/SOPerformance_-Forgetful_Storyteller_-_Cape_-icon-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
] as const satisfies FriendshipTreeData;
