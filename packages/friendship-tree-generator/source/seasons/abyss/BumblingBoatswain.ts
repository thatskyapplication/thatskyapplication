import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Abyss;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
			level: 2,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 8, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/04/SOAbyss-Bumbling-Boatswain-mask.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 12, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
			level: 3,
			cost: { seasonalCandles: { cost: 16, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
			level: 4,
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ed/SOAbyss-Bumbling-Boatswain-Cape-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/SOAbyss-Bumbling-Boatswain-hat.png/revision/latest",
			cost: { seasonalCandles: { cost: 24, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b5/SOAbyss-seasonal-heart.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/04/SOAbyss-Bumbling-Boatswain-mask.png/revision/latest",
			cost: { candles: 40 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
			cost: { hearts: 3 },
			level: 3,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b7/SOA-Bumbling-Boatswain-emote.png/revision/latest",
			cost: { hearts: 6 },
			level: 4,
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { candles: 15 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/6c/SOAbyss-Bumbling-Boatswain-hat.png/revision/latest",
			cost: { candles: 35 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ed/SOAbyss-Bumbling-Boatswain-Cape-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
] as const satisfies FriendshipTreeData;
