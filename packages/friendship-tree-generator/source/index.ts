import { writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import {
	ASSET_SIZE,
	BACKGROUND_PADDING,
	FONT_SIZE,
	type FriendshipTree,
	formatEmojiURL,
	IMAGE_SIZE,
	modernFriendshipTreeLayout,
	type SeasonalSpirit,
	SpiritId,
	spirits,
	TEXT_COLOUR,
} from "@thatskyapplication/utility";
import { fetch } from "undici";
import {
	CosmeticToEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "./utility/emojis.js";
import { resolveCostEmojiId } from "./utility/functions.js";

const spirit = spirits().get(SpiritId.MigrationGuide) as SeasonalSpirit;
// const NODES = spirit.seasonal;
const NODES = spirit.current as FriendshipTree;
const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");

if (!hind) {
	throw new Error("Failed to load the Hind font.");
}

const { seasonId } = spirit;
const layout = modernFriendshipTreeLayout(NODES);
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
context.fillStyle = TEXT_COLOUR;
context.font = `${FONT_SIZE}px Hind`;

for (const node of layout.nodes) {
	const { item } = node;

	const emojiId = item.regularHeart
		? MISCELLANEOUS_EMOJIS.Heart.id
		: CosmeticToEmoji[item.cosmeticDisplay]?.id;

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
				await (await fetch(formatEmojiURL(resolveCostEmojiId(item.cost, seasonId)))).arrayBuffer(),
			),
			node.cost.iconX,
			node.cost.iconY,
			ASSET_SIZE,
			ASSET_SIZE,
		);

		context.fillText(String(node.cost.amount), node.cost.textX, node.cost.textBaselineY);
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
