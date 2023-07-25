import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";
import NODES from "./nodes.js";

const canvas = createCanvas(1_024, 1_024);
const context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeStyle = "#FFFFFF";
context.fillStyle = "#FFFFFF";
const widthStartMiddle = canvas.width / 2 - 36;
const widthStartLeft = widthStartMiddle - 130;
const widthStartRight = widthStartMiddle + 130;
let heightStartMiddle = canvas.height - 150;
let heightStartSides = canvas.height - 230;

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

		const arrayBuffer = await (await fetch(node.icon)).arrayBuffer();
		const icon = await loadImage(arrayBuffer);
		context.drawImage(icon, dx, dy, 75, 75);

		if (++nodeIndex === nodes.length && ++nodesIndex !== NODES.length) {
			context.strokeRect(canvas.width / 2, heightStartMiddle - 80, 0, 75);
			heightStartMiddle -= 160;
			heightStartSides -= 160;
		}
	}
}

await writeFile("./simple.webp", await canvas.encode("webp"));
