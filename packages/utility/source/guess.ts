export const GuessType = {
	Spirits: 0,
	SpiritsHard: 1,
	Events: 2,
} as const satisfies Readonly<Record<string, number>>;

export type GuessTypes = (typeof GuessType)[keyof typeof GuessType];
export const GUESS_TYPE_VALUES = Object.values(GuessType);
