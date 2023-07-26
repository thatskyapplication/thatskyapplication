import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { fetch } from "undici";
import {
	ASSET_LEFT_OFFSET,
	ASSET_MIDDLE_OFFSET,
	ASSET_RIGHT_OFFSET,
	ASSET_SIZE,
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
if (!hind) throw new Error("Failed to load the Hind font.");
let canvasHeight = IMAGE_SIZE + HEIGHT_START_OFFSET;
canvasHeight += NEXT_HEIGHT_LEVEL * NODES.length;
const lastNode = NODES.at(-1)!;

if (lastNode.length === 1) {
	if (lastNode[0]!.seasonIcon) canvasHeight += SEASON_ICON_MIDDLE_OFFSET_Y;
	canvasHeight -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
}

const canvas = createCanvas(canvasHeight, canvasHeight);
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
let heightStartMiddle = canvas.height - IMAGE_SIZE - HEIGHT_START_OFFSET;
let heightStartSides = heightStartMiddle - NEXT_HEIGHT_LEVEL + NEXT_HEIGHT_LEVEL_SIDES_OFFSET;

async function createNode(node: Node, nodeIndex: number, sideLineUpX?: number, sideLineUpY?: number, customY?: number) {
	const { icon, cost, level, seasonIcon, flatLine, nodes } = node;
	let dx;
	let dy;
	let costOffset;
	let seasonIconOffsetX;
	let seasonIconOffsetY;

	switch (nodeIndex) {
		case 0:
			dx = widthStartMiddle;
			dy = heightStartMiddle;
			costOffset = -ASSET_MIDDLE_OFFSET;
			seasonIconOffsetX = SEASON_ICON_MIDDLE_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_MIDDLE_OFFSET_Y;
			break;
		case 1:
			dx = widthStartLeft;
			dy = flatLine ? heightStartMiddle : customY ?? heightStartSides;
			costOffset = -ASSET_LEFT_OFFSET;
			seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
			break;
		case 2:
			dx = widthStartRight;
			dy = flatLine ? heightStartMiddle : customY ?? heightStartSides;
			costOffset = -ASSET_RIGHT_OFFSET;
			seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
			seasonIconOffsetY = SEASON_ICON_SIDES_OFFSET_Y;
			break;
		default:
			throw new Error(
				"Encountered an excess amount of friendship tree nodes on a particular level. A level has one base node may have two extra nodes.",
			);
	}

	if (nodeIndex > 0) {
		context.beginPath();

		if (nodeIndex === 1) {
			context.moveTo(
				sideLineUpX ?? widthMiddle - (imageSizeHalf + LINE_OFFSET),
				sideLineUpY ?? (flatLine ? heightStartMiddle + imageSizeHalf : heightStartMiddle) + LINE_OFFSET,
			);

			context.lineTo(
				sideLineUpX ?? widthStartLeft + IMAGE_SIZE + LINE_OFFSET,
				(flatLine ? heightStartMiddle + imageSizeHalf : dy + IMAGE_SIZE) + LINE_OFFSET,
			);
		} else {
			context.moveTo(
				sideLineUpX ?? widthMiddle + (imageSizeHalf + LINE_OFFSET),
				sideLineUpY ?? (flatLine ? heightStartMiddle + imageSizeHalf : heightStartMiddle) + LINE_OFFSET,
			);

			context.lineTo(
				sideLineUpX ?? widthStartRight - LINE_OFFSET,
				(flatLine ? heightStartMiddle + imageSizeHalf : dy + IMAGE_SIZE) + LINE_OFFSET,
			);
		}

		context.stroke();
	}

	const arrayBuffer = await (await fetch(icon)).arrayBuffer();
	const buffer = await loadImage(arrayBuffer);
	context.drawImage(buffer, dx, dy, IMAGE_SIZE, IMAGE_SIZE);
	context.font = "25px Hind";

	if (cost) {
		let imageToDraw;
		let currency;
		const assetX = dx + IMAGE_SIZE + LINE_OFFSET + costOffset;
		const assetY = dy + IMAGE_SIZE + LINE_OFFSET;

		if ("candles" in cost) {
			imageToDraw = "candle";
			currency = cost.candles;
		} else if ("hearts" in cost) {
			imageToDraw = "heart";
			currency = cost.hearts;
		} else if ("ascendedCandles" in cost) {
			imageToDraw = "ascended_candle";
			currency = cost.ascendedCandles;
		} else if ("seasonalCandles" in cost) {
			imageToDraw = `seasons/${cost.seasonalCandles.season.toLowerCase().replaceAll(" ", "_")}/candle`;
			currency = cost.seasonalCandles.cost;
		} else if ("seasonalHearts" in cost) {
			imageToDraw = `seasons/${cost.seasonalHearts.season.toLowerCase().replaceAll(" ", "_")}/heart`;
			currency = cost.seasonalHearts.cost;
		}

		context.drawImage(await loadImage(`./assets/${imageToDraw}.webp`), assetX, assetY, ASSET_SIZE, ASSET_SIZE);
		context.fillText(String(currency), assetX + ASSET_SIZE, assetY + ASSET_SIZE + CURRENCY_TEXT_OFFSET);
	}

	if (seasonIcon) {
		context.drawImage(
			await loadImage(`./assets/seasons/${seasonIcon.toLowerCase().replaceAll(" ", "_")}/icon.webp`),
			dx - seasonIconOffsetX,
			dy - seasonIconOffsetY,
			ASSET_SIZE,
			ASSET_SIZE,
		);
	}

	if (level) context.fillText(`Lv${level}`, dx + IMAGE_SIZE - LEVEL_OFFSET_X, dy - LEVEL_OFFSET_Y);

	if (nodes?.length) {
		let sideLineUpYCalculation = dy - LINE_OFFSET;
		let customHeightLevel = dy - NEXT_HEIGHT_LEVEL;

		for (const subnode of nodes) {
			await createNode(subnode, nodeIndex, dx + imageSizeHalf, sideLineUpYCalculation, customHeightLevel);
			sideLineUpYCalculation -= NEXT_HEIGHT_LEVEL;
			customHeightLevel -= NEXT_HEIGHT_LEVEL;
		}
	}
}

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const node of nodes) {
		if (node) await createNode(node, nodeIndex);

		if (++nodeIndex === nodes.length && ++nodesIndex !== NODES.length) {
			context.beginPath();
			context.moveTo(widthMiddle, heightStartMiddle - LINE_OFFSET);
			context.lineTo(widthMiddle, heightStartMiddle - (NEXT_HEIGHT_LEVEL - IMAGE_SIZE - LINE_OFFSET));
			context.stroke();
			heightStartMiddle -= NEXT_HEIGHT_LEVEL;
			heightStartSides -= NEXT_HEIGHT_LEVEL;
		}
	}
}

await writeFile("./friendship_tree.webp", await canvas.encode("webp"));
