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
	BACKGROUND_PADDING,
	costEntryEmoji,
	FONT_SIZE,
	type FriendshipTree,
	type FriendshipTreeLayout,
	formatEmojiURL,
	friendshipTreeLayout,
	friendshipTreeLevelBadge,
	friendshipTreeTextScale,
	IMAGE_SIZE,
	type Item,
	type ItemCost,
	type LegacyFriendshipTree,
	LEVEL_BADGE_FONT_SIZE,
	LINE_COLOUR,
	LINE_WIDTH,
	measureFriendshipTreeText,
	type MessageFormatting,
	productionEmojis,
	type SeasonIds,
	type Snowflake,
	type Spirit,
	type SpiritIds,
	sumCosts,
	TEXT_COLOUR,
} from "@thatskyapplication/utility";

const FONTS = [
	{ file: "Lato-Light.ttf", family: "Lato" },
	{ file: "Lato-Regular.ttf", family: "Lato" },
	{ file: "GenJyuuGothic-Normal.subset.ttf", family: "Gen Jyuu Gothic" },
	{ file: "NotoSansKR-Regular.subset.otf", family: "Noto Sans KR" },
	{ file: "NotoSansSC-Regular.subset.otf", family: "Noto Sans SC" },
] as const;

const TEXT_FONT_FAMILY = "Lato" as const;

const LEVEL_BADGE_FONT_FAMILIES: Readonly<
	Partial<Record<string, (typeof FONTS)[number]["family"]>>
> = {
	ja: "Gen Jyuu Gothic",
	ko: "Noto Sans KR",
	"zh-CN": "Noto Sans SC",
	"zh-TW": "Noto Sans SC",
};

const EMOJI_FETCH_TIMEOUT_MILLISECONDS = 10_000 as const;
const BACKGROUND_FETCH_TIMEOUT_MILLISECONDS = 10_000 as const;
const IMAGE_DIMENSION = 1750 as const;
const PANEL_COLOUR = "rgba(0, 0, 0, 0.6)" as const;
const PANEL_RADIUS = 50 as const;
const TEXT_OUTLINE_COLOUR = "rgba(0, 0, 0, 0.8)" as const;
const TEXT_OUTLINE_WIDTH = 6 as const;
const FRIENDSHIP_TREE_VARIANTS = ["seasonal", "current"] as const;
const EMOJIS = productionEmojis();
const { itemEmoji, SeasonIdToSeasonalEmoji } = EMOJIS;

export type FriendshipTreeVariant = (typeof FRIENDSHIP_TREE_VARIANTS)[number];
type FriendshipTreeLocalisation = Pick<MessageFormatting, "locale" | "t">;

interface FriendshipTreeRenderOptions extends FriendshipTreeLocalisation {
	tree: FriendshipTree | LegacyFriendshipTree;
	seasonId?: SeasonIds | undefined;
	background?: Uint8Array | Promise<Uint8Array | undefined> | undefined;
}

interface FriendshipTreeImageOptions extends FriendshipTreeLocalisation {
	cdnURL: string;
	logger?: { warn(object: unknown, message: string): void } | undefined;
}

interface FriendshipTreeText {
	badgeFont: string;
	badges: ReadonlyMap<number, string>;
	costFont: string;
	outlineWidth: number;
}

for (const { file, family } of FONTS) {
	if (
		!GlobalFonts.registerFromPath(
			fileURLToPath(new URL(`../assets/${file}`, import.meta.url)),
			family,
		)
	) {
		throw new Error(`Failed to load ${file}.`);
	}
}

const measuringContext = createCanvas(1, 1).getContext("2d");
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

function friendshipTreeText(
	layout: FriendshipTreeLayout,
	{ locale, t }: FriendshipTreeLocalisation,
): FriendshipTreeText {
	const badges = new Map<number, string>();

	for (const { level } of layout.nodes) {
		if (level) {
			badges.set(level.value, friendshipTreeLevelBadge(level.value, t, locale));
		}
	}

	const family = LEVEL_BADGE_FONT_FAMILIES[locale];
	const badgeFamilies = family ? `${TEXT_FONT_FAMILY}, "${family}"` : TEXT_FONT_FAMILY;

	const scale = friendshipTreeTextScale(layout, {
		cost: (amount, anchorRight) =>
			measureFriendshipTreeText(
				measuringContext,
				`${FONT_SIZE}px ${TEXT_FONT_FAMILY}`,
				String(amount),
				anchorRight ? "right" : "left",
			),
		level: (value) =>
			measureFriendshipTreeText(
				measuringContext,
				`300 ${LEVEL_BADGE_FONT_SIZE}px ${badgeFamilies}`,
				badges.get(value)!,
				"right",
			),
	});

	return {
		badgeFont: `300 ${LEVEL_BADGE_FONT_SIZE * scale}px ${badgeFamilies}`,
		badges,
		costFont: `${FONT_SIZE * scale}px ${TEXT_FONT_FAMILY}`,
		outlineWidth: TEXT_OUTLINE_WIDTH * scale,
	};
}

function outlinedText(context: SKRSContext2D, text: string, x: number, y: number) {
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}

function drawPanel(
	context: SKRSContext2D,
	layout: FriendshipTreeLayout,
	images: ReadonlyMap<Snowflake, Image>,
	seasonId: SeasonIds | undefined,
	treeText: FriendshipTreeText,
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

	for (const line of layout.lines) {
		context.beginPath();
		context.moveTo(line.x1, line.y1);
		context.lineTo(line.x2, line.y2);
		context.stroke();
	}

	context.lineJoin = "round";
	context.lineWidth = treeText.outlineWidth;
	context.strokeStyle = TEXT_OUTLINE_COLOUR;

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

			context.font = treeText.costFont;
			context.textAlign = node.cost.leftNode ? "right" : "left";
			outlinedText(context, String(node.cost.amount), node.cost.textX, node.cost.textBaselineY);
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
			context.font = treeText.badgeFont;
			context.textAlign = "right";
			outlinedText(
				context,
				treeText.badges.get(node.level.value)!,
				node.level.rightX,
				node.level.baselineY,
			);
		}
	}
}

async function drawFriendshipTree(
	layout: FriendshipTreeLayout,
	seasonId: SeasonIds | undefined,
	background: FriendshipTreeRenderOptions["background"],
	treeText: FriendshipTreeText,
) {
	const [images, photo] = await Promise.all([
		emojiImagesFor(layout, seasonId),
		Promise.resolve(background).then((bytes) => (bytes ? loadImage(bytes) : null)),
	]);

	if (!photo) {
		const canvas = createCanvas(layout.width, layout.height);
		drawPanel(canvas.getContext("2d"), layout, images, seasonId, treeText);
		return canvas.encode("webp");
	}

	if (photo.width !== photo.height) {
		throw new Error(
			`Friendship tree backgrounds must be square, but this one is ${photo.width}x${photo.height}.`,
		);
	}

	const canvas = createCanvas(IMAGE_DIMENSION, IMAGE_DIMENSION);
	const context = canvas.getContext("2d");
	context.drawImage(photo, 0, 0, IMAGE_DIMENSION, IMAGE_DIMENSION);

	const scale = Math.min(1, IMAGE_DIMENSION / layout.height);

	context.translate(
		IMAGE_DIMENSION - layout.width * scale,
		(IMAGE_DIMENSION - layout.height * scale) / 2,
	);

	context.scale(scale, scale);
	drawPanel(context, layout, images, seasonId, treeText);
	return canvas.encode("webp");
}

export async function renderFriendshipTree({
	tree,
	seasonId,
	background,
	...localisation
}: FriendshipTreeRenderOptions) {
	const layout = friendshipTreeLayout(tree, seasonId);
	return drawFriendshipTree(layout, seasonId, background, friendshipTreeText(layout, localisation));
}

const friendshipTreeImages = new Map<string, Promise<Buffer>>();
const cachedFriendshipTreeImages = new Set<string>();

function friendshipTreeFor(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
): FriendshipTree | LegacyFriendshipTree | undefined {
	if (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) {
		return variant === "seasonal"
			? spirit.friendshipTrees.seasonal.friendshipTree
			: spirit.friendshipTrees.postSeason?.friendshipTree;
	}

	return variant === "current" ? spirit.displayFriendshipTree : undefined;
}

export function friendshipTreeVariants(spirit: Spirit) {
	return FRIENDSHIP_TREE_VARIANTS.filter(
		(variant) => (friendshipTreeFor(spirit, variant)?.length ?? 0) > 0,
	);
}

export function displayFriendshipTreeVariant(spirit: Spirit): FriendshipTreeVariant {
	return (spirit.isSeasonalSpirit() || spirit.isGuideSpirit()) && !spirit.friendshipTrees.postSeason
		? "seasonal"
		: "current";
}

function friendshipTreeDrawing(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
	localisation: FriendshipTreeLocalisation,
) {
	const tree = friendshipTreeFor(spirit, variant);

	if (!tree || tree.length === 0) {
		return null;
	}

	const seasonId =
		spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit.seasonId : undefined;

	const layout = friendshipTreeLayout(tree, seasonId);
	const treeText = friendshipTreeText(layout, localisation);

	const key =
		treeText.badges.size === 0
			? `${spirit.id}-${variant}`
			: `${spirit.id}-${variant}-${treeText.badgeFont}-${[...treeText.badges.values()].join("|")}`;

	return { key, layout, seasonId, treeText };
}

async function friendshipTreeBackground(
	spiritId: SpiritIds,
	{ cdnURL, logger }: FriendshipTreeImageOptions,
) {
	try {
		const response = await fetch(`${cdnURL}/spirits/${spiritId}/friendship_tree/background.webp`, {
			signal: AbortSignal.timeout(BACKGROUND_FETCH_TIMEOUT_MILLISECONDS),
		});

		if (response.ok) {
			return { background: new Uint8Array(await response.arrayBuffer()), cacheable: true };
		}

		if (response.status === 404) {
			return { background: undefined, cacheable: true };
		}

		logger?.warn(
			{ spiritId, status: response.status },
			"Unexpected response fetching a friendship tree background.",
		);
	} catch (error) {
		logger?.warn(error, "Failed to fetch a friendship tree background.");
	}

	return { background: undefined, cacheable: false };
}

export function isFriendshipTreeImageCached(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
	localisation: FriendshipTreeLocalisation,
) {
	const drawing = friendshipTreeDrawing(spirit, variant, localisation);
	return drawing !== null && cachedFriendshipTreeImages.has(drawing.key);
}

export function friendshipTreeImage(
	spirit: Spirit,
	variant: FriendshipTreeVariant,
	options: FriendshipTreeImageOptions,
) {
	const drawing = friendshipTreeDrawing(spirit, variant, options);

	if (!drawing) {
		return Promise.reject(new Error(`Spirit ${spirit.id} has no ${variant} friendship tree.`));
	}

	const { key, layout, seasonId, treeText } = drawing;
	const cached = friendshipTreeImages.get(key);

	if (cached) {
		return cached;
	}

	const image = (async () => {
		const backgroundResult = friendshipTreeBackground(spirit.id, options);

		const buffer = await drawFriendshipTree(
			layout,
			seasonId,
			backgroundResult.then(({ background }) => background),
			treeText,
		);

		if ((await backgroundResult).cacheable) {
			cachedFriendshipTreeImages.add(key);
		} else {
			friendshipTreeImages.delete(key);
		}

		return buffer;
	})();

	friendshipTreeImages.set(key, image);
	image.catch(() => friendshipTreeImages.delete(key));
	return image;
}
