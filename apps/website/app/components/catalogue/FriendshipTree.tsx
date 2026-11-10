/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Read-only tooltip triggers must remain keyboard-focusable without becoming controls. */
import { clsx } from "clsx";
import { CheckCircle } from "lucide-react";
import { type CSSProperties, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFetchers } from "react-router";
import {
	ASSET_SIZE,
	catalogueComplete,
	catalogueProgress,
	costEntryEmoji,
	type Emoji,
	FONT_SIZE,
	FRIENDSHIP_TREE_WIDTH,
	type FriendshipTree as FriendshipTreeData,
	friendshipTreeToItems,
	IMAGE_SIZE,
	type Item,
	type ItemCost,
	type LegacyFriendshipTree,
	LINE_WIDTH,
	legacyFriendshipTreeLayout,
	modernFriendshipTreeLayout,
	itemName,
	partitionItemCosts,
	type PlacedFriendshipTreeNode,
	SeasonId,
	type SeasonIds,
	sumCosts,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { useItemOwnership } from "~/hooks/use-item-ownership.js";
import { parseCosmetics } from "~/utility/catalogue.js";
import { EMOJIS, itemEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { Tooltip } from "../Tooltip";
import { COST_ENTRY_NAME_KEYS, CostList } from "./CostList";

type AnyFriendshipTree = FriendshipTreeData | LegacyFriendshipTree;

const WIDTH = FRIENDSHIP_TREE_WIDTH;

const UNOWNED_ICON_CLASS = "opacity-25" as const;

interface FriendshipTreeSharedProps {
	label?: string;
	locale: string;
	seasonId?: SeasonIds | undefined;
	tree: AnyFriendshipTree;
}

type FriendshipTreeProps = FriendshipTreeSharedProps &
	({ data: ReadonlySet<number>; readOnly?: false } | { data?: never; readOnly: true });

function resolveNodeCost(
	item: Item,
	locale: string,
): { emoji: Emoji | null; nameKey: string; text: string } | null {
	if (!item.cost) {
		return null;
	}

	const entry = sumCosts([item.cost])[0];

	if (!entry) {
		return null;
	}

	return {
		emoji: costEntryEmoji(entry, EMOJIS),
		nameKey: COST_ENTRY_NAME_KEYS[entry.type],
		text: entry.amount.toLocaleString(locale),
	};
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

interface TreeNodeProps {
	height: number;
	locale: string;
	node: PlacedFriendshipTreeNode;
	seasonId: SeasonIds | undefined;
}

function TreeNode({
	height,
	interaction,
	locale,
	node,
	seasonId,
}: TreeNodeProps & {
	interaction?: { owned: boolean; toggle: () => void };
}) {
	const { t } = useTranslation();
	const { item } = node;
	const owned = interaction?.owned ?? true;
	const name = itemName(item, t);
	const cost = node.cost ? resolveNodeCost(item, locale) : null;
	const accessibleDetails = [];

	if (cost) {
		accessibleDetails.push(
			t("catalogue.friendship-tree-node-cost", {
				amount: cost.text,
				currency: t(cost.nameKey, { ns: "general" }),
				ns: "features",
			}),
		);
	}

	if (node.level) {
		accessibleDetails.push(
			t("catalogue.friendship-tree-node-level", {
				level: node.level.value,
				ns: "features",
			}),
		);
	}

	const accessibleName = [name, ...accessibleDetails].join(", ");

	const seasonEmoji =
		node.seasonEmoji && seasonId !== undefined ? SeasonIdToSeasonalEmoji[seasonId] : null;

	const emoji = itemEmoji(item);

	return (
		<>
			<Tooltip content={name}>
				{interaction ? (
					<button
						aria-label={accessibleName}
						aria-pressed={owned}
						className="absolute flex items-center justify-center rounded-lg transition-colors hover:bg-white/10"
						onClick={interaction.toggle}
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
				) : (
					<div
						aria-label={accessibleName}
						className="absolute flex items-center justify-center rounded-lg focus-visible:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						role="img"
						style={boxStyle(node.x, node.y, IMAGE_SIZE, IMAGE_SIZE, height)}
						tabIndex={0}
					>
						{emoji ? (
							<EmojiIcon className="h-full w-full" emoji={emoji} />
						) : (
							<span className="px-0.5 text-center text-[2cqw] leading-tight text-white/90">
								{name}
							</span>
						)}
					</div>
				)}
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
						aria-hidden="true"
						className="absolute leading-none font-medium whitespace-nowrap text-white"
						style={textStyle(node.cost.textX, node.cost.textBaselineY, height, node.cost.leftNode)}
					>
						{cost.text}
					</span>
				</>
			) : null}

			{node.level ? (
				<span
					aria-hidden="true"
					className="absolute leading-none font-medium whitespace-nowrap text-white/80"
					style={textStyle(node.level.x, node.level.baselineY, height)}
				>
					Lv{node.level.value}
				</span>
			) : null}
		</>
	);
}

function InteractiveTreeNode({ data, ...props }: TreeNodeProps & { data: ReadonlySet<number> }) {
	const interaction = useItemOwnership(props.node.item, data);

	return <TreeNode {...props} interaction={interaction} />;
}

export function FriendshipTree(props: FriendshipTreeProps) {
	const { label, locale, seasonId, tree } = props;
	const data = props.readOnly === true ? null : props.data;
	const readOnly = data === null;
	const fetchers = useFetchers();
	const { t } = useTranslation();
	const layout = useMemo(() => {
		const modern = seasonId !== undefined && seasonId >= SeasonId.Migration;

		return modern
			? modernFriendshipTreeLayout(tree as FriendshipTreeData)
			: legacyFriendshipTreeLayout(tree);
	}, [seasonId, tree]);
	const optimisticData = useMemo(() => {
		if (data === null) {
			return null;
		}

		const nextData = new Set(data);

		for (const { formData } of fetchers) {
			if (!formData || formData.get("intent") !== "set-items") {
				continue;
			}

			const cosmetics = parseCosmetics(formData.get("cosmetics"));

			if (!cosmetics) {
				continue;
			}

			if (formData.get("owned") === "true") {
				for (const cosmetic of cosmetics) {
					nextData.add(cosmetic);
				}
			} else {
				for (const cosmetic of cosmetics) {
					nextData.delete(cosmetic);
				}
			}
		}

		return nextData;
	}, [data, fetchers]);
	const items = friendshipTreeToItems(tree);
	const itemCosts: ItemCost[] = [];

	for (const { cost } of items) {
		if (cost !== null) {
			itemCosts.push(cost);
		}
	}

	const totalCosts = sumCosts(itemCosts);
	const costs =
		optimisticData === null
			? totalCosts
			: sumCosts(partitionItemCosts(items, optimisticData).remaining);
	const complete =
		optimisticData !== null && catalogueComplete(catalogueProgress(items, optimisticData));

	return (
		<div
			aria-label={label}
			className="w-full max-w-sm rounded-2xl bg-gray-900/95 px-4 pt-4 pb-2 sm:px-5 sm:pt-5 sm:pb-3 dark:bg-black/40"
			role={label ? "group" : undefined}
		>
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
				{layout.nodes.map((node) => {
					const props = {
						height: layout.height,
						locale,
						node,
						seasonId,
					};

					return data === null ? (
						<TreeNode key={node.item.cosmetics.join(",")} {...props} />
					) : (
						<InteractiveTreeNode data={data} key={node.item.cosmetics.join(",")} {...props} />
					);
				})}
			</div>
			{totalCosts.length > 0 ? (
				<div
					aria-label={t(
						readOnly
							? "catalogue.friendship-tree-total-cost"
							: "catalogue.friendship-tree-remaining-cost",
						{ ns: "features" },
					)}
					className="mt-3 flex min-h-4 items-center justify-center border-t border-white/10 pt-2 text-xs font-medium text-white/80"
					role="group"
				>
					{complete ? (
						<span className="inline-flex items-center gap-1 text-green-300">
							<CheckCircle aria-hidden="true" className="size-4" />
							{t("catalogue.friendship-tree-complete", { ns: "features" })}
						</span>
					) : costs.length === 0 ? (
						<span className="whitespace-nowrap">
							{t("catalogue.friendship-tree-no-remaining-cost", { ns: "features" })}
						</span>
					) : (
						<CostList costs={costs} locale={locale} />
					)}
				</div>
			) : null}
		</div>
	);
}
