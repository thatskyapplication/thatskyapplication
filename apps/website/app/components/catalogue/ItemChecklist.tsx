import type { Item } from "@thatskyapplication/utility";
import { ItemRow } from "./ItemRow";

export function ItemChecklist({
	data,
	items,
	locale,
}: {
	data: ReadonlySet<number>;
	items: readonly Item[];
	locale: string;
}) {
	return (
		<div className="flex flex-col gap-2">
			{items.map((item) => (
				<ItemRow data={data} item={item} key={item.cosmetics.join(",")} locale={locale} />
			))}
		</div>
	);
}
