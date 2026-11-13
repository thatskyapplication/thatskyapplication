import type { Spirit } from "./models/spirits.js";
import { SeasonId } from "./season.js";
import type { MessageFormatting } from "./types/index.js";
import { sumCosts } from "./utility/functions.js";
import type { FriendshipTree, Item, LegacyFriendshipTree } from "./utility/spirits.js";

export const BACKGROUND_PADDING = 20 as const;
export const LINE_WIDTH = 5 as const;
export const TEXT_COLOUR = "#FFFFFF" as const;
export const LINE_COLOUR = "#FFFFFF" as const;
export const IMAGE_SIZE = 100 as const;
const WIDTH_MODIFIER = 200 as const;
const PANEL_CONTENT_GAP = 60 as const;
const LINE_OFFSET = 10 as const;
export const ASSET_SIZE = 55 as const;
const ASSET_OFFSET = 5 as const;
const SEASON_ICON_MIDDLE_OFFSET_X = 18 as const;
const SEASON_ICON_MIDDLE_OFFSET_Y = 42 as const;
const SEASON_ICON_SIDES_OFFSET_X = 35 as const;
const SEASON_ICON_SIDES_OFFSET_Y = 35 as const;
const LEVEL_OFFSET_X = 17 as const;
const LEVEL_OFFSET_Y = 2 as const;
const CURRENCY_TEXT_OFFSET = 10 as const;
const MODERN_CURRENCY_TEXT_OFFSET_Y = 45 as const;
const NEXT_HEIGHT_LEVEL = 240 as const;
const TEXT_CLEARANCE = 4 as const;
const TEXT_SCALE_PRECISION = 0.01 as const;
const LEVEL_BADGE_KEY = "catalogue.friendship-tree-node-level-badge" as const;
export const FONT_SIZE = 35 as const;
export const LEVEL_BADGE_FONT_SIZE = 30 as const;
export const FRIENDSHIP_TREE_WIDTH = WIDTH_MODIFIER * 3.5;
const LEGACY_NODE_SPACING = WIDTH_MODIFIER;
const LEGACY_BRANCHED_NODE_SPACING = Math.round(LEGACY_NODE_SPACING * Math.SQRT2);

export interface FriendshipTreeNodeCost {
	amount: number;
	iconX: number;
	iconY: number;
	textX: number;
	textBaselineY: number;
	leftNode: boolean;
}

export interface PlacedFriendshipTreeNode {
	item: Item;
	x: number;
	y: number;
	cost: FriendshipTreeNodeCost | null;
	seasonEmoji: { x: number; y: number } | null;
	level: { value: number; rightX: number; baselineY: number } | null;
}

export interface FriendshipTreeLine {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

interface FriendshipTreeTextExtent {
	ascent: number;
	left: number;
	right: number;
}

export interface FriendshipTreeTextMeasurer {
	cost(amount: number, anchorRight: boolean): FriendshipTreeTextExtent;
	level(value: number): FriendshipTreeTextExtent;
}

interface TextMeasuringContext {
	font: string;
	textAlign: string;
	measureText(text: string): {
		actualBoundingBoxAscent: number;
		actualBoundingBoxLeft: number;
		actualBoundingBoxRight: number;
	};
}

type Box = readonly [left: number, top: number, right: number, bottom: number];

interface PlacedText {
	extent: FriendshipTreeTextExtent;
	ignored?: Box;
	x: number;
	y: number;
}

export interface FriendshipTreeLayout {
	width: number;
	height: number;
	lines: FriendshipTreeLine[];
	nodes: PlacedFriendshipTreeNode[];
}

function nodeCostAmount(item: Item): number | null {
	if (!item.cost) {
		return null;
	}

	const entry = sumCosts([item.cost])[0];
	return entry ? entry.amount : null;
}

function modernAssetShift(amount: number): number {
	const length = String(amount).length;

	if (length === 1) {
		return 8;
	}

	if (length >= 3) {
		return -8;
	}

	return 0;
}

function paddedLayout(
	width: number,
	lines: FriendshipTreeLine[],
	nodes: PlacedFriendshipTreeNode[],
): FriendshipTreeLayout {
	const padding = BACKGROUND_PADDING + PANEL_CONTENT_GAP;

	if (nodes.length === 0) {
		return { width, height: padding * 2, lines, nodes };
	}

	let top = Number.POSITIVE_INFINITY;
	let bottom = Number.NEGATIVE_INFINITY;

	for (const node of nodes) {
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

	for (const line of lines) {
		top = Math.min(top, line.y1, line.y2);
		bottom = Math.max(bottom, line.y1, line.y2);
	}

	const shift = padding - top;

	for (const node of nodes) {
		node.y += shift;

		if (node.cost) {
			node.cost.iconY += shift;
			node.cost.textBaselineY += shift;
		}

		if (node.seasonEmoji) {
			node.seasonEmoji.y += shift;
		}

		if (node.level) {
			node.level.baselineY += shift;
		}
	}

	for (const line of lines) {
		line.y1 += shift;
		line.y2 += shift;
	}

	return { width, height: bottom + shift + padding, lines, nodes };
}

function legacyLevelHasSides(level: readonly (Item | null | undefined)[]) {
	return level.some((node, index) => index > 0 && Boolean(node));
}

function legacyLevelSpacing(level: readonly (Item | null | undefined)[]) {
	return legacyLevelHasSides(level) ? LEGACY_BRANCHED_NODE_SPACING : LEGACY_NODE_SPACING;
}

function legacyFriendshipTreeLayout(
	tree: FriendshipTree | LegacyFriendshipTree,
): FriendshipTreeLayout {
	const width = FRIENDSHIP_TREE_WIDTH;
	let heightStartMiddle = 0;
	const imageSizeHalf = IMAGE_SIZE / 2;
	const widthMiddle = width / 2;
	const widthStartMiddle = widthMiddle - imageSizeHalf;
	const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
	const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;
	const nodes: PlacedFriendshipTreeNode[] = [];
	const lines: FriendshipTreeLine[] = [];

	const place = (
		node: Item,
		nodeIndex: number,
		below?: PlacedFriendshipTreeNode,
	): PlacedFriendshipTreeNode => {
		let dx: number;
		let dy: number;
		let assetXOffset: number;
		let currencyTextXOffset: number;
		let seasonOffsetX: number;
		let seasonOffsetY: number;

		switch (nodeIndex) {
			case 0: {
				dx = widthStartMiddle;
				dy = heightStartMiddle;
				assetXOffset = imageSizeHalf + LINE_OFFSET + ASSET_OFFSET;
				currencyTextXOffset = ASSET_SIZE;
				seasonOffsetX = SEASON_ICON_MIDDLE_OFFSET_X;
				seasonOffsetY = SEASON_ICON_MIDDLE_OFFSET_Y;
				break;
			}
			case 1: {
				dx = widthStartLeft;
				dy = (below?.y ?? heightStartMiddle) - LEGACY_NODE_SPACING;
				assetXOffset = -(LINE_OFFSET + ASSET_OFFSET);
				currencyTextXOffset = 0;
				seasonOffsetX = SEASON_ICON_SIDES_OFFSET_X;
				seasonOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
				break;
			}
			default: {
				dx = widthStartRight;
				dy = (below?.y ?? heightStartMiddle) - LEGACY_NODE_SPACING;
				assetXOffset = imageSizeHalf + LINE_OFFSET + ASSET_OFFSET;
				currencyTextXOffset = ASSET_SIZE;
				seasonOffsetX = SEASON_ICON_SIDES_OFFSET_X;
				seasonOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
				break;
			}
		}

		if (below) {
			lines.push({
				x1: dx + imageSizeHalf,
				y1: below.y - LINE_OFFSET,
				x2: dx + imageSizeHalf,
				y2: dy + IMAGE_SIZE + LINE_OFFSET,
			});
		} else if (nodeIndex !== 0) {
			const direction = nodeIndex === 1 ? -1 : 1;

			lines.push({
				x1: widthMiddle + direction * (imageSizeHalf + LINE_OFFSET),
				y1: heightStartMiddle + LINE_OFFSET,
				x2: dx + imageSizeHalf - direction * (imageSizeHalf - LINE_OFFSET),
				y2: dy + IMAGE_SIZE + LINE_OFFSET,
			});
		}

		const placed: PlacedFriendshipTreeNode = {
			item: node,
			x: dx,
			y: dy,
			cost: null,
			seasonEmoji: null,
			level: null,
		};
		const amount = nodeCostAmount(node);

		if (amount !== null) {
			const iconX = dx + assetXOffset;
			const iconY = dy + IMAGE_SIZE + LINE_OFFSET;

			placed.cost = {
				amount,
				iconX,
				iconY,
				textX: iconX + currencyTextXOffset,
				textBaselineY: iconY + ASSET_SIZE + CURRENCY_TEXT_OFFSET,
				leftNode: nodeIndex === 1,
			};
		}

		if (node.seasonPass) {
			placed.seasonEmoji = { x: dx - seasonOffsetX, y: dy - seasonOffsetY };
		}

		if (node.level) {
			placed.level = {
				value: node.level,
				rightX: dx + IMAGE_SIZE + LEVEL_OFFSET_X,
				baselineY: dy - LEVEL_OFFSET_Y,
			};
		}

		nodes.push(placed);

		if ("children" in node) {
			let previous = placed;

			for (const child of node.children) {
				previous = place(child, nodeIndex, previous);
			}
		}

		return placed;
	};

	for (let levelIndex = 0; levelIndex < tree.length; levelIndex++) {
		const level = tree[levelIndex]!;
		let nodeIndex = 0;

		for (const node of level) {
			if (node) {
				place(node, nodeIndex);
			}

			nodeIndex++;
		}

		if (levelIndex !== tree.length - 1) {
			const spacing = legacyLevelSpacing(level);

			lines.push({
				x1: widthMiddle,
				y1: heightStartMiddle - LINE_OFFSET,
				x2: widthMiddle,
				y2: heightStartMiddle - spacing + IMAGE_SIZE + LINE_OFFSET,
			});

			heightStartMiddle -= spacing;
		}
	}

	return paddedLayout(width, lines, nodes);
}

function modernFriendshipTreeLayout(tree: FriendshipTree): FriendshipTreeLayout {
	const width = FRIENDSHIP_TREE_WIDTH;
	const imageSizeHalf = IMAGE_SIZE / 2;
	const widthStartMiddle = width / 2 - imageSizeHalf;
	const columnX = [
		widthStartMiddle - WIDTH_MODIFIER,
		widthStartMiddle,
		widthStartMiddle + WIDTH_MODIFIER,
	];

	let levelHeight = 0;
	const nodes: PlacedFriendshipTreeNode[] = [];

	for (const level of tree) {
		for (const [nodeIndex, node] of level.entries()) {
			if (!node) {
				continue;
			}

			const dx = columnX[nodeIndex]!;
			const dy = levelHeight;
			const placed: PlacedFriendshipTreeNode = {
				item: node,
				x: dx,
				y: dy,
				cost: null,
				seasonEmoji: null,
				level: null,
			};
			const amount = nodeCostAmount(node);

			if (amount !== null) {
				const iconX = dx + modernAssetShift(amount);
				const iconY = dy + IMAGE_SIZE;

				placed.cost = {
					amount,
					iconX,
					iconY,
					textX: iconX + ASSET_SIZE,
					textBaselineY: iconY + MODERN_CURRENCY_TEXT_OFFSET_Y,
					leftNode: false,
				};
			}

			if (node.seasonPass) {
				placed.seasonEmoji = {
					x: dx - SEASON_ICON_SIDES_OFFSET_X,
					y: dy - SEASON_ICON_MIDDLE_OFFSET_Y,
				};
			}

			if (node.level) {
				placed.level = {
					value: node.level,
					rightX: dx + IMAGE_SIZE + LEVEL_OFFSET_X,
					baselineY: dy - LEVEL_OFFSET_Y,
				};
			}

			nodes.push(placed);
		}

		levelHeight -= NEXT_HEIGHT_LEVEL;
	}

	return paddedLayout(width, [], nodes);
}

function isModernFriendshipTree(
	tree: FriendshipTree | LegacyFriendshipTree,
	spirit: Spirit,
): boolean {
	if (spirit.isStandardSpirit() || spirit.isElderSpirit()) {
		return true;
	}

	if (
		spirit.isGuideSpirit() &&
		spirit.seasonId >= SeasonId.Enchantment &&
		tree === spirit.friendshipTrees.postSeason?.friendshipTree
	) {
		return true;
	}

	return (
		(spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) && spirit.seasonId >= SeasonId.Migration
	);
}

export function friendshipTreeLayout(
	tree: FriendshipTree | LegacyFriendshipTree,
	spirit: Spirit,
): FriendshipTreeLayout {
	return isModernFriendshipTree(tree, spirit)
		? modernFriendshipTreeLayout(tree as FriendshipTree)
		: legacyFriendshipTreeLayout(tree);
}

function overlaps(a: Box, b: Box) {
	return a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
}

function crosses({ x1, y1, x2, y2 }: FriendshipTreeLine, [left, top, right, bottom]: Box) {
	const deltaX = x2 - x1;
	const deltaY = y2 - y1;
	let start = 0;
	let end = 1;

	for (const [direction, distance] of [
		[-deltaX, x1 - left],
		[deltaX, right - x1],
		[-deltaY, y1 - top],
		[deltaY, bottom - y1],
	] as const) {
		if (direction === 0) {
			if (distance < 0) {
				return false;
			}

			continue;
		}

		const ratio = distance / direction;

		if (direction < 0) {
			start = Math.max(start, ratio);
		} else {
			end = Math.min(end, ratio);
		}

		if (start > end) {
			return false;
		}
	}

	return true;
}

export function friendshipTreeTextScale(
	layout: FriendshipTreeLayout,
	measure: FriendshipTreeTextMeasurer,
) {
	const obstacles: Box[] = [];
	const texts: PlacedText[] = [];

	for (const node of layout.nodes) {
		obstacles.push([node.x, node.y, node.x + IMAGE_SIZE, node.y + IMAGE_SIZE]);

		if (node.seasonEmoji) {
			const { x, y } = node.seasonEmoji;
			obstacles.push([x, y, x + ASSET_SIZE, y + ASSET_SIZE]);
		}

		if (node.cost) {
			const { amount, iconX, iconY, leftNode, textBaselineY, textX } = node.cost;
			const costIcon: Box = [iconX, iconY, iconX + ASSET_SIZE, iconY + ASSET_SIZE];
			obstacles.push(costIcon);

			texts.push({
				extent: measure.cost(amount, leftNode),
				ignored: costIcon,
				x: textX,
				y: textBaselineY,
			});
		}

		if (node.level) {
			texts.push({
				extent: measure.level(node.level.value),
				x: node.level.rightX,
				y: node.level.baselineY,
			});
		}
	}

	const fits = (scale: number) => {
		const boxes = texts.map(({ extent, x, y }): Box => [
			x - extent.left * scale - TEXT_CLEARANCE,
			y - extent.ascent * scale - TEXT_CLEARANCE,
			x + extent.right * scale + TEXT_CLEARANCE,
			y,
		]);

		return boxes.every(
			(box, index) =>
				layout.lines.every((line) => !crosses(line, box)) &&
				obstacles.every(
					(obstacle) => obstacle === texts[index]!.ignored || !overlaps(box, obstacle),
				) &&
				boxes.every((other, otherIndex) => otherIndex <= index || !overlaps(box, other)),
		);
	};

	if (fits(1)) {
		return 1;
	}

	let low = 0;
	let high = 1;

	while (high - low > TEXT_SCALE_PRECISION) {
		const middle = (low + high) / 2;

		if (fits(middle)) {
			low = middle;
		} else {
			high = middle;
		}
	}

	return low;
}

export function friendshipTreeLevelBadge(
	level: number,
	t: MessageFormatting["t"],
	locale?: string,
) {
	return t(LEVEL_BADGE_KEY, { lng: locale, ns: "features", 1: level });
}

export function measureFriendshipTreeText(
	context: TextMeasuringContext,
	font: string,
	text: string,
	textAlign: "left" | "right",
): FriendshipTreeTextExtent {
	context.font = font;
	context.textAlign = textAlign;
	const metrics = context.measureText(text);

	return {
		ascent: metrics.actualBoundingBoxAscent,
		left: metrics.actualBoundingBoxLeft,
		right: metrics.actualBoundingBoxRight,
	};
}
