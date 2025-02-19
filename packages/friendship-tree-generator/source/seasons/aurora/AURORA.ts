import { QUEST_URL, Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.AURORA as const;

export const CURRENT = [
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/SoAurora-Ultimate-Expression-Dance-1-Icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 3 },
			level: 2,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/3a/15-Aurora.png/revision/latest",
			seasonIcon: SEASON,
			flatLine: true,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e2/SoAurora-Ultimate-Hair-icon-Morybel-0146.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5e/SoAurora-Ultimate-Outfit-icon-Morybel-0146.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 2, season: SEASON } },
				},
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/74/SoAurora-Ultimate-Cape-icon-Morybel-0146.png/revision/latest",
					seasonIcon: SEASON,
					cost: { seasonalHearts: { cost: 1, season: SEASON } },
				},
			],
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/SoAurora-Ultimate-Expression-Dance-1-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/SoAurora-Ultimate-Expression-Dance-1-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9b/SoAurora-Ultimate-Expression-Dance-1-Icon-Morybel-0146.png/revision/latest",
					cost: { hearts: 5 },
					level: 4,
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b3/SoAurora-Ultimate-Expression-Dance-2-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b3/SoAurora-Ultimate-Expression-Dance-2-Icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 3 },
			level: 2,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b3/SoAurora-Ultimate-Expression-Dance-2-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b3/SoAurora-Ultimate-Expression-Dance-2-Icon-Morybel-0146.png/revision/latest",
					cost: { hearts: 5 },
					level: 4,
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d9/Heart.png/revision/latest",
			cost: { candles: 3 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a6/SoAurora-Ultimate-Expression-Dance-3-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a6/SoAurora-Ultimate-Expression-Dance-3-Icon-Morybel-0146.png/revision/latest",
			cost: { hearts: 3 },
			level: 2,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a6/SoAurora-Ultimate-Expression-Dance-3-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 5 },
			level: 3,
			nodes: [
				{
					icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a6/SoAurora-Ultimate-Expression-Dance-3-Icon-Morybel-0146.png/revision/latest",
					cost: { hearts: 5 },
					level: 4,
				},
			],
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { candles: 20 },
		},
	],
	[
		{
			icon: QUEST_URL,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { candles: 20 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/49/SoAurora-Additional-Green-Outfit-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 200 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/17/SoAurora-Additional-Mask-Icon-Morybel-0146.png/revision/latest",
			cost: { candles: 50 },
		},
	],
] as const satisfies FriendshipTreeData;
