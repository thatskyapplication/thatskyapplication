export const GuessType = {
	Original: 0,
	Hard: 1,
} as const satisfies Readonly<Record<string, number>>;

export type GuessTypes = (typeof GuessType)[keyof typeof GuessType];
export const GUESS_TYPE_VALUES = Object.values(GuessType);
