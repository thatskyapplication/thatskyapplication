import {
	friendshipTreeImage,
	type FriendshipTreeVariant,
	friendshipTreeVariants,
	isFriendshipTreeImageCached,
} from "@thatskyapplication/friendship-tree-generator";
import { type Spirit, spirits } from "@thatskyapplication/utility";
import { CDN_URL, SENTRY_RELEASE } from "~/config.server.js";
import pino from "~/pino.js";
import type { Route } from "./+types/spirits_.friendship-trees.$file.js";

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable" as const;
const SHORT_CACHE_CONTROL = "public, max-age=300" as const;
const FRIENDSHIP_TREE_FILES = new Map<string, { spirit: Spirit; variant: FriendshipTreeVariant }>();

for (const spirit of spirits().values()) {
	for (const variant of friendshipTreeVariants(spirit)) {
		FRIENDSHIP_TREE_FILES.set(`${spirit.id}-${variant}.webp`, { spirit, variant });
	}
}

export const loader = async ({ params, url }: Route.LoaderArgs) => {
	const file = FRIENDSHIP_TREE_FILES.get(params.file);

	if (!file) {
		throw new Response(null, { status: 404 });
	}

	const { spirit, variant } = file;
	const image = await friendshipTreeImage(spirit, variant, { cdnURL: CDN_URL, logger: pino });

	const immutable =
		SENTRY_RELEASE !== undefined &&
		url.searchParams.get("v") === SENTRY_RELEASE &&
		isFriendshipTreeImageCached(spirit.id, variant);

	return new Response(new Uint8Array(image), {
		headers: {
			"Cache-Control": immutable ? IMMUTABLE_CACHE_CONTROL : SHORT_CACHE_CONTROL,
			"Content-Type": "image/webp",
		},
	});
};
