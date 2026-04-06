export interface FriendshipActionsPacket {
	id: number;
	type: number;
	users: readonly string[];
	square: boolean;
	reference: string;
}

export const FriendshipActionType = {
	HighFive: 0,
	Hug: 1,
	HairTousle: 2,
	PlayFight: 3,
	Krill: 4,
} as const satisfies Readonly<Record<string, number>>;

const FRIENDSHIP_ACTION_TYPE_VALUES = Object.values(FriendshipActionType);

export type FriendshipActionTypes =
	(typeof FriendshipActionType)[keyof typeof FriendshipActionType];

export function isFriendshipActionType(type: number): type is FriendshipActionTypes {
	return FRIENDSHIP_ACTION_TYPE_VALUES.includes(type as FriendshipActionTypes);
}
