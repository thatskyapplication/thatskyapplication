import { Season } from "../../constants.js";
import type { FriendshipTreeData } from "../../nodes.js";

const SEASON = Season.Moomin as const;

export const CURRENT = [
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/MusicSheet.png/revision/latest",
			cost: { seasonalCandles: { cost: 8, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/aa/Spirit-of-Adventure-Hair-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/0b/Spirit-of-Adventure-Harmonica-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 20, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 26, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/0/01/Spirit-of-Adventure-Prop-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/c/cd/Spirit-of-Adventure-Cape-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 38, season: SEASON } },
		},
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Special-event-spell-icon.png/revision/latest",
			seasonIcon: SEASON,
		},
	],
	[
		{
			icon: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/52/Season-of-Moomin-Seasonal-Heart-icon.png/revision/latest",
			cost: { seasonalCandles: { cost: 3, season: SEASON } },
			seasonIcon: SEASON,
		},
	],
] as const satisfies FriendshipTreeData;
