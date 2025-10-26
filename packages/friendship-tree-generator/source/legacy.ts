import { writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import {
	formatEmojiURL,
	type Item,
	type SeasonalSpirit,
	SeasonId,
	type SeasonIds,
	type Snowflake,
	SpiritId,
	spirits,
} from "@thatskyapplication/utility";
import { fetch } from "undici";
import {
	ASSET_OFFSET,
	ASSET_SIZE,
	ASSET_TEXT_DOUBLE_OFFSET,
	ASSET_TEXT_SINGLE_OFFSET,
	ASSET_TEXT_TRIPLE_OFFSET,
	CosmeticToEmoji,
	CURRENCY_TEXT_OFFSET,
	HEIGHT_START_OFFSET,
	IMAGE_SIZE,
	LEVEL_OFFSET_X,
	LEVEL_OFFSET_Y,
	LINE_COLOUR,
	LINE_OFFSET,
	LINE_WIDTH,
	MISCELLANEOUS_EMOJIS,
	NEXT_HEIGHT_LEVEL,
	NEXT_HEIGHT_LEVEL_SIDES_OFFSET,
	SEASON_ICON_MIDDLE_OFFSET_X,
	SEASON_ICON_MIDDLE_OFFSET_Y,
	SEASON_ICON_SIDES_OFFSET_X,
	SEASON_ICON_SIDES_OFFSET_Y,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
	SeasonIdToSeasonalHeartEmoji,
	WIDTH_MODIFIER,
} from "./constants.js";

const spirit = spirits().get(SpiritId.MigratingBirdWhisperer) as SeasonalSpirit;
const NODES = spirit.seasonal;
// const NODES = spirit.current;
const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");

if (!hind) {
	throw new Error("Failed to load the Hind font.");
}

let canvasHeight = IMAGE_SIZE + HEIGHT_START_OFFSET;
canvasHeight += NEXT_HEIGHT_LEVEL * NODES.length;
const firstNode = NODES[0]!;
const firstNodeHasCostAtStart = firstNode[0]?.cost !== null;

if (firstNodeHasCostAtStart) {
	canvasHeight += IMAGE_SIZE;
}

const lastNode = NODES.at(-1)!;

if (lastNode.length === 1) {
	if (lastNode[0]?.seasonPass) {
		canvasHeight += SEASON_ICON_MIDDLE_OFFSET_Y;
	}

	canvasHeight -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
}

const canvas = createCanvas(WIDTH_MODIFIER * 3.5, canvasHeight);
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);
context.lineWidth = LINE_WIDTH;
context.strokeStyle = LINE_COLOUR;
context.fillStyle = LINE_COLOUR;
const imageSizeHalf = IMAGE_SIZE / 2;
const widthMiddle = canvas.width / 2;
const widthStartMiddle = widthMiddle - imageSizeHalf;
const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;

let heightStartMiddle =
	canvas.height - IMAGE_SIZE * (firstNodeHasCostAtStart ? 2 : 1) - HEIGHT_START_OFFSET;

let heightStartSides = heightStartMiddle - NEXT_HEIGHT_LEVEL + NEXT_HEIGHT_LEVEL_SIDES_OFFSET;

interface CreateNodeOptions {
	node: Item;
	nodeIndex: number;
	seasonId?: SeasonIds | undefined;
	sideLineUpX?: number;
	sideLineUpY?: number;
	customY?: number;
}

async function createNode({
	node,
	nodeIndex,
	seasonId,
	sideLineUpX,
	sideLineUpY,
	customY,
}: CreateNodeOptions) {
	const { cost, level } = node;
	let dx: number;
	let dy: number;
	let assetXOffset: number;
	let currencyTextXOffset: number;
	let seasonIconOffsetX: number;
	let seasonIconOffsetY: number;

	switch (nodeIndex) {
		case 0: {
			dx = widthStartMiddle;
			dy = heightStartMiddle;
			assetXOffset = imageSizeHalf + LINE_OFFSET + ASSET_OFFSET;
			currencyTextXOffset = ASSET_SIZE;
			seasonIconOffsetX = SEASON_ICON_MIDDLE_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_MIDDLE_OFFSET_Y;
			break;
		}
		case 1: {
			dx = widthStartLeft;
			dy = customY ?? heightStartSides;
			assetXOffset = -(LINE_OFFSET + ASSET_OFFSET);
			currencyTextXOffset = 0;
			seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
			break;
		}
		case 2: {
			dx = widthStartRight;
			dy = customY ?? heightStartSides;
			assetXOffset = imageSizeHalf + LINE_OFFSET + ASSET_OFFSET;
			currencyTextXOffset = ASSET_SIZE;
			seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
			break;
		}
		default:
			throw new Error(
				"Encountered an excess amount of friendship tree nodes on a particular level. A level has one base node that may have two extra nodes.",
			);
	}

	if (nodeIndex > 0) {
		context.beginPath();

		if (nodeIndex === 1) {
			context.moveTo(
				sideLineUpX ?? widthMiddle - (imageSizeHalf + LINE_OFFSET),
				sideLineUpY ?? heightStartMiddle + LINE_OFFSET,
			);

			context.lineTo(
				sideLineUpX ?? widthStartLeft + IMAGE_SIZE + LINE_OFFSET,
				dy + IMAGE_SIZE + LINE_OFFSET,
			);
		} else {
			context.moveTo(
				sideLineUpX ?? widthMiddle + (imageSizeHalf + LINE_OFFSET),
				sideLineUpY ?? heightStartMiddle + LINE_OFFSET,
			);

			context.lineTo(sideLineUpX ?? widthStartRight - LINE_OFFSET, dy + IMAGE_SIZE + LINE_OFFSET);
		}

		context.stroke();
	}

	const emojiId = node.regularHeart
		? MISCELLANEOUS_EMOJIS.Heart.id
		: CosmeticToEmoji[node.cosmeticDisplay]?.id;

	if (!emojiId) {
		throw new Error(`No emoji found for cosmetic ${node.cosmeticDisplay}.`);
	}

	const arrayBuffer = await (await fetch(formatEmojiURL(emojiId))).arrayBuffer();
	const image = await loadImage(arrayBuffer);
	context.drawImage(image, dx, dy, IMAGE_SIZE, IMAGE_SIZE);
	context.font = "35px Hind";

	if (cost) {
		let currency: number;
		let emojiAssetId: Snowflake;

		if ("candles" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.Candle.id;
			currency = cost.candles;
		} else if ("hearts" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.Heart.id;
			currency = cost.hearts;
		} else if ("ascendedCandles" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.AscendedCandle.id;
			currency = cost.ascendedCandles;
		} else if (seasonId !== undefined && cost.seasonalCandles.length > 0) {
			emojiAssetId =
				SeasonIdToSeasonalCandleEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalCandle.id;

			currency = cost.seasonalCandles[0]!.cost;
		} else if (
			seasonId !== undefined &&
			seasonId !== SeasonId.Gratitude &&
			seasonId !== SeasonId.Lightseekers &&
			cost.seasonalHearts.length > 0
		) {
			emojiAssetId =
				SeasonIdToSeasonalHeartEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalHeart.id;

			currency = cost.seasonalHearts[0]!.cost;
		} else {
			throw new Error("A cost was specified with no currency.");
		}

		const assetX = dx + assetXOffset;
		const assetY = dy + IMAGE_SIZE + LINE_OFFSET;

		context.drawImage(
			await loadImage(await (await fetch(formatEmojiURL(emojiAssetId))).arrayBuffer()),
			assetX,
			assetY,
			ASSET_SIZE,
			ASSET_SIZE,
		);

		let currencyX = assetX + currencyTextXOffset;

		if (nodeIndex === 1) {
			if (currency >= 100) {
				currencyX -= ASSET_TEXT_TRIPLE_OFFSET;
			} else if (currency >= 10) {
				currencyX -= ASSET_TEXT_DOUBLE_OFFSET;
			} else {
				currencyX -= ASSET_TEXT_SINGLE_OFFSET;
			}
		}

		context.fillText(String(currency), currencyX, assetY + ASSET_SIZE + CURRENCY_TEXT_OFFSET);
	}

	if (node.seasonPass && seasonId !== undefined) {
		const seasonEmojiId = SeasonIdToSeasonalEmoji[seasonId]?.id;

		if (seasonEmojiId) {
			context.drawImage(
				await loadImage(await (await fetch(formatEmojiURL(seasonEmojiId))).arrayBuffer()),
				dx - seasonIconOffsetX,
				dy - seasonIconOffsetY,
				ASSET_SIZE,
				ASSET_SIZE,
			);
		}
	}

	if (level) {
		context.fillText(`Lv${level}`, dx + IMAGE_SIZE - LEVEL_OFFSET_X, dy - LEVEL_OFFSET_Y);
	}

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
			await createNode({
				node: child,
				nodeIndex: nodeIndex,
				seasonId,
				sideLineUpX: dx + imageSizeHalf,
				sideLineUpY: sideLineUpYCalculation,
				customY: customHeightLevel,
			});

			sideLineUpYCalculation -= heightIteration;
			customHeightLevel -= heightIteration;
		}
	}
}

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const node of nodes) {
		if (node) {
			await createNode({ node, nodeIndex, seasonId: spirit.seasonId });
		}

		if (++nodeIndex === nodes.length && ++nodesIndex !== NODES.length) {
			context.beginPath();
			context.moveTo(widthMiddle, heightStartMiddle - LINE_OFFSET);

			context.lineTo(
				widthMiddle,
				heightStartMiddle - (NEXT_HEIGHT_LEVEL - IMAGE_SIZE - LINE_OFFSET),
			);

			context.stroke();
			heightStartMiddle -= NEXT_HEIGHT_LEVEL;
			heightStartSides -= NEXT_HEIGHT_LEVEL;
		}
	}
}

await writeFile("./friendship-tree.webp", await canvas.encode("webp"));
