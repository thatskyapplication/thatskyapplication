import { ok } from "node:assert/strict";
import { test } from "node:test";
import {
	ASSET_SIZE,
	FONT_SIZE,
	type FriendshipTreeLayout,
	IMAGE_SIZE,
	legacyFriendshipTreeLayout,
	modernFriendshipTreeLayout,
} from "../source/friendship-tree.js";
import { spirits } from "../source/kingdom/spirits.js";
import { SeasonId } from "../source/season.js";
import type { FriendshipTree, LegacyFriendshipTree } from "../source/utility/spirits.js";

function verticalBounds(layout: FriendshipTreeLayout) {
	let top = Infinity;
	let bottom = -Infinity;

	for (const node of layout.nodes) {
		top = Math.min(top, node.y);
		bottom = Math.max(bottom, node.y + IMAGE_SIZE);

		if (node.cost) {
			bottom = Math.max(bottom, node.cost.iconY + ASSET_SIZE, node.cost.textBaselineY);
		}

		if (node.seasonEmoji) {
			top = Math.min(top, node.seasonEmoji.y);
		}

		if (node.level) {
			top = Math.min(top, node.level.baselineY - FONT_SIZE);
		}
	}

	for (const line of layout.lines) {
		top = Math.min(top, line.y1, line.y2);
		bottom = Math.max(bottom, line.y1, line.y2);
	}

	return { top, bottom };
}

test("Friendship tree layouts keep everything inside their height.", () => {
	for (const spirit of spirits().values()) {
		const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit : null;
		const modern = seasonal !== null && seasonal.seasonId >= SeasonId.Migration;

		const trees: (FriendshipTree | LegacyFriendshipTree | undefined)[] = seasonal
			? [
					seasonal.friendshipTrees.seasonal.friendshipTree,
					seasonal.friendshipTrees.postSeason?.friendshipTree,
				]
			: [spirit.displayFriendshipTree];

		for (const tree of trees) {
			if (!tree || tree.length === 0) {
				continue;
			}

			const layout = modern
				? modernFriendshipTreeLayout(tree as FriendshipTree)
				: legacyFriendshipTreeLayout(tree);

			const { top, bottom } = verticalBounds(layout);
			ok(top >= 0, `Spirit ${spirit.id} starts ${-top} px above its layout.`);
			ok(
				bottom <= layout.height,
				`Spirit ${spirit.id} ends ${bottom - layout.height} px below its layout.`,
			);
		}
	}
});
