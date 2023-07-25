import { writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";

const canvas = createCanvas(1_024, 1_024);
const context = canvas.getContext("2d");

context.lineWidth = 5;
context.strokeStyle = "#FFFFFF";
context.fillStyle = "#FFFFFF";

const arrayBuffer = await (
	await fetch(
		"https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/18/Sky-Anniversary-Musical-shell-prop-icon-Morybel-0146.png/revision/latest",
	)
).arrayBuffer();

const icon = await loadImage(arrayBuffer);
context.strokeRect(canvas.width / 2, canvas.height - 200, 0, 75);
context.drawImage(icon, canvas.width / 2 - 36, canvas.height - 280, 75, 75);
context.strokeRect(canvas.width / 2, canvas.height - 280 - 75, 0, 75);

// context.strokeRect(75, 140, 150, 110);

// context.fillRect(130, 190, 40, 60);

// context.beginPath();
// context.moveTo(50, 140);
// context.lineTo(150, 60);
// context.lineTo(250, 140);
// context.closePath();
// context.stroke();

await writeFile("./simple.webp", await canvas.encode("webp"));
