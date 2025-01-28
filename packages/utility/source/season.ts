export const SeasonId = {
	Gratitude: 0,
	Lightseekers: 1,
	Belonging: 2,
	Rhythm: 3,
	Enchantment: 4,
	Sanctuary: 5,
	Prophecy: 6,
	Dreams: 7,
	Assembly: 8,
	LittlePrince: 9,
	Flight: 10,
	Abyss: 11,
	Performance: 12,
	Shattering: 13,
	AURORA: 14,
	Remembrance: 15,
	Passage: 16,
	Moments: 17,
	Revival: 18,
	NineColouredDeer: 19,
	Nesting: 20,
	Duets: 21,
	Moomin: 22,
	Radiance: 23,
} as const satisfies Readonly<Record<string, number>>;

export type SeasonIds = (typeof SeasonId)[keyof typeof SeasonId];

export function isSeasonId(seasonId: number): seasonId is SeasonIds {
	return Object.values(SeasonId).includes(seasonId as SeasonIds);
}
