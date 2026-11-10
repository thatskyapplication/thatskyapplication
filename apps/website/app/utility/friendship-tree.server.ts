import {
	friendshipTreeImage,
	type FriendshipTreeVariant,
	friendshipTreeVariants,
	isFriendshipTreeImageCached,
} from "@thatskyapplication/friendship-tree-generator";
import { type Spirit, spirits, WEBSITE_URL } from "@thatskyapplication/utility";
import { CDN_URL, SENTRY_RELEASE } from "~/config.server.js";
import pino from "~/pino.js";

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable" as const;
const SHORT_CACHE_CONTROL = "public, max-age=300" as const;
const FRIENDSHIP_TREE_FILES = new Map<string, { spirit: Spirit; variant: FriendshipTreeVariant }>();

for (const spirit of spirits().values()) {
	for (const variant of friendshipTreeVariants(spirit)) {
		FRIENDSHIP_TREE_FILES.set(`${spirit.id}-${variant}.webp`, { spirit, variant });
	}
}

export function friendshipTreeImageURLs(spirit: Spirit) {
	return friendshipTreeVariants(spirit).map((variant) => {
		const imageURL = new URL(`/spirits/friendship-trees/${spirit.id}-${variant}.webp`, WEBSITE_URL);

		if (SENTRY_RELEASE) {
			imageURL.searchParams.set("v", SENTRY_RELEASE);
		}

		return imageURL.href;
	});
}

export async function friendshipTreeImageResponse(fileName: string, version: string | null) {
	const file = FRIENDSHIP_TREE_FILES.get(fileName);

	if (!file) {
		return null;
	}

	const { spirit, variant } = file;
	const image = await friendshipTreeImage(spirit, variant, { cdnURL: CDN_URL, logger: pino });

	const immutable =
		SENTRY_RELEASE !== undefined &&
		version === SENTRY_RELEASE &&
		isFriendshipTreeImageCached(spirit.id, variant);

	return new Response(new Uint8Array(image), {
		headers: {
			"Cache-Control": immutable ? IMMUTABLE_CACHE_CONTROL : SHORT_CACHE_CONTROL,
			"Content-Type": "image/webp",
		},
	});
}
