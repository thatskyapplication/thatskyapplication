export const AIFrequencyType = {
	Disabled: 0,
	VeryRare: 1,
	Rare: 2,
	Normal: 3,
	Common: 4,
	VeryCommon: 5,
} as const satisfies Readonly<Record<string, number>>;

export const AI_FREQUENCY_TYPE_VALUES = Object.values(AIFrequencyType);
export type AIFrequencyTypes = (typeof AI_FREQUENCY_TYPE_VALUES)[number];
