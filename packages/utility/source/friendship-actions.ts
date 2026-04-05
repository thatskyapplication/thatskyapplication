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

type HighFivesRoute = `${string}/high_fives/${number}.gif`;

function highFivesRoute(cdnURL: string, id: number): HighFivesRoute {
	return `${cdnURL}/high_fives/${id}.gif`;
}

type HugsRoute = `${string}/hugs/${number}.gif`;

function hugsRoute(cdnURL: string, id: number): HugsRoute {
	return `${cdnURL}/hugs/${id}.gif`;
}

type HairTouslesRoute = `${string}/hair_tousles/${number}.gif`;

function hairTouslesRoute(cdnURL: string, id: number): HairTouslesRoute {
	return `${cdnURL}/hair_tousles/${id}.gif`;
}

type PlayFightsRoute = `${string}/play_fights/${number}.gif`;

function playFightsRoute(cdnURL: string, id: number): PlayFightsRoute {
	return `${cdnURL}/play_fights/${id}.gif`;
}

type KrillRoute = `${string}/krills/${number}.gif`;

function krillsRoute(cdnURL: string, id: number): KrillRoute {
	return `${cdnURL}/krills/${id}.gif`;
}

export const FriendshipActionTypeToRoute = {
	[FriendshipActionType.HighFive]: highFivesRoute,
	[FriendshipActionType.Hug]: hugsRoute,
	[FriendshipActionType.HairTousle]: hairTouslesRoute,
	[FriendshipActionType.PlayFight]: playFightsRoute,
	[FriendshipActionType.Krill]: krillsRoute,
} as const satisfies Readonly<
	Record<FriendshipActionTypes, (cdnURL: string, id: number) => string>
>;
