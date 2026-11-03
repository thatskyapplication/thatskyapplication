import { clsx } from "clsx";
import { CostList } from "~/components/catalogue/CostList.js";
import { CosmeticTile, type CosmeticTileSelect } from "~/components/cosmetics/CosmeticTile.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import type { OfferTile } from "~/utility/cosmetics.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";

const COMPACT_TILE_CLASS = "size-8 *:size-6 sm:size-7" as const;
export const TILE_CELL_CLASS = "flex flex-col items-center gap-0.5 text-xs" as const;

export function PricedTile({
	locale,
	offerTile: { costs, name, owned, seasonPassEmoji, tile },
	onSelect,
}: {
	locale: string;
	offerTile: OfferTile;
	onSelect: CosmeticTileSelect;
}) {
	return (
		<>
			<div className="relative">
				<CosmeticTile
					className={COMPACT_TILE_CLASS}
					dimmed={owned}
					name={name}
					onSelect={onSelect}
					tile={tile}
				/>
				{owned && (
					<EmojiIcon
						className="pointer-events-none absolute -top-1 -right-1 size-3.5"
						emoji={MISCELLANEOUS_EMOJIS.Yes}
					/>
				)}
				{seasonPassEmoji && (
					<EmojiIcon
						className="pointer-events-none absolute -top-1 -left-1 size-3.5"
						emoji={seasonPassEmoji}
					/>
				)}
			</div>
			{costs.length > 0 && <CostList costs={costs} locale={locale} />}
		</>
	);
}

export function OfferTiles({
	compact,
	locale,
	onSelect,
	tiles,
}: {
	compact?: boolean;
	locale: string;
	onSelect: CosmeticTileSelect;
	tiles: readonly OfferTile[];
}) {
	return (
		<ul
			className={clsx(
				"m-0 flex list-none flex-wrap gap-y-2 p-0",
				compact ? "-ml-1 sm:-ml-1.5" : "gap-x-3",
			)}
		>
			{tiles.map((offerTile) => (
				<li className={clsx(TILE_CELL_CLASS, compact && "w-10")} key={offerTile.tile.anchor}>
					<PricedTile locale={locale} offerTile={offerTile} onSelect={onSelect} />
				</li>
			))}
		</ul>
	);
}
