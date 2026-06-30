import {
	ASSET_SIZE,
	type Emoji,
	FONT_SIZE,
	FRIENDSHIP_TREE_WIDTH,
	type FriendshipTree as FriendshipTreeData,
	type FriendshipTreeLayout,
	HEIGHT_START_OFFSET,
	IMAGE_SIZE,
	type Item,
	type LegacyFriendshipTree,
	LINE_WIDTH,
	legacyFriendshipTreeLayout,
	modernFriendshipTreeLayout,
	type PlacedFriendshipTreeNode,
	SeasonId,
	type SeasonIds,
	sumCosts,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { type CSSProperties, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { useItemOwnership } from "~/hooks/use-item-ownership.js";
import {
	CosmeticToEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { Tooltip } from "../Tooltip";
import { costEntryEmoji } from "./CostList";

type AnyFriendshipTree = FriendshipTreeData | LegacyFriendshipTree;

const WIDTH = FRIENDSHIP_TREE_WIDTH;

const UNOWNED_ICON_CLASS = "opacity-25" as const;

interface FriendshipTreeProps {
	data: ReadonlySet<number>;
	locale: string;
	seasonId?: SeasonIds | undefined;
	tree: AnyFriendshipTree;
}

function resolveNodeCost(item: Item, locale: string): { emoji: Emoji | null; text: string } | null {
	if (!item.cost) {
		return null;
	}

	const entry = sumCosts([item.cost])[0];

	if (!entry) {
		return null;
	}

	return { emoji: costEntryEmoji(entry), text: entry.amount.toLocaleString(locale) };
}

function normaliseTop(layout: FriendshipTreeLayout): FriendshipTreeLayout {
	let minY = 0;

	for (const node of layout.nodes) {
		minY = Math.min(minY, node.y);

		if (node.seasonEmoji) {
			minY = Math.min(minY, node.seasonEmoji.y);
		}

		if (node.level) {
			minY = Math.min(minY, node.level.baselineY - FONT_SIZE);
		}
	}

	for (const line of layout.lines) {
		minY = Math.min(minY, line.y1, line.y2);
	}

	if (minY >= 0) {
		return layout;
	}

	const shift = HEIGHT_START_OFFSET - minY;

	for (const node of layout.nodes) {
		node.y += shift;

		if (node.cost) {
			node.cost.iconY += shift;
			node.cost.textBaselineY += shift;
		}

		if (node.seasonEmoji) {
			node.seasonEmoji.y += shift;
		}

		if (node.level) {
			node.level.baselineY += shift;
		}
	}

	for (const line of layout.lines) {
		line.y1 += shift;
		line.y2 += shift;
	}

	return { ...layout, height: layout.height + shift };
}

function boxStyle(x: number, y: number, w: number, h: number, height: number): CSSProperties {
	return {
		left: `${(x / WIDTH) * 100}%`,
		top: `${(y / height) * 100}%`,
		width: `${(w / WIDTH) * 100}%`,
		height: `${(h / height) * 100}%`,
	};
}

function textStyle(
	x: number,
	baselineY: number,
	height: number,
	anchorRight = false,
): CSSProperties {
	return {
		...(anchorRight
			? { right: `${((WIDTH - x) / WIDTH) * 100}%` }
			: { left: `${(x / WIDTH) * 100}%` }),
		top: `${(baselineY / height) * 100}%`,
		fontSize: `${(FONT_SIZE / WIDTH) * 100}cqw`,
		transform: "translateY(-100%)",
	};
}

function TreeNode({
	data,
	height,
	locale,
	node,
	seasonId,
}: {
	data: ReadonlySet<number>;
	height: number;
	locale: string;
	node: PlacedFriendshipTreeNode;
	seasonId: SeasonIds | undefined;
}) {
	const { t } = useTranslation();
	const { item } = node;
	const { owned, toggle } = useItemOwnership(item, data);
	const name = t(item.translation.key, { ns: "general", number: item.translation.number });
	const cost = node.cost ? resolveNodeCost(item, locale) : null;

	const seasonEmoji =
		node.seasonEmoji && seasonId !== undefined ? SeasonIdToSeasonalEmoji[seasonId] : null;

	const emoji = item.regularHeart
		? MISCELLANEOUS_EMOJIS.Heart
		: CosmeticToEmoji[item.cosmeticDisplay];

	return (
		<>
			<Tooltip content={name}>
				<button
					aria-label={name}
					aria-pressed={owned}
					className="absolute flex cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/10"
					onClick={toggle}
					style={boxStyle(node.x, node.y, IMAGE_SIZE, IMAGE_SIZE, height)}
					type="button"
				>
					{emoji ? (
						<EmojiIcon
							className={clsx("h-full w-full", !owned && UNOWNED_ICON_CLASS)}
							emoji={emoji}
						/>
					) : (
						<span
							className={clsx(
								"px-0.5 text-center text-[2cqw] leading-tight",
								owned ? "text-white/90" : "text-white/30",
							)}
						>
							{name}
						</span>
					)}
				</button>
			</Tooltip>

			{node.seasonEmoji && seasonEmoji ? (
				<div
					aria-hidden="true"
					className="absolute"
					style={boxStyle(node.seasonEmoji.x, node.seasonEmoji.y, ASSET_SIZE, ASSET_SIZE, height)}
				>
					<EmojiIcon className="h-full w-full" emoji={seasonEmoji} />
				</div>
			) : null}

			{node.cost && cost ? (
				<>
					{cost.emoji ? (
						<div
							aria-hidden="true"
							className="absolute"
							style={boxStyle(node.cost.iconX, node.cost.iconY, ASSET_SIZE, ASSET_SIZE, height)}
						>
							<EmojiIcon className="h-full w-full" emoji={cost.emoji} />
						</div>
					) : null}
					<span
						className="absolute whitespace-nowrap font-medium text-white leading-none"
						style={textStyle(node.cost.textX, node.cost.textBaselineY, height, node.cost.leftNode)}
					>
						{cost.text}
					</span>
				</>
			) : null}

			{node.level ? (
				<span
					className="absolute whitespace-nowrap font-medium text-white/80 leading-none"
					style={textStyle(node.level.x, node.level.baselineY, height)}
				>
					Lv{node.level.value}
				</span>
			) : null}
		</>
	);
}

export function FriendshipTree({ data, locale, seasonId, tree }: FriendshipTreeProps) {
	const layout = useMemo(() => {
		const modern = seasonId !== undefined && seasonId >= SeasonId.Migration;

		return normaliseTop(
			modern
				? modernFriendshipTreeLayout(tree as FriendshipTreeData)
				: legacyFriendshipTreeLayout(tree),
		);
	}, [seasonId, tree]);

	return (
		<div className="w-full max-w-md rounded-2xl bg-gray-900/95 p-4 sm:p-5 dark:bg-black/40">
			<div
				className="@container relative mx-auto w-full"
				style={{ aspectRatio: `${WIDTH} / ${layout.height}` }}
			>
				{layout.lines.length > 0 ? (
					<svg
						aria-hidden="true"
						className="absolute inset-0 h-full w-full"
						preserveAspectRatio="none"
						viewBox={`0 0 ${WIDTH} ${layout.height}`}
					>
						{layout.lines.map((line) => (
							<line
								key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
								stroke="#FFFFFF"
								strokeLinecap="round"
								strokeOpacity={0.75}
								strokeWidth={LINE_WIDTH}
								x1={line.x1}
								x2={line.x2}
								y1={line.y1}
								y2={line.y2}
							/>
						))}
					</svg>
				) : null}
				{layout.nodes.map((node) => (
					<TreeNode
						data={data}
						height={layout.height}
						key={node.item.cosmetics.join(",")}
						locale={locale}
						node={node}
						seasonId={seasonId}
					/>
				))}
			</div>
		</div>
	);
}
