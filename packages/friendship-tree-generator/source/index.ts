import { writeFile } from "node:fs/promises";
import { GlobalFonts, createCanvas, loadImage } from "@napi-rs/canvas";
import { enGB } from "@thatskyapplication/utility";
import { fetch } from "undici";
import {
	ASSET_OFFSET,
	ASSET_SIZE,
	ASSET_TEXT_DOUBLE_OFFSET,
	ASSET_TEXT_SINGLE_OFFSET,
	ASSET_TEXT_TRIPLE_OFFSET,
	CURRENCY_TEXT_OFFSET,
	HEIGHT_START_OFFSET,
	IMAGE_SIZE,
	LEVEL_OFFSET_X,
	LEVEL_OFFSET_Y,
	LINE_COLOUR,
	LINE_OFFSET,
	LINE_WIDTH,
	NEXT_HEIGHT_LEVEL,
	NEXT_HEIGHT_LEVEL_SIDES_OFFSET,
	SEASON_ICON_MIDDLE_OFFSET_X,
	SEASON_ICON_MIDDLE_OFFSET_Y,
	SEASON_ICON_SIDES_OFFSET_X,
	SEASON_ICON_SIDES_OFFSET_Y,
	WIDTH_MODIFIER,
} from "./constants.js";
import NODES, { type Node } from "./nodes.js";

const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");

if (!hind) {
	throw new Error("Failed to load the Hind font.");
}

let canvasHeight = IMAGE_SIZE + HEIGHT_START_OFFSET;
canvasHeight += NEXT_HEIGHT_LEVEL * NODES.length;
const firstNode = NODES.at(0)!;
const firstNodeHasCostAtStart = firstNode.length > 0 && "cost" in firstNode[0]!;

if (firstNodeHasCostAtStart) {
	canvasHeight += IMAGE_SIZE;
}

const lastNode = NODES.at(-1)!;

if (lastNode.length === 1) {
	if ("seasonIcon" in lastNode[0]!) {
		canvasHeight += SEASON_ICON_MIDDLE_OFFSET_Y;
	}

	canvasHeight -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
}

const canvas = createCanvas(WIDTH_MODIFIER * 3, canvasHeight);
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
async function createNode(
	node: Node,
	nodeIndex: number,
	sideLineUpX?: number,
	sideLineUpY?: number,
	customY?: number,
) {
	const { icon, cost, level, seasonIcon, flatLine, nodes } = node;
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
			dy = flatLine ? heightStartMiddle : (customY ?? heightStartSides);
			assetXOffset = -(LINE_OFFSET + ASSET_OFFSET);
			currencyTextXOffset = 0;
			seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
			break;
		}
		case 2: {
			dx = widthStartRight;
			dy = flatLine ? heightStartMiddle : (customY ?? heightStartSides);
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

				sideLineUpY ??
					(flatLine ? heightStartMiddle + imageSizeHalf : heightStartMiddle) + LINE_OFFSET,
			);

			context.lineTo(
				sideLineUpX ?? widthStartLeft + IMAGE_SIZE + LINE_OFFSET,
				(flatLine ? heightStartMiddle + imageSizeHalf : dy + IMAGE_SIZE) + LINE_OFFSET,
			);
		} else {
			context.moveTo(
				sideLineUpX ?? widthMiddle + (imageSizeHalf + LINE_OFFSET),

				sideLineUpY ??
					(flatLine ? heightStartMiddle + imageSizeHalf : heightStartMiddle) + LINE_OFFSET,
			);

			context.lineTo(
				sideLineUpX ?? widthStartRight - LINE_OFFSET,
				(flatLine ? heightStartMiddle + imageSizeHalf : dy + IMAGE_SIZE) + LINE_OFFSET,
			);
		}

		context.stroke();
	}

	const arrayBuffer = await (await fetch(icon)).arrayBuffer();
	const image = await loadImage(arrayBuffer);
	context.drawImage(image, dx, dy, IMAGE_SIZE, IMAGE_SIZE);
	context.font = "35px Hind";

	if (cost) {
		let currency: number;
		let imageToDraw: string;

		if ("candles" in cost) {
			imageToDraw = "candle";
			currency = cost.candles;
		} else if ("hearts" in cost) {
			imageToDraw = "heart";
			currency = cost.hearts;
		} else if ("ascendedCandles" in cost) {
			imageToDraw = "ascended-candle";
			currency = cost.ascendedCandles;
		} else if ("seasonalCandles" in cost) {
			imageToDraw = `seasons/${enGB.general.seasons[cost.seasonalCandles.season].toLowerCase().replaceAll(/ /g, "-")}/candle`;
			currency = cost.seasonalCandles.cost;
		} else if ("seasonalHearts" in cost) {
			imageToDraw = `seasons/${enGB.general.seasons[cost.seasonalHearts.season].toLowerCase().replaceAll(/ /g, "-")}/heart`;
			currency = cost.seasonalHearts.cost;
		} else {
			throw new Error("A cost was specified with no currency.");
		}

		const assetX = dx + assetXOffset;
		const assetY = dy + IMAGE_SIZE + LINE_OFFSET;

		context.drawImage(
			await loadImage(`./assets/${imageToDraw}.webp`),
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

	if (seasonIcon) {
		context.drawImage(
			await loadImage(
				`./assets/seasons/${enGB.general.seasons[seasonIcon].toLowerCase().replaceAll(/ /g, "-")}/icon.webp`,
			),
			dx - seasonIconOffsetX,
			dy - seasonIconOffsetY,
			ASSET_SIZE,
			ASSET_SIZE,
		);
	}

	if (level) {
		context.fillText(`Lv${level}`, dx + IMAGE_SIZE - LEVEL_OFFSET_X, dy - LEVEL_OFFSET_Y);
	}

	if (nodes && nodes.length > 0) {
		let sideLineUpYCalculation = dy - LINE_OFFSET;
		let customHeightLevel = dy - NEXT_HEIGHT_LEVEL;

		for (const subnode of nodes) {
			await createNode(
				subnode,
				nodeIndex,
				dx + imageSizeHalf,
				sideLineUpYCalculation,
				customHeightLevel,
			);

			sideLineUpYCalculation -= NEXT_HEIGHT_LEVEL;
			customHeightLevel -= NEXT_HEIGHT_LEVEL;
		}
	}
}

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const node of nodes) {
		if (node) {
			await createNode(node, nodeIndex);
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
