import { SeasonId } from "@thatskyapplication/utility";
import { HEART_URL } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const seasonId = SeasonId.Flight;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/42/Season_of_Flight_-_Light_Whisperer_icon.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Icon_season_of_flight_headpiece_1_light_whisperer.png/revision/latest",
			cost: { candles: 45 },
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
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { candles: 5 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/63/Icon_season_of_flight_hair_4_light_whisperer.png/revision/latest",
			cost: { candles: 50 },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9f/Icon_season_of_flight_pants_4_light_whisperer.png/revision/latest",
			cost: { candles: 65 },
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/92/Season_of_flight_icon_cape_light_whisperer-Morybel-0146.png/revision/latest",
			cost: { candles: 70 },
		},
	],
] as const satisfies FriendshipTreeData;

export const SEASONAL = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/42/Season_of_Flight_-_Light_Whisperer_icon.png/revision/latest",
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			cost: { seasonalCandles: { cost: 14, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Icon_season_of_flight_headpiece_1_light_whisperer.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/63/Icon_season_of_flight_hair_4_light_whisperer.png/revision/latest",
			cost: { seasonalCandles: { cost: 22, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/5CandlesSpell.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/74/Color-trail.png/revision/latest",
			cost: { seasonalCandles: { cost: 26, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/92/Season_of_flight_icon_cape_light_whisperer-Morybel-0146.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/9f/Icon_season_of_flight_pants_4_light_whisperer.png/revision/latest",
			cost: { seasonalCandles: { cost: 28, season: seasonId } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/74/Color-trail.png/revision/latest",
			seasonIcon: seasonId,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/21/Season_Of_Flight_Heart.png/revision/latest",
			seasonIcon: seasonId,
			cost: { seasonalCandles: { cost: 3, season: seasonId } },
		},
	],
] as const satisfies FriendshipTreeData;
