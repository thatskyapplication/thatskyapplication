import { renderFriendshipTree } from "@thatskyapplication/friendship-tree-generator";
import type {
	FriendshipTree,
	LegacyFriendshipTree,
	Spirit,
	SpiritIds,
} from "@thatskyapplication/utility";
import pino from "../pino.js";
import { CDN_URL } from "./configuration.js";

const BACKGROUND_FETCH_TIMEOUT_MILLISECONDS = 10_000 as const;
const FRIENDSHIP_TREE_VARIANTS = ["seasonal", "current"] as const;
type FriendshipTreeVariant = (typeof FRIENDSHIP_TREE_VARIANTS)[number];
type FriendshipTreeImageKey = `${SpiritIds}-${FriendshipTreeVariant}`;
const friendshipTreeImages = new Map<FriendshipTreeImageKey, Promise<Buffer>>();
const cachedFriendshipTreeImages = new Set<FriendshipTreeImageKey>();

function friendshipTreeFor(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
): FriendshipTree | LegacyFriendshipTree | undefined {
	if (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) {
		return variant === "seasonal"
			? spirit.friendshipTrees.seasonal.friendshipTree
			: spirit.friendshipTrees.postSeason?.friendshipTree;
	}

	return variant === "current" ? spirit.displayFriendshipTree : undefined;
}

export function friendshipTreeVariants(spirit: Spirit) {
	return FRIENDSHIP_TREE_VARIANTS.filter(
		(variant) => (friendshipTreeFor(spirit, variant)?.length ?? 0) > 0,
	);
}

export function displayFriendshipTreeVariant(spirit: Spirit): FriendshipTreeVariant {
	return (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) && !spirit.friendshipTrees.postSeason
		? "seasonal"
		: "current";
}

export function friendshipTreeFileName(variant: FriendshipTreeVariant) {
	return `friendship-tree-${variant}.webp`;
}

async function friendshipTreeBackground(spiritId: SpiritIds) {
	try {
		const response = await fetch(`${CDN_URL}/spirits/${spiritId}/friendship_tree/background.webp`, {
			signal: AbortSignal.timeout(BACKGROUND_FETCH_TIMEOUT_MILLISECONDS),
		});

		if (response.ok) {
			return { background: new Uint8Array(await response.arrayBuffer()), cacheable: true };
		}

		if (response.status === 404) {
			return { background: undefined, cacheable: true };
		}

		pino.warn(
			{ spiritId, status: response.status },
			"Unexpected response fetching a friendship tree background.",
		);
	} catch (error) {
		pino.warn(error, "Failed to fetch a friendship tree background.");
	}

	return { background: undefined, cacheable: false };
}

export function isFriendshipTreeImageCached(spiritId: SpiritIds, variant: FriendshipTreeVariant) {
	return cachedFriendshipTreeImages.has(`${spiritId}-${variant}`);
}

export function friendshipTreeImage(spirit: Spirit, variant: FriendshipTreeVariant) {
	const key: FriendshipTreeImageKey = `${spirit.id}-${variant}`;
	const cached = friendshipTreeImages.get(key);

	if (cached) {
		return cached;
	}

	const image = (async () => {
		const tree = friendshipTreeFor(spirit, variant);

		if (!tree || tree.length === 0) {
			throw new Error(`Spirit ${spirit.id} has no ${variant} friendship tree.`);
		}

		const backgroundResult = friendshipTreeBackground(spirit.id);

		const buffer = await renderFriendshipTree({
			tree,
			seasonId: spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit.seasonId : undefined,
			background: backgroundResult.then(({ background }) => background),
		});

		if ((await backgroundResult).cacheable) {
			cachedFriendshipTreeImages.add(key);
		} else {
			friendshipTreeImages.delete(key);
		}

		return buffer;
	})();

	friendshipTreeImages.set(key, image);
	image.catch(() => friendshipTreeImages.delete(key));
	return image;
}
