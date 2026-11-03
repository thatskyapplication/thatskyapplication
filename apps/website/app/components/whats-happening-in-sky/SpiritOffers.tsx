import { Link } from "react-router";
import type { CosmeticTileSelect } from "~/components/cosmetics/CosmeticTile.js";
import { OfferTiles, PricedTile, TILE_CELL_CLASS } from "~/components/cosmetics/OfferTiles.js";
import type { SpiritOffer, SpiritTree } from "~/utility/whats-happening-in-sky.js";

function SpiritLabel({ label, pageURL }: { label: string; pageURL?: string | undefined }) {
	return pageURL ? (
		<Link className="regular-link max-w-full truncate text-xs font-medium" to={pageURL}>
			{label}
		</Link>
	) : (
		<span className="max-w-full truncate text-xs font-medium text-gray-600 dark:text-gray-300">
			{label}
		</span>
	);
}

export function SpiritTrees({
	locale,
	onSelect,
	trees,
}: {
	locale: string;
	onSelect: CosmeticTileSelect;
	trees: readonly SpiritTree[];
}) {
	return (
		<ul className="m-0 -mx-4 grid list-none auto-cols-[minmax(7.5rem,1fr)] grid-flow-col items-end gap-x-1 overflow-x-auto p-0 px-4 pt-1">
			{trees.map(({ key, label, levels, pageURL }) => (
				<li className="flex min-w-0 flex-col items-center gap-1.5" key={key}>
					<ol className="m-0 flex w-30 list-none flex-col-reverse gap-y-1.5 p-0">
						{levels.map((level, levelIndex) => (
							<li className="grid grid-cols-3" key={`level-${levelIndex}`}>
								{level.map((offerTile, lane) => (
									<div className={TILE_CELL_CLASS} key={`lane-${lane}`}>
										{offerTile && (
											<PricedTile locale={locale} offerTile={offerTile} onSelect={onSelect} />
										)}
									</div>
								))}
							</li>
						))}
					</ol>
					<SpiritLabel label={label} pageURL={pageURL} />
				</li>
			))}
		</ul>
	);
}

export function SpiritOffers({
	locale,
	offers,
	onSelect,
}: {
	locale: string;
	offers: readonly SpiritOffer[];
	onSelect: CosmeticTileSelect;
}) {
	return (
		<ul className="m-0 grid list-none gap-x-4 gap-y-3 p-0 sm:grid-cols-3">
			{offers.map(({ key, label, pageURL, tiles }) => (
				<li className="flex min-w-0 flex-col gap-1" key={key}>
					<SpiritLabel label={label} pageURL={pageURL} />
					<OfferTiles compact locale={locale} onSelect={onSelect} tiles={tiles} />
				</li>
			))}
		</ul>
	);
}
