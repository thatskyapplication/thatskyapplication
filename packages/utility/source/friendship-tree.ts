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
const HEIGHT_START_OFFSET = 25 as const;
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
const NEXT_HEIGHT_LEVEL_SIDES_OFFSET = 60 as const;
const TEXT_CLEARANCE = 4 as const;
const TEXT_SCALE_PRECISION = 0.01 as const;
const LEVEL_BADGE_KEY = "catalogue.friendship-tree-node-level-badge" as const;
export const FONT_SIZE = 35 as const;
export const LEVEL_BADGE_FONT_SIZE = 30 as const;
export const FRIENDSHIP_TREE_WIDTH = WIDTH_MODIFIER * 3.5;

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

function normaliseTop(layout: FriendshipTreeLayout): FriendshipTreeLayout {
	let minY = 0;

	for (const node of layout.nodes) {
		minY = Math.min(minY, node.y);

		if (node.seasonEmoji) {
			minY = Math.min(minY, node.seasonEmoji.y);
		}

		if (node.level) {
			minY = Math.min(minY, node.level.baselineY - LEVEL_BADGE_FONT_SIZE);
		}
	}

	for (const line of layout.lines) {
		minY = Math.min(minY, line.y1, line.y2);
	}

	if (minY >= 0) {
		return layout;
	}

	const shift = HEIGHT_START_OFFSET - minY;

	for (const node of layout.nodes) {
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

	for (const line of layout.lines) {
		line.y1 += shift;
		line.y2 += shift;
	}

	return { ...layout, height: layout.height + shift };
}

function legacyFriendshipTreeLayout(
	tree: FriendshipTree | LegacyFriendshipTree,
): FriendshipTreeLayout {
	const width = FRIENDSHIP_TREE_WIDTH;
	let height = IMAGE_SIZE + HEIGHT_START_OFFSET + NEXT_HEIGHT_LEVEL * tree.length;
	const firstNodeHasCostAtStart = tree[0]?.[0]?.cost !== null;

	if (firstNodeHasCostAtStart) {
		height += IMAGE_SIZE;
	}

	const lastNode = tree.at(-1);

	if (lastNode && lastNode.length === 1) {
		if (lastNode[0]?.seasonPass) {
			height += SEASON_ICON_MIDDLE_OFFSET_Y;
		}

		height -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
	}

	const imageSizeHalf = IMAGE_SIZE / 2;
	const widthMiddle = width / 2;
	const widthStartMiddle = widthMiddle - imageSizeHalf;
	const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
	const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;

	let heightStartMiddle =
		height - IMAGE_SIZE * (firstNodeHasCostAtStart ? 2 : 1) - HEIGHT_START_OFFSET;

	let heightStartSides = heightStartMiddle - NEXT_HEIGHT_LEVEL + NEXT_HEIGHT_LEVEL_SIDES_OFFSET;
	const nodes: PlacedFriendshipTreeNode[] = [];
	const lines: FriendshipTreeLine[] = [];

	const place = (
		node: Item,
		nodeIndex: number,
		sideLineUpX?: number,
		sideLineUpY?: number,
		customY?: number,
	) => {
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
				dy = customY ?? heightStartSides;
				assetXOffset = -(LINE_OFFSET + ASSET_OFFSET);
				currencyTextXOffset = 0;
				seasonOffsetX = SEASON_ICON_SIDES_OFFSET_X;
				seasonOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
				break;
			}
			default: {
				dx = widthStartRight;
				dy = customY ?? heightStartSides;
				assetXOffset = imageSizeHalf + LINE_OFFSET + ASSET_OFFSET;
				currencyTextXOffset = ASSET_SIZE;
				seasonOffsetX = SEASON_ICON_SIDES_OFFSET_X;
				seasonOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
				break;
			}
		}

		if (nodeIndex === 1) {
			lines.push({
				x1: sideLineUpX ?? widthMiddle - (imageSizeHalf + LINE_OFFSET),
				y1: sideLineUpY ?? heightStartMiddle + LINE_OFFSET,
				x2: sideLineUpX ?? widthStartLeft + IMAGE_SIZE + LINE_OFFSET,
				y2: dy + IMAGE_SIZE + LINE_OFFSET,
			});
		} else if (nodeIndex === 2) {
			lines.push({
				x1: sideLineUpX ?? widthMiddle + (imageSizeHalf + LINE_OFFSET),
				y1: sideLineUpY ?? heightStartMiddle + LINE_OFFSET,
				x2: sideLineUpX ?? widthStartRight - LINE_OFFSET,
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

		if ("children" in node && node.children.length > 0) {
			let sideLineUpYCalculation: number;
			let customHeightLevel: number;
			let heightIteration: number;

			if (node.thirdHeight) {
				sideLineUpYCalculation = dy - LINE_OFFSET / 1.5;
				customHeightLevel = dy - NEXT_HEIGHT_LEVEL / 1.5;
				heightIteration = NEXT_HEIGHT_LEVEL / 1.5;
			} else {
				sideLineUpYCalculation = dy - LINE_OFFSET;
				customHeightLevel = dy - NEXT_HEIGHT_LEVEL;
				heightIteration = NEXT_HEIGHT_LEVEL;
			}

			for (const child of node.children) {
				place(child, nodeIndex, dx + imageSizeHalf, sideLineUpYCalculation, customHeightLevel);
				sideLineUpYCalculation -= heightIteration;
				customHeightLevel -= heightIteration;
			}
		}
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
			lines.push({
				x1: widthMiddle,
				y1: heightStartMiddle - LINE_OFFSET,
				x2: widthMiddle,
				y2: heightStartMiddle - (NEXT_HEIGHT_LEVEL - IMAGE_SIZE - LINE_OFFSET),
			});

			heightStartMiddle -= NEXT_HEIGHT_LEVEL;
			heightStartSides -= NEXT_HEIGHT_LEVEL;
		}
	}

	return normaliseTop({ width, height, lines, nodes });
}

function modernFriendshipTreeLayout(tree: FriendshipTree): FriendshipTreeLayout {
	const width = FRIENDSHIP_TREE_WIDTH;
	let height = IMAGE_SIZE + HEIGHT_START_OFFSET + NEXT_HEIGHT_LEVEL * tree.length;
	const firstLevelHasNode = tree[0]?.some((node) => node) ?? false;

	if (firstLevelHasNode) {
		height += ASSET_SIZE;
	}

	const lastLevel = tree.at(-1);

	if (lastLevel && lastLevel.length > 0) {
		if (lastLevel.some((node) => node?.seasonPass)) {
			height += SEASON_ICON_MIDDLE_OFFSET_Y;
		}

		height -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
	}

	const imageSizeHalf = IMAGE_SIZE / 2;
	const widthStartMiddle = width / 2 - imageSizeHalf;
	const columnX = [
		widthStartMiddle - WIDTH_MODIFIER,
		widthStartMiddle,
		widthStartMiddle + WIDTH_MODIFIER,
	];

	let levelHeight =
		height - IMAGE_SIZE - (firstLevelHasNode ? ASSET_SIZE : 0) - HEIGHT_START_OFFSET;
	const nodes: PlacedFriendshipTreeNode[] = [];

	for (let levelIndex = 0; levelIndex < tree.length; levelIndex++) {
		const level = tree[levelIndex]!;

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

		if (levelIndex !== tree.length - 1) {
			levelHeight -= NEXT_HEIGHT_LEVEL;
		}
	}

	return normaliseTop({ width, height, lines: [], nodes });
}

function isModernFriendshipTree(
	tree: FriendshipTree | LegacyFriendshipTree,
	spirit: Spirit,
): boolean {
	if (spirit.isStandardSpirit()) {
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
