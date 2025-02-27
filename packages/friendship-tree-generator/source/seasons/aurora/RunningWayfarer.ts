import { SeasonId } from "@thatskyapplication/utility";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.AURORA;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/SoAurora-Running-Wayfarer-Emote-Icon-Morybel-0146.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/SoAurora-Running-Wayfarer-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/54/SoAurora-Running-Wayfarer-Mask-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b1/SoAurora-Running-Wayfarer-Hair-Icon-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/SoAurora-Running-Wayfarer-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 3,
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b0/SoAurora-Running-Wayfarer-Emote-Icon-Morybel-0146.png/revision/latest",
			level: 4,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/be/SoAurora-Running-Wayfarer-Cape-Icon-Morybel-0146.png/revision/latest",
			cost: { seasonalCandles: { cost: 30, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6a/SoAurora-Seasonal-Heart-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
