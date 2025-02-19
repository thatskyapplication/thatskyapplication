import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Shattering as const;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/26/SOShattering-Light-hairstyle-royal-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 35, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ec/SOShattering-Light-Hair-accessory-Icon-Morybel-0146.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SOShattering-Light-Cape-Jellyfish-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 42, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/f8/SOShattering-Seasonal-heart-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: SEASON } },
			seasonIcon: SEASON,
		},
	],
] as const satisfies FriendshipTreeData;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/26/SOShattering-Light-hairstyle-royal-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 45 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ec/SOShattering-Light-Hair-accessory-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 50 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c1/SOShattering-Light-Cape-Jellyfish-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 80 },
		},
	],
] as const satisfies FriendshipTreeData;
