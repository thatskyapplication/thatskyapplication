import { fileURLToPath } from "node:url";
import {
	createCanvas,
	GlobalFonts,
	type Image,
	loadImage,
	type SKRSContext2D,
} from "@napi-rs/canvas";
import { fetch } from "undici";
import {
	ASSET_SIZE,
	ASSET_TEXT_DOUBLE_OFFSET,
	ASSET_TEXT_SINGLE_OFFSET,
	ASSET_TEXT_TRIPLE_OFFSET,
	BACKGROUND_PADDING,
	costEntryEmoji,
	FONT_SIZE,
	type FriendshipTree,
	type FriendshipTreeLayout,
	formatEmojiURL,
	friendshipTreeLayout,
	IMAGE_SIZE,
	type Item,
	type ItemCost,
	type LegacyFriendshipTree,
	LINE_COLOUR,
	LINE_WIDTH,
	productionEmojis,
	type SeasonIds,
	type Snowflake,
	sumCosts,
	TEXT_COLOUR,
} from "@thatskyapplication/utility";

const FONT_PATH = fileURLToPath(new URL("../assets/Hind-Regular.ttf", import.meta.url));
const EMOJI_FETCH_TIMEOUT_MILLISECONDS = 10_000 as const;
const IMAGE_DIMENSION = 1750 as const;
const PANEL_COLOUR = "rgba(0, 0, 0, 0.6)" as const;
const PANEL_RADIUS = 50 as const;
const EMOJIS = productionEmojis();
const { itemEmoji, SeasonIdToSeasonalEmoji } = EMOJIS;

interface FriendshipTreeRenderOptions {
	tree: FriendshipTree | LegacyFriendshipTree;
	seasonId?: SeasonIds | undefined;
	background?: Uint8Array | Promise<Uint8Array | undefined> | undefined;
}

if (!GlobalFonts.registerFromPath(FONT_PATH)) {
	throw new Error("Failed to load the Hind font.");
}

const emojiImages = new Map<Snowflake, Promise<Image>>();

function emojiImage(id: Snowflake) {
	const cached = emojiImages.get(id);

	if (cached) {
		return cached;
	}

	const image = fetch(formatEmojiURL(id), {
		signal: AbortSignal.timeout(EMOJI_FETCH_TIMEOUT_MILLISECONDS),
	}).then(async (response) => {
		if (!response.ok) {
			throw new Error(`The CDN returned ${response.status} for emoji ${id}.`);
		}

		return loadImage(await response.arrayBuffer());
	});

	emojiImages.set(id, image);
	image.catch(() => emojiImages.delete(id));
	return image;
}

function seasonEmojiId(seasonId: SeasonIds | undefined) {
	return seasonId === undefined ? undefined : SeasonIdToSeasonalEmoji[seasonId]?.id;
}

function itemEmojiId(item: Item) {
	const id = itemEmoji(item)?.id;

	if (!id) {
		throw new Error(`No emoji found for cosmetic ${item.cosmeticDisplay}.`);
	}

	return id;
}

function resolveCostEmojiId(cost: ItemCost) {
	const [entry] = sumCosts([cost]);
	const emoji = entry && costEntryEmoji(entry, EMOJIS);

	if (!emoji) {
		throw new Error("A cost was specified with no currency.");
	}

	return emoji.id;
}

async function emojiImagesFor(layout: FriendshipTreeLayout, seasonId: SeasonIds | undefined) {
	const ids = new Set<Snowflake>();
	const seasonalEmojiId = seasonEmojiId(seasonId);

	for (const { item, cost, seasonEmoji } of layout.nodes) {
		ids.add(itemEmojiId(item));

		if (cost && item.cost) {
			ids.add(resolveCostEmojiId(item.cost));
		}

		if (seasonEmoji && seasonalEmojiId) {
			ids.add(seasonalEmojiId);
		}
	}

	return new Map(
		await Promise.all(Array.from(ids, async (id) => [id, await emojiImage(id)] as const)),
	);
}

function legacyCurrencyShift(amount: number) {
	if (amount >= 100) {
		return ASSET_TEXT_TRIPLE_OFFSET;
	}

	if (amount >= 10) {
		return ASSET_TEXT_DOUBLE_OFFSET;
	}

	return ASSET_TEXT_SINGLE_OFFSET;
}

function drawPanel(
	context: SKRSContext2D,
	layout: FriendshipTreeLayout,
	images: ReadonlyMap<Snowflake, Image>,
	seasonId: SeasonIds | undefined,
) {
	const image = (id: Snowflake) => images.get(id)!;
	const seasonalEmojiId = seasonEmojiId(seasonId);
	context.translate(0.5, 0.5);
	context.fillStyle = PANEL_COLOUR;
	context.beginPath();

	context.roundRect(
		BACKGROUND_PADDING,
		BACKGROUND_PADDING,
		layout.width - BACKGROUND_PADDING * 2,
		layout.height - BACKGROUND_PADDING * 2,
		PANEL_RADIUS,
	);

	context.fill();
	context.lineWidth = LINE_WIDTH;
	context.strokeStyle = LINE_COLOUR;
	context.fillStyle = TEXT_COLOUR;
	context.font = `${FONT_SIZE}px Hind`;

	for (const line of layout.lines) {
		context.beginPath();
		context.moveTo(line.x1, line.y1);
		context.lineTo(line.x2, line.y2);
		context.stroke();
	}

	for (const node of layout.nodes) {
		const { item } = node;
		context.drawImage(image(itemEmojiId(item)), node.x, node.y, IMAGE_SIZE, IMAGE_SIZE);

		if (node.cost && item.cost) {
			context.drawImage(
				image(resolveCostEmojiId(item.cost)),
				node.cost.iconX,
				node.cost.iconY,
				ASSET_SIZE,
				ASSET_SIZE,
			);

			const textX = node.cost.leftNode
				? node.cost.textX - legacyCurrencyShift(node.cost.amount)
				: node.cost.textX;

			context.fillText(String(node.cost.amount), textX, node.cost.textBaselineY);
		}

		if (node.seasonEmoji && seasonalEmojiId) {
			context.drawImage(
				image(seasonalEmojiId),
				node.seasonEmoji.x,
				node.seasonEmoji.y,
				ASSET_SIZE,
				ASSET_SIZE,
			);
		}

		if (node.level) {
			context.fillText(`Lv${node.level.value}`, node.level.x, node.level.baselineY);
		}
	}
}

export async function renderFriendshipTree({
	tree,
	seasonId,
	background,
}: FriendshipTreeRenderOptions) {
	const layout = friendshipTreeLayout(tree, seasonId);

	const [images, photo] = await Promise.all([
		emojiImagesFor(layout, seasonId),
		Promise.resolve(background).then((bytes) => (bytes ? loadImage(bytes) : null)),
	]);

	if (!photo) {
		const canvas = createCanvas(layout.width, layout.height);
		drawPanel(canvas.getContext("2d"), layout, images, seasonId);
		return canvas.encode("webp");
	}

	const canvas = createCanvas(IMAGE_DIMENSION, IMAGE_DIMENSION);
	const context = canvas.getContext("2d");
	const cover = Math.max(IMAGE_DIMENSION / photo.width, IMAGE_DIMENSION / photo.height);
	const photoWidth = photo.width * cover;
	const photoHeight = photo.height * cover;

	context.drawImage(
		photo,
		(IMAGE_DIMENSION - photoWidth) / 2,
		(IMAGE_DIMENSION - photoHeight) / 2,
		photoWidth,
		photoHeight,
	);

	const scale = Math.min(1, IMAGE_DIMENSION / layout.height);

	context.translate(
		IMAGE_DIMENSION - layout.width * scale,
		(IMAGE_DIMENSION - layout.height * scale) / 2,
	);

	context.scale(scale, scale);
	drawPanel(context, layout, images, seasonId);
	return canvas.encode("webp");
}
