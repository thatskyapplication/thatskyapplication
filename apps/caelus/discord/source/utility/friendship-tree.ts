import type { Locale } from "@discordjs/core";
import { t } from "i18next";
import {
	type FriendshipTreeVariant,
	friendshipTreeImage as renderSpiritFriendshipTree,
	isFriendshipTreeImageCached as isSpiritFriendshipTreeImageCached,
} from "@thatskyapplication/friendship-tree-generator";
import type { Spirit } from "@thatskyapplication/utility";
import pino from "../pino.js";
import { CDN_URL } from "./configuration.js";

export function friendshipTreeFileName(variant: FriendshipTreeVariant) {
	return `friendship-tree-${variant}.webp`;
}

export function friendshipTreeImage(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
	locale: Locale,
) {
	return renderSpiritFriendshipTree(spirit, variant, { cdnURL: CDN_URL, locale, logger: pino, t });
}

export function isFriendshipTreeImageCached(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
	locale: Locale,
) {
	return isSpiritFriendshipTreeImageCached(spirit, variant, { locale, t });
}
