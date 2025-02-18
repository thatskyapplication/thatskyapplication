export enum GuessDifficultyLevel {
	Original = 0,
	Hard = 1,
}
export const GUESS_DIFFICULTY_LEVEL_VALUES = Object.values(GuessDifficultyLevel).filter(
	(guessDifficultyLevel) => typeof guessDifficultyLevel === "number",
);

export const GuessDifficultyLevelToName = {
	[GuessDifficultyLevel.Original]: "Original",
	[GuessDifficultyLevel.Hard]: "Hard",
} as const satisfies Readonly<Record<GuessDifficultyLevel, string>>;
