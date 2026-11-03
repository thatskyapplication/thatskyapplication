import type { Popover } from "@base-ui/react/popover";
import { useCallback, useLayoutEffect, useState } from "react";
import type { CosmeticTileSelect } from "~/components/cosmetics/CosmeticTile.js";
import type { CosmeticTileData } from "~/utility/cosmetics.js";

const COSMETIC_TILE_SELECTOR = "[data-cosmetic-tile]" as const;

export interface CosmeticSelection {
	readonly element: () => Element | null;
	readonly open: boolean;
	readonly opener: "keyboard" | "location" | "pointer";
	readonly tile: CosmeticTileData;
}

export function useCosmeticSelection() {
	const [selection, setSelection] = useState<CosmeticSelection | null>(null);

	useLayoutEffect(() => {
		const element = selection?.open ? selection.element() : null;
		element?.setAttribute("aria-expanded", "true");
		return () => element?.setAttribute("aria-expanded", "false");
	}, [selection]);

	const selectTile = useCallback<CosmeticTileSelect>((tile, element, keyboard) => {
		setSelection((current) =>
			current?.open && current.tile.cosmetic === tile.cosmetic
				? { ...current, open: false }
				: {
						element: () => element,
						open: true,
						opener: keyboard ? "keyboard" : "pointer",
						tile,
					},
		);
	}, []);

	const onOpenChange = (open: boolean, eventDetails: Popover.Root.ChangeEventDetails) => {
		const { event, reason } = eventDetails;

		if (
			open ||
			(reason === "outside-press" &&
				event.target instanceof Element &&
				event.target.closest(COSMETIC_TILE_SELECTOR))
		) {
			return;
		}

		setSelection((current) => current && { ...current, open: false });
	};

	return { onOpenChange, selectTile, selection, setSelection };
}
