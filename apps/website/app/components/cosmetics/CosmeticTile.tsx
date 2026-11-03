import { clsx } from "clsx";
import { memo } from "react";
import { formatEmojiURL } from "@thatskyapplication/utility";
import { Tooltip } from "~/components/Tooltip";
import type { CosmeticTileData } from "~/utility/cosmetics.js";

const COSMETIC_TILE_IMAGE_SIZE = 32 as const;
const COSMETIC_TILE_PIXEL_DENSITIES = [1, 2, 3] as const;

export type CosmeticTileSelect = (
	tile: CosmeticTileData,
	element: HTMLElement,
	keyboard: boolean,
) => void;

function cosmeticTileImageSourceSet(imageURL: string) {
	return COSMETIC_TILE_PIXEL_DENSITIES.map(
		(density) => `${imageURL}?size=${COSMETIC_TILE_IMAGE_SIZE * density} ${density}x`,
	).join(", ");
}

export const CosmeticTile = memo(function CosmeticTile({
	className,
	dimmed,
	name,
	onSelect,
	tile,
}: {
	className?: string | undefined;
	dimmed: boolean;
	name: string | null;
	onSelect: CosmeticTileSelect;
	tile: CosmeticTileData;
}) {
	const imageURL = formatEmojiURL(tile.emoji.id);

	const button = (
		<button
			aria-expanded={false}
			aria-haspopup="dialog"
			aria-label={name ?? tile.emoji.name}
			className={clsx("cosmetic-tile", className, dimmed && "opacity-30")}
			data-cosmetic-tile=""
			id={tile.anchor}
			onClick={(event) => onSelect(tile, event.currentTarget, event.detail === 0)}
			type="button"
		>
			<img
				alt=""
				decoding="async"
				draggable={false}
				fetchPriority="low"
				height={COSMETIC_TILE_IMAGE_SIZE}
				src={`${imageURL}?size=${COSMETIC_TILE_IMAGE_SIZE}`}
				srcSet={cosmeticTileImageSourceSet(imageURL)}
				width={COSMETIC_TILE_IMAGE_SIZE}
			/>
		</button>
	);

	return name ? <Tooltip content={name}>{button}</Tooltip> : button;
});
