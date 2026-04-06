import type { Snowflake } from "discord-api-types/globals";
import { isAnimatedHash } from "./assets.js";
import { FriendshipActionType, type FriendshipActionTypes } from "./friendship-actions.js";

export class CDN {
	public constructor(private readonly cdnURL: string) {}

	public friendshipActionHighFiveURL(id: number) {
		return `${this.cdnURL}/high_fives/${id}.gif` as const;
	}

	public friendshipActionHugURL(id: number) {
		return `${this.cdnURL}/hugs/${id}.gif` as const;
	}

	public friendshipActionHairTousleURL(id: number) {
		return `${this.cdnURL}/hair_tousles/${id}.gif` as const;
	}

	public friendshipActionPlayFightURL(id: number) {
		return `${this.cdnURL}/play_fights/${id}.gif` as const;
	}

	public friendshipActionKrillURL(id: number) {
		return `${this.cdnURL}/krills/${id}.gif` as const;
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
		[FriendshipActionType.HighFive]: (id: number) => this.friendshipActionHighFiveURL(id),
		[FriendshipActionType.Hug]: (id: number) => this.friendshipActionHugURL(id),
		[FriendshipActionType.HairTousle]: (id: number) => this.friendshipActionHairTousleURL(id),
		[FriendshipActionType.PlayFight]: (id: number) => this.friendshipActionPlayFightURL(id),
		[FriendshipActionType.Krill]: (id: number) => this.friendshipActionKrillURL(id),
	} as const satisfies Readonly<Record<FriendshipActionTypes, (id: number) => string>>;
}
