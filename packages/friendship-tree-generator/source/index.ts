import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";
import { IMAGE_SIZE, WIDTH_MODIFIER } from "./constants.js";
import NODES from "./nodes.js";

const canvas = createCanvas(700, 900);
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);
context.lineWidth = 5;
context.strokeStyle = "#FFFFFF";
context.fillStyle = "#FFFFFF";
const widthStartMiddle = canvas.width / 2 - IMAGE_SIZE / 2;
const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;
let heightStartMiddle = canvas.height - 100;
let heightStartSides = canvas.height - 275;

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
				context.moveTo(canvas.width / 2 - (IMAGE_SIZE / 2 + 12.5), heightStartMiddle + 15);
				context.lineTo(widthStartLeft + 85, heightStartSides + 85);
			} else {
				context.moveTo(canvas.width / 2 + (IMAGE_SIZE / 2 + 12.5), heightStartMiddle + 15);
				context.lineTo(widthStartRight - 10, heightStartSides + 85);
			}

			context.stroke();
		}

		const arrayBuffer = await (await fetch(node.icon)).arrayBuffer();
		const icon = await loadImage(arrayBuffer);
		context.drawImage(icon, dx, dy, IMAGE_SIZE, IMAGE_SIZE);

		if (++nodeIndex === nodes.length && ++nodesIndex !== NODES.length) {
			context.beginPath();
			context.moveTo(canvas.width / 2, heightStartMiddle - 10);
			context.lineTo(canvas.width / 2, heightStartMiddle - (240 - IMAGE_SIZE - 10));
			context.stroke();
			heightStartMiddle -= 240;
			heightStartSides -= 240;
		}
	}
}

await writeFile("./simple.webp", await canvas.encode("webp"));
