import type { Snowflake } from "discord-api-types/globals";
import { isAnimatedHash } from "./assets.js";
import { FriendshipActionType, type FriendshipActionTypes } from "./friendship-actions.js";

const FriendshipActionTypeToDirectory = {
	[FriendshipActionType.HighFive]: "high_fives",
	[FriendshipActionType.Hug]: "hugs",
	[FriendshipActionType.HairTousle]: "hair_tousles",
	[FriendshipActionType.PlayFight]: "play_fights",
	[FriendshipActionType.Krill]: "krills",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

export class CDN {
	public constructor(private readonly cdnURL: string) {}

	public friendshipActionRoute(type: FriendshipActionTypes, id: number) {
		return `${FriendshipActionTypeToDirectory[type]}/${id}.gif` as const;
	}

	public friendshipActionURL(type: FriendshipActionTypes, id: number) {
		return `${this.cdnURL}/${this.friendshipActionRoute(type, id)}` as const;
	}

	public skyProfileBannerRoute(userId: Snowflake, hash: string) {
		return `sky_profiles/banners/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}` as const;
	}

	public skyProfileBannerURL(userId: Snowflake, banner: string) {
		return new URL(this.skyProfileBannerRoute(userId, banner), this.cdnURL).href;
	}

	public skyProfileIconRoute(userId: Snowflake, hash: string) {
		return `sky_profiles/icons/${userId}/${hash}.${isAnimatedHash(hash) ? "gif" : "webp"}` as const;
	}

	public skyProfileIconURL(userId: Snowflake, icon: string) {
		return new URL(this.skyProfileIconRoute(userId, icon), this.cdnURL).href;
	}

	public readonly FriendshipActionTypeToURL = {
		[FriendshipActionType.HighFive]: (id: number) =>
			this.friendshipActionURL(FriendshipActionType.HighFive, id),
		[FriendshipActionType.Hug]: (id: number) =>
			this.friendshipActionURL(FriendshipActionType.Hug, id),
		[FriendshipActionType.HairTousle]: (id: number) =>
			this.friendshipActionURL(FriendshipActionType.HairTousle, id),
		[FriendshipActionType.PlayFight]: (id: number) =>
			this.friendshipActionURL(FriendshipActionType.PlayFight, id),
		[FriendshipActionType.Krill]: (id: number) =>
			this.friendshipActionURL(FriendshipActionType.Krill, id),
	} as const satisfies Readonly<Record<FriendshipActionTypes, (id: number) => string>>;
}
