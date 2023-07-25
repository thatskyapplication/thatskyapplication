import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";
import NODES from "./nodes.js";

const canvas = createCanvas(1_024, 1_024);
const context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeStyle = "#FFFFFF";
context.fillStyle = "#FFFFFF";

const nodes = [];
for (let index = 0; index < NODES.length; index += 3) nodes.push(NODES.slice(index, index + 3));
let height = canvas.height - 150;

for (const level of nodes) {
	let nodeIndex = 0;

	for (const node of level) {
		const arrayBuffer = await (await fetch(node.icon)).arrayBuffer();
		const icon = await loadImage(arrayBuffer);
		context.drawImage(icon, canvas.width / 2 - 36, height, 75, 75);

		if (++nodeIndex !== level.length) {
			height -= 80;
			context.strokeRect(canvas.width / 2, height, 0, 75);
			height -= 80;
		}
	}
}

await writeFile("./simple.webp", await canvas.encode("webp"));
