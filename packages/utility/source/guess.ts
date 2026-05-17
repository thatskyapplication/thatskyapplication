export const GuessType = {
	Spirits: 0,
	SpiritsHard: 1,
	Events: 2,
} as const satisfies Readonly<Record<string, number>>;

export type GuessTypes = (typeof GuessType)[keyof typeof GuessType];
export const GUESS_TYPE_VALUES = Object.values(GuessType);

export interface GuessPacket {
	date: Date | null;
	streak: number;
	type: GuessTypes;
	user_id: string;
}

export type GuessUserRanking = Pick<GuessPacket, "user_id" | "type" | "streak"> & {
	rank: number;
};
