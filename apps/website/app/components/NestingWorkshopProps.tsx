import { useTranslation } from "react-i18next";
import { type Item, itemName } from "@thatskyapplication/utility";
import { CosmeticPopover } from "~/components/cosmetics/CosmeticPopover.js";
import { OfferTiles } from "~/components/cosmetics/OfferTiles.js";
import { useCosmeticSelection } from "~/hooks/use-cosmetic-selection.js";
import { itemOfferTile } from "~/utility/cosmetics.js";

export interface NestingWorkshopProp {
	item: Item;
	owned: boolean;
}

export function NestingWorkshopProps({
	locale,
	nestingWorkshop,
}: {
	locale: string;
	nestingWorkshop: readonly NestingWorkshopProp[];
}) {
	const { t } = useTranslation();
	const { onOpenChange, selectTile, selection } = useCosmeticSelection();

	return (
		<>
			<OfferTiles
				locale={locale}
				onSelect={selectTile}
				tiles={nestingWorkshop.map(({ item, owned }) =>
					itemOfferTile(item, { name: itemName(item, t), owned, seasonPassEmoji: null }),
				)}
			/>
			<CosmeticPopover onOpenChange={onOpenChange} selection={selection} />
		</>
	);
}
