import { CDN_URL } from "./routes.js";

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

type HighFivesRoute = `${typeof CDN_URL}/high_fives/${number}.gif`;

export function highFivesRoute(id: number): HighFivesRoute {
	return `${CDN_URL}/high_fives/${id}.gif`;
}

type HugsRoute = `${typeof CDN_URL}/hugs/${number}.gif`;

export function hugsRoute(id: number): HugsRoute {
	return `${CDN_URL}/hugs/${id}.gif`;
}

type HairTouslesRoute = `${typeof CDN_URL}/hair_tousles/${number}.gif`;

export function hairTouslesRoute(id: number): HairTouslesRoute {
	return `${CDN_URL}/hair_tousles/${id}.gif`;
}

type PlayFightsRoute = `${typeof CDN_URL}/play_fights/${number}.gif`;

export function playFightsRoute(id: number): PlayFightsRoute {
	return `${CDN_URL}/play_fights/${id}.gif`;
}

type KrillRoute = `${typeof CDN_URL}/krills/${number}.gif`;

export function krillsRoute(id: number): KrillRoute {
	return `${CDN_URL}/krills/${id}.gif`;
}
