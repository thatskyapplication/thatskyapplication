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

	public friendshipActionRoute(type: FriendshipActionTypes, asset: string) {
		return `${FriendshipActionTypeToDirectory[type]}/${asset}.gif` as const;
	}

	public friendshipActionURL(type: FriendshipActionTypes, asset: string) {
		return `${this.cdnURL}/${this.friendshipActionRoute(type, asset)}` as const;
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
		[FriendshipActionType.HighFive]: (asset: string) =>
			this.friendshipActionURL(FriendshipActionType.HighFive, asset),
		[FriendshipActionType.Hug]: (asset: string) =>
			this.friendshipActionURL(FriendshipActionType.Hug, asset),
		[FriendshipActionType.HairTousle]: (asset: string) =>
			this.friendshipActionURL(FriendshipActionType.HairTousle, asset),
		[FriendshipActionType.PlayFight]: (asset: string) =>
			this.friendshipActionURL(FriendshipActionType.PlayFight, asset),
		[FriendshipActionType.Krill]: (asset: string) =>
			this.friendshipActionURL(FriendshipActionType.Krill, asset),
	} as const satisfies Readonly<Record<FriendshipActionTypes, (asset: string) => string>>;
}
