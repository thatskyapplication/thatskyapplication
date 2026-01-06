export enum RotationIdentifier {
	One = "1",
	Two = "2",
	Three = "3",
	Four = "4",
	Double = "double",
}

export const SEASONAL_CANDLES_PER_DAY = 5 as const;
export const SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS = 6 as const;
export const SEASON_PASS_SEASONAL_CANDLES_BONUS = 30 as const;

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
	BlueBird: 24,
	TwoEmbersPart1: 25,
	Migration: 26,
	Lightmending: 27,
} as const satisfies Readonly<Record<string, number>>;

const SEASON_ID_VALUES = Object.values(SeasonId);
export type SeasonIds = (typeof SEASON_ID_VALUES)[number];

export function isSeasonId(seasonId: number): seasonId is SeasonIds {
	return SEASON_ID_VALUES.includes(seasonId as SeasonIds);
}
