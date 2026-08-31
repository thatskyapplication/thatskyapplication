import { FriendshipActionType, type FriendshipActionTypes } from "@thatskyapplication/utility";

export const FriendshipActionTypeToLabel = {
	[FriendshipActionType.HighFive]: "High-five",
	[FriendshipActionType.Hug]: "Hug",
	[FriendshipActionType.HairTousle]: "Hair tousle",
	[FriendshipActionType.PlayFight]: "Play fight",
	[FriendshipActionType.Krill]: "Krill",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;
