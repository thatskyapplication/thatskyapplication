export enum GuessType {
	Original = 0,
	Hard = 1,
}
export const GUESS_TYPE_VALUES = Object.values(GuessType).filter(
	(guessType) => typeof guessType === "number",
);

export const GuessTypeToName = {
	[GuessType.Original]: "Original",
	[GuessType.Hard]: "Hard",
} as const satisfies Readonly<Record<GuessType, string>>;
