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
	WIDTH_MODIFIER,
} from "./constants.js";
import NODES from "./nodes.js";

const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");
if (!hind) throw new Error("Failed to load the Hind font.");
let canvasHeight = IMAGE_SIZE + HEIGHT_START_OFFSET;
canvasHeight += NEXT_HEIGHT_LEVEL * NODES.length;
if (NODES.at(-1)!.length === 1) canvasHeight -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
const canvas = createCanvas(700, canvasHeight);
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

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const { icon, cost, level } of nodes) {
		let dy;
		let dx;
		let costOffset;

		switch (nodeIndex) {
			case 0:
				dx = widthStartMiddle;
				dy = heightStartMiddle;
				costOffset = -ASSET_MIDDLE_OFFSET;
				break;
			case 1:
				dx = widthStartLeft;
				dy = heightStartSides;
				costOffset = -ASSET_LEFT_OFFSET;
				break;
			case 2:
				dx = widthStartRight;
				dy = heightStartSides;
				costOffset = -ASSET_RIGHT_OFFSET;
				break;
			default:
				throw new Error(
					"Encountered an excess amount of friendship tree nodes on a particular level. A level has one base node and potentially 2 extra nodes.",
				);
		}

		if (nodeIndex > 0) {
			context.beginPath();

			if (nodeIndex === 1) {
				context.moveTo(widthMiddle - (imageSizeHalf + LINE_OFFSET), heightStartMiddle + LINE_OFFSET);
				context.lineTo(widthStartLeft + IMAGE_SIZE + LINE_OFFSET, heightStartSides + IMAGE_SIZE + LINE_OFFSET);
			} else {
				context.moveTo(widthMiddle + (imageSizeHalf + LINE_OFFSET), heightStartMiddle + LINE_OFFSET);
				context.lineTo(widthStartRight - LINE_OFFSET, heightStartSides + IMAGE_SIZE + LINE_OFFSET);
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
				imageToDraw = "seasonal_candle";
				currency = cost.seasonalCandles;
			} else if ("seasonalHearts" in cost) {
				imageToDraw = "seasonal_heart";
				currency = cost.seasonalHearts;
			}

			context.drawImage(await loadImage(`./assets/${imageToDraw}.webp`), assetX, assetY, ASSET_SIZE, ASSET_SIZE);
			context.fillText(String(currency), assetX + ASSET_SIZE, assetY + ASSET_SIZE + CURRENCY_TEXT_OFFSET);
		}

		if (level) context.fillText(`Lv${level}`, dx + IMAGE_SIZE - LEVEL_OFFSET_X, dy - LEVEL_OFFSET_Y);

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
