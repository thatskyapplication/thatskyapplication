import {
	type FriendshipTreeVariant,
	friendshipTreeImage as renderSpiritFriendshipTree,
} from "@thatskyapplication/friendship-tree-generator";
import type { Spirit } from "@thatskyapplication/utility";
import pino from "../pino.js";
import { CDN_URL } from "./configuration.js";

export function friendshipTreeFileName(variant: FriendshipTreeVariant) {
	return `friendship-tree-${variant}.webp`;
}

export function friendshipTreeImage(spirit: Spirit, variant: FriendshipTreeVariant) {
	return renderSpiritFriendshipTree(spirit, variant, { cdnURL: CDN_URL, logger: pino });
}
