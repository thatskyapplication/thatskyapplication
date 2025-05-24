import { SeasonId } from "@thatskyapplication/utility";
import { DYE_WHITE } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.BlueBird;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e3/Royal-Hairtousle-Teen-emote-icon.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e3/Royal-Hairtousle-Teen-emote-icon.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/65/Royal-Hairtousle-Teen-Headpiece-icon.png/revision/latest",
			cost: { hearts: 3 },
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e3/Royal-Hairtousle-Teen-emote-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 17, season: seasonId } },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e3/Royal-Hairtousle-Teen-emote-icon.png/revision/latest",
			seasonIcon: seasonId,
			level: 4,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/27/Royal-Hairtousle-Teen-Outfit-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 25, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: DYE_WHITE,
			cost: { seasonalCandles: { cost: 29, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/16/Royal-Hairtousle-Teen-Cape-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/82/Blue-Bird-seasonal-heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
			seasonIcon: seasonId,
		},
	],
] as const satisfies FriendshipTreeData;
