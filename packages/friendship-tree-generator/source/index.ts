import { writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import {
	formatEmojiURL,
	type Item,
	type SeasonalSpirit,
	SeasonId,
	type SeasonIds,
	type Snowflake,
	SpiritId,
	spirits,
} from "@thatskyapplication/utility";
import { fetch } from "undici";
import {
	ASSET_SIZE,
	BACKGROUND_PADDING,
	CosmeticToEmoji,
	HEIGHT_START_OFFSET,
	IMAGE_SIZE,
	LEVEL_OFFSET_X,
	LEVEL_OFFSET_Y,
	MISCELLANEOUS_EMOJIS,
	NEXT_HEIGHT_LEVEL,
	SEASON_ICON_MIDDLE_OFFSET_Y,
	SEASON_ICON_SIDES_OFFSET_X,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
	SeasonIdToSeasonalHeartEmoji,
	TEXT_COLOUR,
	WIDTH_MODIFIER,
} from "./constants.js";

const spirit = spirits().get(SpiritId.MigrationGuide) as SeasonalSpirit;
// const NODES = spirit.seasonal;
const NODES = spirit.current;
const hind = GlobalFonts.registerFromPath("./assets/Hind-Regular.ttf");

if (!hind) {
	throw new Error("Failed to load the Hind font.");
}

let canvasHeight = IMAGE_SIZE + HEIGHT_START_OFFSET;
canvasHeight += NEXT_HEIGHT_LEVEL * NODES.length;
const firstLevel = NODES[0]!;
const firstLevelHasCostAtStart = firstLevel.some((node) => node);

if (firstLevelHasCostAtStart) {
	canvasHeight += ASSET_SIZE;
}

const lastLevel = NODES.at(-1)!;

if (lastLevel.length > 0) {
	if (lastLevel.some((node) => node?.seasonPass)) {
		canvasHeight += SEASON_ICON_MIDDLE_OFFSET_Y;
	}

	canvasHeight -= NEXT_HEIGHT_LEVEL - HEIGHT_START_OFFSET;
}

const canvas = createCanvas(WIDTH_MODIFIER * 3.5, canvasHeight);
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);
const bgLeft = BACKGROUND_PADDING;
const bgTop = BACKGROUND_PADDING;
const bgWidth = canvas.width - BACKGROUND_PADDING * 2;
const bgHeight = canvas.height - BACKGROUND_PADDING * 2;
const bgRadius = 50;
context.fillStyle = "rgba(0, 0, 0, 0.6)";
context.beginPath();
context.roundRect(bgLeft, bgTop, bgWidth, bgHeight, bgRadius);
context.fill();
context.fillStyle = TEXT_COLOUR;
const imageSizeHalf = IMAGE_SIZE / 2;
const widthMiddle = canvas.width / 2;
const widthStartMiddle = widthMiddle - imageSizeHalf;
const widthStartLeft = widthStartMiddle - WIDTH_MODIFIER;
const widthStartRight = widthStartMiddle + WIDTH_MODIFIER;

let levelHeight =
	canvas.height - IMAGE_SIZE - (firstLevelHasCostAtStart ? ASSET_SIZE : 0) - HEIGHT_START_OFFSET;

interface CreateNodeOptions {
	node: Item;
	nodeIndex: number;
	seasonId?: SeasonIds | undefined;
}

async function createNode({ node, nodeIndex, seasonId }: CreateNodeOptions) {
	const { cost, level } = node;
	let dx: number;
	const dy = levelHeight;

	switch (nodeIndex) {
		case 0: {
			dx = widthStartLeft;
			break;
		}
		case 1: {
			dx = widthStartMiddle;
			break;
		}
		case 2: {
			dx = widthStartRight;
			break;
		}
		default:
			throw new Error(
				"Encountered an excess amount of friendship tree nodes on a particular level. A level has one base node that may have two extra nodes.",
			);
	}

	const emojiId = node.regularHeart
		? MISCELLANEOUS_EMOJIS.Heart.id
		: CosmeticToEmoji[node.cosmeticDisplay]?.id;

	if (!emojiId) {
		throw new Error(`No emoji found for cosmetic ${node.cosmeticDisplay}.`);
	}

	const arrayBuffer = await (await fetch(formatEmojiURL(emojiId))).arrayBuffer();
	const image = await loadImage(arrayBuffer);
	context.drawImage(image, dx, dy, IMAGE_SIZE, IMAGE_SIZE);
	context.font = "35px Hind";

	if (cost) {
		let currency: number;
		let emojiAssetId: Snowflake;

		if ("candles" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.Candle.id;
			currency = cost.candles;
		} else if ("hearts" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.Heart.id;
			currency = cost.hearts;
		} else if ("ascendedCandles" in cost) {
			emojiAssetId = MISCELLANEOUS_EMOJIS.AscendedCandle.id;
			currency = cost.ascendedCandles;
		} else if (seasonId !== undefined && cost.seasonalCandles.length > 0) {
			emojiAssetId =
				SeasonIdToSeasonalCandleEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalCandle.id;

			currency = cost.seasonalCandles[0]!.cost;
		} else if (
			seasonId !== undefined &&
			seasonId !== SeasonId.Gratitude &&
			seasonId !== SeasonId.Lightseekers &&
			cost.seasonalHearts.length > 0
		) {
			emojiAssetId =
				SeasonIdToSeasonalHeartEmoji[seasonId]?.id ?? MISCELLANEOUS_EMOJIS.SeasonalHeart.id;

			currency = cost.seasonalHearts[0]!.cost;
		} else {
			throw new Error("A cost was specified with no currency.");
		}

		const currencyString = currency.toString();
		let assetX = dx;
		const assetY = dy + IMAGE_SIZE;

		switch (currencyString.length) {
			case 1:
				assetX += 8;
				break;
			case 2:
				assetX += 0;
				break;
			case 3:
				assetX -= 8;
				break;
			default:
				throw new Error("Currency is too big. Is this truly correct?");
		}

		context.drawImage(
			await loadImage(await (await fetch(formatEmojiURL(emojiAssetId))).arrayBuffer()),
			assetX,
			assetY,
			ASSET_SIZE,
			ASSET_SIZE,
		);

		context.fillText(currencyString, assetX + ASSET_SIZE, assetY + 45);
	}

	if (node.seasonPass && seasonId !== undefined) {
		const seasonEmojiId = SeasonIdToSeasonalEmoji[seasonId]?.id;
		const seasonIconOffsetX = SEASON_ICON_SIDES_OFFSET_X;
		const seasonIconOffsetY = SEASON_ICON_MIDDLE_OFFSET_Y;

		if (seasonEmojiId) {
			context.drawImage(
				await loadImage(await (await fetch(formatEmojiURL(seasonEmojiId))).arrayBuffer()),
				dx - seasonIconOffsetX,
				dy - seasonIconOffsetY,
				ASSET_SIZE,
				ASSET_SIZE,
			);
		}
	}

	if (level) {
		context.fillText(`Lv${level}`, dx + IMAGE_SIZE - LEVEL_OFFSET_X, dy - LEVEL_OFFSET_Y);
	}
}

let nodesIndex = 0;

for (const nodes of NODES) {
	let nodeIndex = 0;

	for (const node of nodes) {
		if (node) {
			await createNode({ node, nodeIndex, seasonId: spirit.seasonId });
		}

		if (++nodeIndex === nodes.length && ++nodesIndex !== NODES.length) {
			levelHeight -= NEXT_HEIGHT_LEVEL;
		}
	}
}

await writeFile("./friendship-tree.webp", await canvas.encode("webp"));
