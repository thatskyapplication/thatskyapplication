export const GUESS_RANK_SQL =
	"row_number() over (partition by type order by streak desc, date asc nulls first, user_id)::int" as const;

export const GuessType = {
	Spirits: 0,
	SpiritsHard: 1,
	Events: 2,
} as const satisfies Readonly<Record<string, number>>;

export type GuessTypes = (typeof GuessType)[keyof typeof GuessType];
export const GUESS_TYPE_VALUES = Object.values(GuessType);
