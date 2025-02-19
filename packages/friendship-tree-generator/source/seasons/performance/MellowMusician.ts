import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Performance as const;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9f/Morybel-0146-SoPerformance_-_Mellow_Musician-mask-icon.png/revision/latest",
			cost: { candles: 32 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/16/Morybel-0146-SoPerformance_-_Mellow_Musician-cape-icon.png/revision/latest",
			cost: { candles: 70 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/72/Morybel-0146-SoPerformance_-_Mellow_Musician-hairstyle-icon.png/revision/latest",
			cost: { candles: 42 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/Morybel-0146-SoPerformance_-_Mellow_Musician-electrice-guitar-icon.png/revision/latest",
			cost: { candles: 80 },
		},
	],
] as const satisfies FriendshipTreeData;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9f/Morybel-0146-SoPerformance_-_Mellow_Musician-mask-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 14, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/16/Morybel-0146-SoPerformance_-_Mellow_Musician-cape-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 18, season: SEASON } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0d/Morybel-0146-SoPerformance_-_Mellow_Musician-icon.png/revision/latest",
			seasonIcon: SEASON,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/Morybel-0146-SoPerformance_-_Mellow_Musician-electrice-guitar-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/72/Morybel-0146-SoPerformance_-_Mellow_Musician-hairstyle-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 36, season: SEASON } },
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
