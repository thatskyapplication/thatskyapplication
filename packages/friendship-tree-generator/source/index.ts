import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";
import {
	IMAGE_SIZE,
	LINE_OFFSET,
	NEXT_HEIGHT_LEVEL,
	NEXT_HEIGHT_LEVEL_SIDES_OFFSET,
	WIDTH_MODIFIER,
} from "./constants.js";
import NODES from "./nodes.js";

const imageSizeHalf = IMAGE_SIZE / 2;
const canvas = createCanvas(700, 900);
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);
context.lineWidth = 5;
context.strokeStyle = "#FFFFFF";
context.fillStyle = "#FFFFFF";
const widthMiddle = canvas.width / 2;
const widthStartMiddle = widthMiddle - imageSizeHalf;
const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;
let heightStartMiddle = canvas.height * 0.9;
let heightStartSides = heightStartMiddle - NEXT_HEIGHT_LEVEL + NEXT_HEIGHT_LEVEL_SIDES_OFFSET;

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const node of nodes) {
		let dy;
		let dx;

		switch (nodeIndex) {
			case 0:
				dx = widthStartMiddle;
				dy = heightStartMiddle;
				break;
			case 1:
				dx = widthStartLeft;
				dy = heightStartSides;
				break;
			case 2:
				dx = widthStartRight;
				dy = heightStartSides;
				break;
			default:
				throw new Error("Invalid node index.");
		}

		if (nodeIndex > 0) {
			context.beginPath();

			if (nodeIndex === 1) {
				context.moveTo(widthMiddle - (imageSizeHalf + 12.5), heightStartMiddle + LINE_OFFSET);
				context.lineTo(widthStartLeft + IMAGE_SIZE + LINE_OFFSET, heightStartSides + IMAGE_SIZE + LINE_OFFSET);
			} else {
				context.moveTo(widthMiddle + (imageSizeHalf + 12.5), heightStartMiddle + LINE_OFFSET);
				context.lineTo(widthStartRight - LINE_OFFSET, heightStartSides + IMAGE_SIZE + LINE_OFFSET);
			}

			context.stroke();
		}

		const arrayBuffer = await (await fetch(node.icon)).arrayBuffer();
		const icon = await loadImage(arrayBuffer);
		context.drawImage(icon, dx, dy, IMAGE_SIZE, IMAGE_SIZE);

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

await writeFile("./simple.webp", await canvas.encode("webp"));
