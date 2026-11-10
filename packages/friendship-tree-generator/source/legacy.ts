import { writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { fetch } from "undici";
import {
	ASSET_SIZE,
	ASSET_TEXT_DOUBLE_OFFSET,
	ASSET_TEXT_SINGLE_OFFSET,
	ASSET_TEXT_TRIPLE_OFFSET,
	BACKGROUND_PADDING,
	FONT_SIZE,
	formatEmojiURL,
	IMAGE_SIZE,
	LINE_COLOUR,
	LINE_WIDTH,
	legacyFriendshipTreeLayout,
	type SeasonalSpirit,
	SpiritId,
	spirits,
	TEXT_COLOUR,
} from "@thatskyapplication/utility";
import { itemEmoji, SeasonIdToSeasonalEmoji } from "./utility/emojis.js";
import { resolveCostEmojiId } from "./utility/functions.js";

const spirit = spirits().get(SpiritId.MigratingBirdWhisperer) as SeasonalSpirit;
const NODES = spirit.friendshipTrees.seasonal.friendshipTree;
// const NODES = spirit.friendshipTrees.postSeason?.friendshipTree ?? [];
const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");

if (!hind) {
	throw new Error("Failed to load the Hind font.");
}

const { seasonId } = spirit;
const layout = legacyFriendshipTreeLayout(NODES);
const canvas = createCanvas(layout.width, layout.height);
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);
context.fillStyle = "rgba(0, 0, 0, 0.6)";
context.beginPath();
context.roundRect(
	BACKGROUND_PADDING,
	BACKGROUND_PADDING,
	canvas.width - BACKGROUND_PADDING * 2,
	canvas.height - BACKGROUND_PADDING * 2,
	50,
);
context.fill();
context.lineWidth = LINE_WIDTH;
context.strokeStyle = TEXT_COLOUR;
context.fillStyle = LINE_COLOUR;
context.font = `${FONT_SIZE}px Hind`;

function legacyCurrencyShift(amount: number) {
	if (amount >= 100) {
		return ASSET_TEXT_TRIPLE_OFFSET;
	}

	if (amount >= 10) {
		return ASSET_TEXT_DOUBLE_OFFSET;
	}

	return ASSET_TEXT_SINGLE_OFFSET;
}

for (const line of layout.lines) {
	context.beginPath();
	context.moveTo(line.x1, line.y1);
	context.lineTo(line.x2, line.y2);
	context.stroke();
}

for (const node of layout.nodes) {
	const { item } = node;

	const emojiId = itemEmoji(item)?.id;

	if (!emojiId) {
		throw new Error(`No emoji found for cosmetic ${item.cosmeticDisplay}.`);
	}

	context.drawImage(
		await loadImage(await (await fetch(formatEmojiURL(emojiId))).arrayBuffer()),
		node.x,
		node.y,
		IMAGE_SIZE,
		IMAGE_SIZE,
	);

	if (node.cost && item.cost) {
		context.drawImage(
			await loadImage(
				await (await fetch(formatEmojiURL(resolveCostEmojiId(item.cost)))).arrayBuffer(),
			),
			node.cost.iconX,
			node.cost.iconY,
			ASSET_SIZE,
			ASSET_SIZE,
		);

		const currencyX = node.cost.leftNode
			? node.cost.textX - legacyCurrencyShift(node.cost.amount)
			: node.cost.textX;

		context.fillText(String(node.cost.amount), currencyX, node.cost.textBaselineY);
	}

	if (node.seasonEmoji && seasonId !== undefined) {
		const seasonEmojiId = SeasonIdToSeasonalEmoji[seasonId]?.id;

		if (seasonEmojiId) {
			context.drawImage(
				await loadImage(await (await fetch(formatEmojiURL(seasonEmojiId))).arrayBuffer()),
				node.seasonEmoji.x,
				node.seasonEmoji.y,
				ASSET_SIZE,
				ASSET_SIZE,
			);
		}
	}

	if (node.level) {
		context.fillText(`Lv${node.level.value}`, node.level.x, node.level.baselineY);
	}
}

await writeFile("./friendship-tree.webp", await canvas.encode("webp"));
