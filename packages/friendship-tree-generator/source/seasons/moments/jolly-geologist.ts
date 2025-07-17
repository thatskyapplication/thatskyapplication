import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Moments;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
			level: 2,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/81/Jolly-Geologist-Head-accessory-icon-Credit-Morybel.png/revision/latest",
			cost: { seasonalCandles: { cost: 8, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bf/Jolly-Geologist-Hair-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 34, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/05/Jolly-Geologist-Prop-icon-Credit-Morybel.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/c7/SOMoments-seasonal-heart-icon-Credit-Morybel.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/05/Jolly-Geologist-Prop-icon-Credit-Morybel.png/revision/latest",
			cost: { candles: 36 },
		},
		{
			icon: HEART_URL,
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/78/Jolly-Geologist-Emote-icon-Credit-Morybel.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/81/Jolly-Geologist-Head-accessory-icon-Credit-Morybel.png/revision/latest",
			cost: { candles: 42 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { candles: 15 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bf/Jolly-Geologist-Hair-icon-Credit-Morybel.png/revision/latest",
			cost: { candles: 48 },
		},
	],
] as const satisfies FriendshipTreeData;
