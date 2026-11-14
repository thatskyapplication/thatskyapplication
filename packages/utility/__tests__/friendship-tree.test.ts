import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import {
	ASSET_SIZE,
	type FriendshipTreeLayout,
	friendshipTreeLayout,
	type FriendshipTreeTextMeasurer,
	friendshipTreeTextScale,
	IMAGE_SIZE,
	LEVEL_BADGE_FONT_SIZE,
} from "../source/friendship-tree.js";
import { spirits } from "../source/kingdom/spirits.js";
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
			top = Math.min(top, node.level.baselineY - LEVEL_BADGE_FONT_SIZE);
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

			const layout = friendshipTreeLayout(tree, spirit);
			const { top, bottom } = verticalBounds(layout);
			ok(top >= 0, `Spirit ${spirit.id} starts ${-top} px above its layout.`);

			ok(
				bottom <= layout.height,
				`Spirit ${spirit.id} ends ${bottom - layout.height} px below its layout.`,
			);
		}
	}
});

function badgeLayout(seasonPass: boolean): FriendshipTreeLayout {
	const [item] = spirits().values().next().value!.displayFriendshipTree.flat();

	return {
		width: 700,
		height: 400,
		lines: [],
		nodes: [
			{
				item: item!,
				x: 100,
				y: 100,
				cost: null,
				seasonEmoji: seasonPass ? { x: 65, y: 58 } : null,
				level: { value: 4, rightX: 217, baselineY: 98 },
			},
		],
	};
}

function badgeMeasurer(left: number): FriendshipTreeTextMeasurer {
	return {
		cost: () => ({ ascent: 25, left: 0, right: 20 }),
		level: () => ({ ascent: 22, left, right: 0 }),
	};
}

test("Friendship tree text keeps its size when nothing overlaps.", () => {
	equal(friendshipTreeTextScale(badgeLayout(true), badgeMeasurer(50)), 1);
	equal(friendshipTreeTextScale(badgeLayout(false), badgeMeasurer(107)), 1);
});

test("Friendship tree text shrinks until a badge clears a season-pass icon.", () => {
	const scale = friendshipTreeTextScale(badgeLayout(true), badgeMeasurer(107));
	ok(scale < 1, `Expected a smaller scale, got ${scale}.`);
	ok(scale > 0.8, `Expected only a small reduction, got ${scale}.`);
	ok(217 - 107 * scale >= 65 + ASSET_SIZE, `The badge still covers the icon at ${scale}.`);
});

test("Friendship tree text shrinks until a badge clears a line.", () => {
	const layout = { ...badgeLayout(false), lines: [{ x1: 150, y1: 0, x2: 150, y2: 90 }] };
	const scale = friendshipTreeTextScale(layout, badgeMeasurer(107));
	ok(scale < 1, `Expected a smaller scale, got ${scale}.`);
	ok(217 - 107 * scale >= 150, `The badge still crosses the line at ${scale}.`);
});
